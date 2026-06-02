export interface AutonomousCommunity {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'coming_soon';
  created_at: string;
}

export interface FreeCourse {
  id: string;
  ccaa_id: string;
  title: string;
  description: string;
  provider: string;
  provider_name: string;
  url: string;
  hours_certified: number;
  modality: 'online' | 'presencial' | 'hibrida';
  start_date: string;
  end_date: string;
  registration_deadline: string | null;
  vacancies: number;
  registration_status: 'open' | 'closed' | 'coming_soon';
  certification: string;
  specialties: string[];
  course_type: string;
  compatibility_score: number;
  tags: string[];
  source_url: string;
  created_at: string;
  updated_at: string;
}

export type CourseFilter = {
  modality?: 'online' | 'presencial' | 'hibrida';
  courseType?: string;
  status?: string;
  searchTerm?: string;
};
