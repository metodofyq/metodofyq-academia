'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { StudyPlan, StudyPlanTopic, Topic } from '@/types'

export function useStudyPlan(studentId: string) {
  const [plan, setPlan]         = useState<StudyPlan | null>(null)
  const [topics, setTopics]     = useState<(StudyPlanTopic & { topic: Topic })[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('study_plans')
      .select('*, study_plan_topics(*, topic:topics(*))')
      .eq('student_id', studentId)
      .eq('is_active', true)
      .single()
      .then(({ data }) => {
        if (data) {
          setPlan(data as StudyPlan)
          setTopics((data.study_plan_topics ?? []) as (StudyPlanTopic & { topic: Topic })[])
        }
        setLoading(false)
      })
  }, [studentId])

  return { plan, topics, loading }
}
