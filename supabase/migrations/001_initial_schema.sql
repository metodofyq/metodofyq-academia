-- ============================================================
-- Método FyQ - Initial Schema
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================================
-- PROFILES
-- ============================================================
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  email         text not null,
  full_name     text,
  avatar_url    text,
  role          text not null default 'student'
                check (role in ('student', 'teacher', 'admin')),
  created_at    timestamptz default now() not null,
  updated_at    timestamptz default now() not null
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- TOPICS (75 FyQ topics)
-- ============================================================
create table public.topics (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,          -- 'FIS-01', 'QUI-01'
  title         text not null,
  subject       text not null check (subject in ('fisica', 'quimica')),
  description   text,
  order_index   integer not null,
  estimated_days integer not null default 3,   -- days to spend on this topic
  created_at    timestamptz default now() not null
);

create index topics_subject_idx on public.topics(subject);
create index topics_order_idx on public.topics(order_index);

-- ============================================================
-- TOPIC LEVELS (N0-N4 content per topic)
-- ============================================================
create table public.topic_levels (
  id          uuid primary key default gen_random_uuid(),
  topic_id    uuid references public.topics(id) on delete cascade not null,
  level       smallint not null check (level between 0 and 4),  -- N0..N4
  title       text not null,
  content_md  text,                -- Markdown theory content
  video_url   text,
  created_at  timestamptz default now() not null,
  unique (topic_id, level)
);

-- ============================================================
-- EXERCISES (500+)
-- ============================================================
create table public.exercises (
  id              uuid primary key default gen_random_uuid(),
  topic_id        uuid references public.topics(id) on delete cascade not null,
  level           smallint not null check (level between 0 and 4),
  type            text not null check (type in ('multiple_choice', 'numeric', 'short_answer')),
  question        text not null,
  image_url       text,
  -- Multiple choice: [{id, text, is_correct}]
  options         jsonb,
  -- Numeric / short answer
  correct_answer  text,
  tolerance       numeric default 0.01,        -- relative tolerance for numeric
  explanation     text,
  points          integer not null default 10,
  is_active       boolean not null default true,
  created_at      timestamptz default now() not null
);

create index exercises_topic_idx  on public.exercises(topic_id);
create index exercises_level_idx  on public.exercises(level);
create index exercises_active_idx on public.exercises(is_active) where is_active = true;

-- ============================================================
-- STUDY PLANS
-- ============================================================
create table public.study_plans (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid references public.profiles(id) on delete cascade not null,
  is_active   boolean not null default true,
  started_at  date not null default current_date,
  created_at  timestamptz default now() not null,
  unique (student_id)   -- one plan per student
);

create table public.study_plan_topics (
  id              uuid primary key default gen_random_uuid(),
  study_plan_id   uuid references public.study_plans(id) on delete cascade not null,
  topic_id        uuid references public.topics(id) on delete cascade not null,
  order_index     integer not null,            -- 0-based position in plan
  -- computed: started_at + order_index * 3 days
  scheduled_date  date,
  unique (study_plan_id, topic_id),
  unique (study_plan_id, order_index)
);

create index spt_plan_idx  on public.study_plan_topics(study_plan_id);
create index spt_topic_idx on public.study_plan_topics(topic_id);

-- ============================================================
-- TOPIC PROGRESS
-- ============================================================
create table public.topic_progress (
  id                uuid primary key default gen_random_uuid(),
  student_id        uuid references public.profiles(id) on delete cascade not null,
  topic_id          uuid references public.topics(id) on delete cascade not null,
  current_level     smallint not null default 0,
  is_unlocked       boolean not null default false,
  first_studied_at  timestamptz,
  last_studied_at   timestamptz,
  total_time_min    integer not null default 0,  -- minutes spent
  unique (student_id, topic_id)
);

create index tp_student_idx on public.topic_progress(student_id);

-- ============================================================
-- SPACED REPETITION (SM-2 algorithm)
-- ============================================================
create table public.spaced_repetition (
  id                uuid primary key default gen_random_uuid(),
  student_id        uuid references public.profiles(id) on delete cascade not null,
  topic_id          uuid references public.topics(id) on delete cascade not null,
  ease_factor       numeric not null default 2.5,
  interval_days     integer not null default 1,
  repetitions       integer not null default 0,
  next_review_date  date not null default current_date,
  last_reviewed_at  timestamptz,
  unique (student_id, topic_id)
);

create index sr_student_idx      on public.spaced_repetition(student_id);
create index sr_review_date_idx  on public.spaced_repetition(student_id, next_review_date);

-- ============================================================
-- EXERCISE ATTEMPTS
-- ============================================================
create table public.exercise_attempts (
  id                  uuid primary key default gen_random_uuid(),
  student_id          uuid references public.profiles(id) on delete cascade not null,
  exercise_id         uuid references public.exercises(id) on delete cascade not null,
  answer              text not null,
  is_correct          boolean not null,
  time_spent_seconds  integer,
  score               integer not null default 0,
  attempted_at        timestamptz default now() not null
);

create index ea_student_idx   on public.exercise_attempts(student_id);
create index ea_exercise_idx  on public.exercise_attempts(exercise_id);
create index ea_date_idx      on public.exercise_attempts(attempted_at);

-- ============================================================
-- DAILY TASKS (generated each day)
-- ============================================================
create table public.daily_tasks (
  id            uuid primary key default gen_random_uuid(),
  student_id    uuid references public.profiles(id) on delete cascade not null,
  task_date     date not null default current_date,
  task_type     text not null check (task_type in ('new_topic', 'review')),
  topic_id      uuid references public.topics(id) on delete cascade not null,
  exercise_ids  uuid[] not null default '{}',
  is_completed  boolean not null default false,
  completed_at  timestamptz,
  created_at    timestamptz default now() not null,
  unique (student_id, task_date, topic_id, task_type)
);

create index dt_student_date_idx on public.daily_tasks(student_id, task_date);

-- ============================================================
-- TEACHER MATERIALS (file uploads)
-- ============================================================
create table public.materials (
  id              uuid primary key default gen_random_uuid(),
  teacher_id      uuid references public.profiles(id) on delete cascade not null,
  topic_id        uuid references public.topics(id),
  title           text not null,
  description     text,
  file_path       text not null,     -- Supabase Storage path
  file_url        text not null,     -- Public URL
  file_type       text not null,     -- 'pdf' | 'video' | 'image' | 'other'
  file_size_bytes bigint,
  is_public       boolean not null default true,
  created_at      timestamptz default now() not null
);

create index materials_teacher_idx on public.materials(teacher_id);
create index materials_topic_idx   on public.materials(topic_id);
