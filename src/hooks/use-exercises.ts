'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Exercise } from '@/types'

export function useExercises(topicId: string, level: number = 0) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('topic_id', topicId)
      .lte('level', level + 1)
      .eq('is_active', true)
      .order('level')
      .limit(15)

    if (error) {
      setError(error.message)
    } else {
      setExercises((data ?? []) as Exercise[])
    }
    setLoading(false)
  }, [topicId, level])

  return { exercises, loading, error, load }
}
