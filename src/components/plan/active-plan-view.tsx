'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { format, parseISO, isToday, isPast, isFuture } from 'date-fns'
import { es } from 'date-fns/locale'
import { deleteStudyPlan } from '@/lib/actions/study-plan'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn, getSubjectColor } from '@/lib/utils'
import { Calendar, CheckCircle2, Clock, Trash2 } from 'lucide-react'
import type { StudyPlan, StudyPlanTopic, Topic } from '@/types'

interface Props {
  plan: StudyPlan
  planTopics: (StudyPlanTopic & { topic: Topic })[]
  studentId: string
}

export function ActivePlanView({ plan, planTopics, studentId }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [showConfirm, setShowConfirm] = useState(false)

  const sorted = [...planTopics].sort((a, b) => a.order_index - b.order_index)
  const past    = sorted.filter(pt => pt.scheduled_date && isPast(parseISO(pt.scheduled_date)) && !isToday(parseISO(pt.scheduled_date!)))
  const today   = sorted.filter(pt => pt.scheduled_date && isToday(parseISO(pt.scheduled_date!)))
  const future  = sorted.filter(pt => pt.scheduled_date && isFuture(parseISO(pt.scheduled_date!)))

  const completedCount = past.length + today.length
  const progress = Math.round((completedCount / sorted.length) * 100)

  function handleDelete() {
    startTransition(async () => {
      await deleteStudyPlan(plan.id)
      router.refresh()
    })
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Progreso del plan</span>
            <span className="text-sm text-muted-foreground">{completedCount}/{sorted.length} temas</span>
          </div>
          <Progress value={progress} />
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
            <div><span className="font-semibold text-green-600">{past.length}</span><br /><span className="text-muted-foreground text-xs">Completados</span></div>
            <div><span className="font-semibold text-blue-600">{today.length}</span><br /><span className="text-muted-foreground text-xs">Hoy</span></div>
            <div><span className="font-semibold">{future.length}</span><br /><span className="text-muted-foreground text-xs">Pendientes</span></div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-2">
        {today.map(pt => <TopicRow key={pt.id} pt={pt} status="today" />)}
        {past.slice(-5).map(pt => <TopicRow key={pt.id} pt={pt} status="past" />)}
        {future.slice(0, 10).map(pt => <TopicRow key={pt.id} pt={pt} status="future" />)}
        {future.length > 10 && (
          <p className="text-sm text-center text-muted-foreground py-2">
            …y {future.length - 10} temas más
          </p>
        )}
      </div>

      {/* Delete plan */}
      <div className="pt-4 border-t">
        {!showConfirm ? (
          <Button variant="outline" size="sm" onClick={() => setShowConfirm(true)} className="text-muted-foreground">
            <Trash2 className="h-4 w-4 mr-2" /> Eliminar plan y crear uno nuevo
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">¿Seguro? Perderás el historial del plan actual.</p>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={pending}>
              {pending ? 'Eliminando…' : 'Sí, eliminar'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowConfirm(false)}>Cancelar</Button>
          </div>
        )}
      </div>
    </div>
  )
}

function TopicRow({ pt, status }: { pt: StudyPlanTopic & { topic: Topic }; status: 'past' | 'today' | 'future' }) {
  return (
    <div className={cn(
      'flex items-center gap-3 rounded-lg border p-3',
      status === 'today' && 'border-primary bg-primary/5',
      status === 'past' && 'opacity-60'
    )}>
      <div className="shrink-0">
        {status === 'past'   && <CheckCircle2 className="h-4 w-4 text-green-500" />}
        {status === 'today'  && <Calendar className="h-4 w-4 text-primary" />}
        {status === 'future' && <Clock className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-xs px-1 font-mono">{pt.topic.code}</Badge>
          <Badge className={cn('text-xs px-1', getSubjectColor(pt.topic.subject))}>
            {pt.topic.subject === 'fisica' ? 'Física' : 'Química'}
          </Badge>
          {status === 'today' && <Badge className="text-xs px-1.5 bg-primary">HOY</Badge>}
        </div>
        <p className="text-sm font-medium line-clamp-1 mt-0.5">{pt.topic.title}</p>
      </div>
      {pt.scheduled_date && (
        <span className="text-xs text-muted-foreground shrink-0">
          {format(parseISO(pt.scheduled_date), 'd MMM', { locale: es })}
        </span>
      )}
    </div>
  )
}
