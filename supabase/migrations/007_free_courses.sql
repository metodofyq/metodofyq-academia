-- Autonomous Communities table
CREATE TABLE autonomous_communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now()
);

-- Free Courses table
CREATE TABLE free_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ccaa_id UUID NOT NULL REFERENCES autonomous_communities(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  provider TEXT,
  provider_name TEXT,
  url TEXT NOT NULL,
  hours_certified INTEGER DEFAULT 0,
  modality TEXT CHECK (modality IN ('online', 'presencial', 'hibrida')),
  start_date DATE,
  end_date DATE,
  registration_deadline DATE,
  vacancies INTEGER,
  registration_status TEXT DEFAULT 'open' CHECK (registration_status IN ('open', 'closed', 'coming_soon')),
  certification TEXT,
  specialties TEXT[] DEFAULT '{}',
  course_type TEXT,
  compatibility_score INTEGER DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  source_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_free_courses_ccaa_id ON free_courses(ccaa_id);
CREATE INDEX idx_free_courses_status ON free_courses(registration_status);
CREATE INDEX idx_autonomous_communities_slug ON autonomous_communities(slug);

-- Saved courses table (for logged-in users to save courses)
CREATE TABLE saved_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES free_courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_saved_courses_user_id ON saved_courses(user_id);
CREATE INDEX idx_saved_courses_course_id ON saved_courses(course_id);

-- Enable RLS
ALTER TABLE autonomous_communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_courses ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Anyone can read autonomous communities
CREATE POLICY "Anyone can read autonomous communities"
  ON autonomous_communities
  FOR SELECT
  USING (true);

-- RLS Policies: Anyone can read free courses
CREATE POLICY "Anyone can read free courses"
  ON free_courses
  FOR SELECT
  USING (true);

-- RLS Policies: Only logged-in users can read saved courses
CREATE POLICY "Users can read their own saved courses"
  ON saved_courses
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies: Only logged-in users can create saved courses
CREATE POLICY "Users can create their own saved courses"
  ON saved_courses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies: Only logged-in users can delete their saved courses
CREATE POLICY "Users can delete their own saved courses"
  ON saved_courses
  FOR DELETE
  USING (auth.uid() = user_id);
