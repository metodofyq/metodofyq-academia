export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'student' | 'teacher' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'teacher' | 'admin'
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'teacher' | 'admin'
        }
      }
      topics: {
        Row: {
          id: string
          code: string
          title: string
          subject: 'fisica' | 'quimica'
          description: string | null
          order_index: number
          estimated_days: number
          created_at: string
        }
        Insert: {
          code: string
          title: string
          subject: 'fisica' | 'quimica'
          description?: string | null
          order_index: number
          estimated_days?: number
        }
        Update: Partial<Database['public']['Tables']['topics']['Insert']>
      }
      topic_levels: {
        Row: {
          id: string
          topic_id: string
          level: number
          title: string
          content_md: string | null
          video_url: string | null
          created_at: string
        }
        Insert: {
          topic_id: string
          level: number
          title: string
          content_md?: string | null
          video_url?: string | null
        }
        Update: Partial<Database['public']['Tables']['topic_levels']['Insert']>
      }
      exercises: {
        Row: {
          id: string
          topic_id: string
          level: number
          type: 'multiple_choice' | 'numeric' | 'short_answer'
          question: string
          image_url: string | null
          options: ExerciseOption[] | null
          correct_answer: string | null
          tolerance: number
          explanation: string | null
          points: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          topic_id: string
          level: number
          type: 'multiple_choice' | 'numeric' | 'short_answer'
          question: string
          image_url?: string | null
          options?: ExerciseOption[] | null
          correct_answer?: string | null
          tolerance?: number
          explanation?: string | null
          points?: number
          is_active?: boolean
        }
        Update: Partial<Database['public']['Tables']['exercises']['Insert']>
      }
      study_plans: {
        Row: {
          id: string
          student_id: string
          is_active: boolean
          started_at: string
          created_at: string
        }
        Insert: {
          student_id: string
          is_active?: boolean
          started_at?: string
        }
        Update: { is_active?: boolean }
      }
      study_plan_topics: {
        Row: {
          id: string
          study_plan_id: string
          topic_id: string
          order_index: number
          scheduled_date: string | null
        }
        Insert: {
          study_plan_id: string
          topic_id: string
          order_index: number
          scheduled_date?: string | null
        }
        Update: { order_index?: number; scheduled_date?: string | null }
      }
      topic_progress: {
        Row: {
          id: string
          student_id: string
          topic_id: string
          current_level: number
          is_unlocked: boolean
          first_studied_at: string | null
          last_studied_at: string | null
          total_time_min: number
        }
        Insert: {
          student_id: string
          topic_id: string
          current_level?: number
          is_unlocked?: boolean
        }
        Update: {
          current_level?: number
          is_unlocked?: boolean
          first_studied_at?: string | null
          last_studied_at?: string | null
          total_time_min?: number
        }
      }
      spaced_repetition: {
        Row: {
          id: string
          student_id: string
          topic_id: string
          ease_factor: number
          interval_days: number
          repetitions: number
          next_review_date: string
          last_reviewed_at: string | null
        }
        Insert: {
          student_id: string
          topic_id: string
          ease_factor?: number
          interval_days?: number
          repetitions?: number
          next_review_date?: string
        }
        Update: {
          ease_factor?: number
          interval_days?: number
          repetitions?: number
          next_review_date?: string
          last_reviewed_at?: string | null
        }
      }
      exercise_attempts: {
        Row: {
          id: string
          student_id: string
          exercise_id: string
          answer: string
          is_correct: boolean
          time_spent_seconds: number | null
          score: number
          attempted_at: string
        }
        Insert: {
          student_id: string
          exercise_id: string
          answer: string
          is_correct: boolean
          time_spent_seconds?: number | null
          score?: number
        }
        Update: never
      }
      daily_tasks: {
        Row: {
          id: string
          student_id: string
          task_date: string
          task_type: 'new_topic' | 'review'
          topic_id: string
          exercise_ids: string[]
          is_completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          student_id: string
          task_date?: string
          task_type: 'new_topic' | 'review'
          topic_id: string
          exercise_ids?: string[]
          is_completed?: boolean
        }
        Update: {
          is_completed?: boolean
          completed_at?: string | null
        }
      }
      materials: {
        Row: {
          id: string
          teacher_id: string
          topic_id: string | null
          title: string
          description: string | null
          file_path: string
          file_url: string
          file_type: string
          file_size_bytes: number | null
          is_public: boolean
          created_at: string
        }
        Insert: {
          teacher_id: string
          topic_id?: string | null
          title: string
          description?: string | null
          file_path: string
          file_url: string
          file_type: string
          file_size_bytes?: number | null
          is_public?: boolean
        }
        Update: Partial<Omit<Database['public']['Tables']['materials']['Insert'], 'teacher_id'>>
      }
    }
    Views: Record<string, never>
    Functions: {
      get_user_role: { Returns: string }
    }
    Enums: Record<string, never>
  }
}

export type ExerciseOption = {
  id: string
  text: string
  is_correct: boolean
}
