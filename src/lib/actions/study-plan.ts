'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { STUDY_PLAN_TOPICS_COUNT, NEW_TOPIC_INTERVAL_DAYS } from '@/types'
import { format, addDays } from 'date-fns'

export async function createStudyPlan(studentId: string, topicIds: string[]) {
  if (topicIds.length === 0 || topicIds.length > STUDY_PLAN_TOPICS_COUNT) {
    return { error: `Selecciona entre 1 y ${STUDY_PLAN_TOPICS_COUNT} temas.` }
  }

  const supabase = await createClient()

  // Deactivate existing plans
  await supabase
    .from('study_plans')
    .update({ is_active: false })
    .eq('student_id', studentId)

  const today = format(new Date(), 'yyyy-MM-dd')

  // Create new plan
  const { data: plan, error } = await supabase
    .from('study_plans')
    .insert({ student_id: studentId, started_at: today })
    .select()
    .single()

  if (error || !plan) return { error: 'Error al crear el plan.' }

  // Insert plan topics with scheduled dates
  const planTopics = topicIds.map((topicId, idx) => ({
    study_plan_id:  plan.id,
    topic_id:       topicId,
    order_index:    idx,
    scheduled_date: format(addDays(new Date(today), idx * NEW_TOPIC_INTERVAL_DAYS), 'yyyy-MM-dd'),
  }))

  const { error: topicsError } = await supabase
    .from('study_plan_topics')
    .insert(planTopics)

  if (topicsError) return { error: 'Error al guardar los temas del plan.' }

  revalidatePath('/plan')
  revalidatePath('/dashboard')
  return { success: true, planId: plan.id }
}

export async function deleteStudyPlan(planId: string) {
  const supabase = await createClient()
  await supabase.from('study_plans').update({ is_active: false }).eq('id', planId)
  revalidatePath('/plan')
  revalidatePath('/dashboard')
}
