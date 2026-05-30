'use client'

import Link from 'next/link'
import { CheckCircle2, Circle, BookOpen, RotateCcw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, getSubjectColor } from '@/lib/utils'
import type { DailyTaskWithTopic } from '@/types'

interface Props {
  tasks: DailyTaskWithTopic[]
}

export function DailyTaskList({ tasks }: Props) {
  const newTopics = tasks.filter(t => t.task_type === 'new_topic')
  const reviews   = tasks.filter(t => t.task_type === 'review')
  const completed = tasks.filter(t => t.is_completed).length

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(completed / tasks.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {completed}/{tasks.length} completadas
        </span>
      </div>

      {newTopics.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Tema nuevo
          </h3>
          <div className="space-y-3">
            {newTopics.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <RotateCcw className="h-4 w-4" /> Repasos de hoy
          </h3>
          <div className="space-y-3">
            {reviews.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task }: { task: DailyTaskWithTopic }) {
  const exerciseCount = task.exercise_ids?.length ?? 0

  return (
    <Card className={cn('transition-opacity', task.is_completed && 'opacity-60')}>
      <CardContent className="flex items-center gap-4 p-4">
        {task.is_completed
          ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
        }

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm truncate">{task.topic.title}</span>
            <Badge variant="secondary" className={cn('text-xs', getSubjectColor(task.topic.subject))}>
              {task.topic.subject === 'fisica' ? 'Física' : 'Química'}
            </Badge>
            <Badge variant="outline" className="text-xs">{task.topic.code}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {exerciseCount} ejercicio{exerciseCount !== 1 ? 's' : ''}
            {task.task_type === 'review' ? ' · Repaso espaciado' : ' · Tema nuevo'}
          </p>
        </div>

        {!task.is_completed && exerciseCount > 0 ? (
          <Button asChild size="sm">
            <Link href={`/topics/${task.topic_id}?task=${task.id}`}>
              {task.task_type === 'new_topic' ? 'Estudiar' : 'Repasar'}
            </Link>
          </Button>
        ) : !task.is_completed ? (
          <Button asChild size="sm" variant="outline">
            <Link href={`/topics/${task.topic_id}`}>Ver tema</Link>
          </Button>
        ) : (
          <span className="text-xs text-green-600 font-medium">¡Hecho!</span>
        )}
      </CardContent>
    </Card>
  )
}
