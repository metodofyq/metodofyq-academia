import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { StudyPlanBuilder } from '@/components/plan/study-plan-builder'
import { ActivePlanView } from '@/components/plan/active-plan-view'
import type { Topic, StudyPlanTopic } from '@/types'

export default async function PlanPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: topics }, { data: activePlan }] = await Promise.all([
    supabase.from('topics').select('*').order('order_index'),
    supabase
      .from('study_plans')
      .select('*, study_plan_topics(*, topic:topics(*))')
      .eq('student_id', user.id)
      .eq('is_active', true)
      .single(),
  ])

  const allTopics = (topics ?? []) as Topic[]

  if (activePlan) {
    const planTopics = (activePlan.study_plan_topics ?? []) as (StudyPlanTopic & { topic: Topic })[]
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Mi plan de estudio</h1>
          <p className="text-muted-foreground">
            Iniciado el {new Date(activePlan.started_at).toLocaleDateString('es-ES')} ·{' '}
            {planTopics.length} temas seleccionados
          </p>
        </div>
        <ActivePlanView
          plan={activePlan}
          planTopics={planTopics}
          studentId={user.id}
        />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crear mi plan de estudio</h1>
        <p className="text-muted-foreground">
          Selecciona hasta 40 temas de los 75 disponibles. Los estudiarás a razón de 1 tema nuevo cada 3 días.
        </p>
      </div>
      <StudyPlanBuilder topics={allTopics} studentId={user.id} />
    </div>
  )
}
