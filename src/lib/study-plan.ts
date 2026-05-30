import { addDays, format, parseISO } from 'date-fns'
import type { StudyPlan, StudyPlanTopic, Topic, SpacedRepetition, DailyTask } from '@/types'
import { NEW_TOPIC_INTERVAL_DAYS, DAILY_REVIEW_COUNT } from '@/types'

/**
 * Compute scheduled dates for each topic in the plan.
 * Topic i starts on: plan.started_at + i * NEW_TOPIC_INTERVAL_DAYS days.
 */
export function computeScheduledDates(
  plan: StudyPlan,
  planTopics: StudyPlanTopic[]
): StudyPlanTopic[] {
  const start = parseISO(plan.started_at)
  return planTopics.map(pt => ({
    ...pt,
    scheduled_date: format(
      addDays(start, pt.order_index * NEW_TOPIC_INTERVAL_DAYS),
      'yyyy-MM-dd'
    ),
  }))
}

/**
 * Get today's new topic from the plan (if one is due).
 */
export function getTodayNewTopic(
  plan: StudyPlan,
  planTopics: StudyPlanTopic[],
  topics: Topic[]
): Topic | null {
  const today = format(new Date(), 'yyyy-MM-dd')
  const scheduled = computeScheduledDates(plan, planTopics)
  const todayEntry = scheduled.find(pt => pt.scheduled_date === today)
  if (!todayEntry) return null
  return topics.find(t => t.id === todayEntry.topic_id) ?? null
}

/**
 * Get topics due for review today (SR next_review_date <= today).
 */
export function getReviewTopics(
  srCards: SpacedRepetition[],
  topics: Topic[],
  limit: number = DAILY_REVIEW_COUNT.max
): Topic[] {
  const today = format(new Date(), 'yyyy-MM-dd')
  const dueCards = srCards
    .filter(c => c.next_review_date <= today && c.repetitions > 0)
    .sort((a, b) => a.next_review_date.localeCompare(b.next_review_date))
    .slice(0, limit)

  return dueCards
    .map(c => topics.find(t => t.id === c.topic_id))
    .filter((t): t is Topic => t !== undefined)
}

/**
 * Checks whether a student has completed the required exercises to mark
 * a daily task as done. Requires ≥ 70% correct.
 */
export function isTaskCompletedByAttempts(
  attempts: Array<{ exercise_id: string; is_correct: boolean }>,
  exerciseIds: string[]
): boolean {
  if (exerciseIds.length === 0) return false
  const relevant = attempts.filter(a => exerciseIds.includes(a.exercise_id))
  if (relevant.length < exerciseIds.length) return false
  const correct = relevant.filter(a => a.is_correct).length
  return correct / exerciseIds.length >= 0.7
}

/**
 * Overall plan progress (0–100).
 */
export function planProgress(
  plan: StudyPlan,
  planTopics: StudyPlanTopic[],
  completedTaskDates: string[]
): number {
  const total = planTopics.length
  if (total === 0) return 0
  const scheduled = computeScheduledDates(plan, planTopics)
  const completed = scheduled.filter(pt =>
    pt.scheduled_date && completedTaskDates.includes(pt.scheduled_date)
  ).length
  return Math.round((completed / total) * 100)
}

/**
 * Returns the next topic that hasn't been started yet.
 */
export function getNextUnstartedTopic(
  planTopics: StudyPlanTopic[],
  completedTopicIds: string[]
): StudyPlanTopic | null {
  const sorted = [...planTopics].sort((a, b) => a.order_index - b.order_index)
  return sorted.find(pt => !completedTopicIds.includes(pt.topic_id)) ?? null
}

/**
 * Generate initial daily tasks for today.
 */
export function buildDailyTasks(params: {
  studentId: string
  newTopic: Topic | null
  reviewTopics: Topic[]
  exerciseMap: Record<string, string[]>
}): Omit<DailyTask, 'id' | 'created_at'>[] {
  const today = format(new Date(), 'yyyy-MM-dd')
  const tasks: Omit<DailyTask, 'id' | 'created_at'>[] = []

  if (params.newTopic) {
    tasks.push({
      student_id: params.studentId,
      task_date: today,
      task_type: 'new_topic',
      topic_id: params.newTopic.id,
      exercise_ids: params.exerciseMap[params.newTopic.id] ?? [],
      is_completed: false,
      completed_at: null,
    })
  }

  for (const topic of params.reviewTopics) {
    tasks.push({
      student_id: params.studentId,
      task_date: today,
      task_type: 'review',
      topic_id: topic.id,
      exercise_ids: params.exerciseMap[topic.id] ?? [],
      is_completed: false,
      completed_at: null,
    })
  }

  return tasks
}
