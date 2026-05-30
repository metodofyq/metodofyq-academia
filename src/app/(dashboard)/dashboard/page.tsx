import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/server'
import { DailyTaskList } from '@/components/dashboard/daily-task-list'
import { StudyStreak } from '@/components/dashboard/study-streak'
import { ProgressOverview } from '@/components/dashboard/progress-overview'
import { generateDailyTasks } from '@/lib/actions/daily-tasks'
import type { DailyTaskWithTopic } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = format(new Date(), 'yyyy-MM-dd')

  // Check if tasks already exist for today
  const { data: existingTasks } = await supabase
    .from('daily_tasks')
    .select('*, topic:topics(*)')
    .eq('student_id', user.id)
    .eq('task_date', today)

  let tasks = existingTasks as DailyTaskWithTopic[] | null

  // If no tasks yet, attempt to generate them (requires active study plan)
  if (!tasks || tasks.length === 0) {
    await generateDailyTasks(user.id)
    const { data: newTasks } = await supabase
      .from('daily_tasks')
      .select('*, topic:topics(*)')
      .eq('student_id', user.id)
      .eq('task_date', today)
    tasks = newTasks as DailyTaskWithTopic[] | null
  }

  // Streak: count consecutive days with completed tasks
  const { data: completedDates } = await supabase
    .from('daily_tasks')
    .select('task_date')
    .eq('student_id', user.id)
    .eq('is_completed', true)
    .order('task_date', { ascending: false })
    .limit(60)

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  // Progress overview
  const { data: topicProgress, count: topicsStarted } = await supabase
    .from('topic_progress')
    .select('*', { count: 'exact' })
    .eq('student_id', user.id)
    .eq('is_unlocked', true)

  const { count: totalAttempts } = await supabase
    .from('exercise_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', user.id)

  const { count: correctAttempts } = await supabase
    .from('exercise_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', user.id)
    .eq('is_correct', true)

  const todayLabel = format(new Date(), "EEEE, d 'de' MMMM", { locale: es })

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold capitalize">
          Hola, {profile?.full_name?.split(' ')[0] ?? 'estudiante'} 👋
        </h1>
        <p className="text-muted-foreground capitalize">{todayLabel}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StudyStreak completedDates={(completedDates ?? []).map(d => d.task_date)} />
        <div className="sm:col-span-2">
          <ProgressOverview
            topicsStarted={topicsStarted ?? 0}
            totalAttempts={totalAttempts ?? 0}
            correctAttempts={correctAttempts ?? 0}
          />
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">Tareas de hoy</h2>
        {tasks && tasks.length > 0 ? (
          <DailyTaskList tasks={tasks} />
        ) : (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No tienes tareas para hoy. Comienza creando tu plan de estudio.
            </p>
            <a
              href="/plan"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Crear mi plan
            </a>
          </div>
        )}
      </section>
    </div>
  )
}
