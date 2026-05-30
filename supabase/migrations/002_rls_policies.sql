-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles          enable row level security;
alter table public.topics            enable row level security;
alter table public.topic_levels      enable row level security;
alter table public.exercises         enable row level security;
alter table public.study_plans       enable row level security;
alter table public.study_plan_topics enable row level security;
alter table public.topic_progress    enable row level security;
alter table public.spaced_repetition enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.daily_tasks       enable row level security;
alter table public.materials         enable row level security;

-- ============================================================
-- Helper: check role
-- ============================================================
create or replace function public.get_user_role()
returns text language sql security definer stable as $$
  select role from public.profiles where id = auth.uid()
$$;

-- ============================================================
-- PROFILES
-- ============================================================
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

create policy "profiles_select_teacher" on public.profiles
  for select using (public.get_user_role() in ('teacher', 'admin'));

create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());

-- ============================================================
-- TOPICS & TOPIC_LEVELS (public read, teacher/admin write)
-- ============================================================
create policy "topics_select_all" on public.topics
  for select using (true);

create policy "topics_insert_teacher" on public.topics
  for insert with check (public.get_user_role() in ('teacher', 'admin'));

create policy "topics_update_teacher" on public.topics
  for update using (public.get_user_role() in ('teacher', 'admin'));

create policy "topic_levels_select_all" on public.topic_levels
  for select using (true);

create policy "topic_levels_write_teacher" on public.topic_levels
  for all using (public.get_user_role() in ('teacher', 'admin'));

-- ============================================================
-- EXERCISES (public read for authenticated, teacher write)
-- ============================================================
create policy "exercises_select_auth" on public.exercises
  for select using (auth.uid() is not null and is_active = true);

create policy "exercises_write_teacher" on public.exercises
  for all using (public.get_user_role() in ('teacher', 'admin'));

-- ============================================================
-- STUDY PLANS (own)
-- ============================================================
create policy "study_plans_own" on public.study_plans
  for all using (student_id = auth.uid());

create policy "study_plans_teacher_read" on public.study_plans
  for select using (public.get_user_role() in ('teacher', 'admin'));

create policy "study_plan_topics_own" on public.study_plan_topics
  for all using (
    study_plan_id in (
      select id from public.study_plans where student_id = auth.uid()
    )
  );

create policy "study_plan_topics_teacher" on public.study_plan_topics
  for select using (public.get_user_role() in ('teacher', 'admin'));

-- ============================================================
-- TOPIC PROGRESS (own + teacher read)
-- ============================================================
create policy "topic_progress_own" on public.topic_progress
  for all using (student_id = auth.uid());

create policy "topic_progress_teacher" on public.topic_progress
  for select using (public.get_user_role() in ('teacher', 'admin'));

-- ============================================================
-- SPACED REPETITION (own)
-- ============================================================
create policy "sr_own" on public.spaced_repetition
  for all using (student_id = auth.uid());

create policy "sr_teacher" on public.spaced_repetition
  for select using (public.get_user_role() in ('teacher', 'admin'));

-- ============================================================
-- EXERCISE ATTEMPTS (own + teacher read)
-- ============================================================
create policy "ea_own" on public.exercise_attempts
  for all using (student_id = auth.uid());

create policy "ea_teacher" on public.exercise_attempts
  for select using (public.get_user_role() in ('teacher', 'admin'));

-- ============================================================
-- DAILY TASKS (own)
-- ============================================================
create policy "dt_own" on public.daily_tasks
  for all using (student_id = auth.uid());

create policy "dt_teacher" on public.daily_tasks
  for select using (public.get_user_role() in ('teacher', 'admin'));

-- ============================================================
-- MATERIALS (public read, teacher write)
-- ============================================================
create policy "materials_select_public" on public.materials
  for select using (is_public = true and auth.uid() is not null);

create policy "materials_own" on public.materials
  for all using (teacher_id = auth.uid());

-- ============================================================
-- Storage buckets
-- ============================================================
insert into storage.buckets (id, name, public) values
  ('materials', 'materials', false),
  ('avatars',   'avatars',   true)
on conflict (id) do nothing;

create policy "materials_upload" on storage.objects
  for insert with check (
    bucket_id = 'materials'
    and auth.uid() is not null
    and public.get_user_role() in ('teacher', 'admin')
  );

create policy "materials_read" on storage.objects
  for select using (
    bucket_id = 'materials' and auth.uid() is not null
  );

create policy "avatars_upload" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_read" on storage.objects
  for select using (bucket_id = 'avatars');
