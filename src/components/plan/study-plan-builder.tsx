'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createStudyPlan } from '@/lib/actions/study-plan'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn, getSubjectColor } from '@/lib/utils'
import { Check, Search } from 'lucide-react'
import type { Topic } from '@/types'
import { STUDY_PLAN_TOPICS_COUNT } from '@/types'

interface Props {
  topics: Topic[]
  studentId: string
}

export function StudyPlanBuilder({ topics, studentId }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [search, setSearch]     = useState('')
  const [activeSubject, setActiveSubject] = useState<'all' | 'fisica' | 'quimica'>('all')
  const [error, setError] = useState<string | null>(null)

  const filtered = topics.filter(t => {
    const matchSubject = activeSubject === 'all' || t.subject === activeSubject
    const matchSearch  = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase())
    return matchSubject && matchSearch
  })

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < STUDY_PLAN_TOPICS_COUNT) {
        next.add(id)
      }
      return next
    })
  }

  function handleCreate() {
    setError(null)
    startTransition(async () => {
      const result = await createStudyPlan(studentId, [...selected])
      if (result.error) {
        setError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  const remaining = STUDY_PLAN_TOPICS_COUNT - selected.size

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar temas…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1">
          {(['all', 'fisica', 'quimica'] as const).map(s => (
            <Button
              key={s}
              size="sm"
              variant={activeSubject === s ? 'default' : 'outline'}
              onClick={() => setActiveSubject(s)}
            >
              {s === 'all' ? 'Todos' : s === 'fisica' ? 'Física' : 'Química'}
            </Button>
          ))}
        </div>
      </div>

      {/* Selection header */}
      <div className="flex items-center justify-between py-2 border-b">
        <span className="text-sm text-muted-foreground">
          {selected.size}/{STUDY_PLAN_TOPICS_COUNT} temas seleccionados
          {remaining > 0 && ` · faltan ${remaining}`}
        </span>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button
          onClick={handleCreate}
          disabled={selected.size === 0 || pending}
          size="sm"
        >
          {pending ? 'Creando plan…' : `Crear plan con ${selected.size} temas`}
        </Button>
      </div>

      {/* Topic grid */}
      <div className="grid gap-2 sm:grid-cols-2">
        {filtered.map(topic => {
          const isSelected = selected.has(topic.id)
          const isFull     = selected.size >= STUDY_PLAN_TOPICS_COUNT && !isSelected

          return (
            <button
              key={topic.id}
              onClick={() => toggle(topic.id)}
              disabled={isFull}
              className={cn(
                'w-full text-left rounded-lg border p-3 transition-all flex items-center gap-3',
                isSelected ? 'border-primary bg-primary/5' : 'hover:bg-accent',
                isFull && 'opacity-40 cursor-not-allowed'
              )}
            >
              <div className={cn(
                'shrink-0 h-5 w-5 rounded border flex items-center justify-center',
                isSelected ? 'bg-primary border-primary' : 'border-input'
              )}>
                {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Badge variant="outline" className="text-xs px-1.5 py-0 font-mono">
                    {topic.code}
                  </Badge>
                  <Badge className={cn('text-xs px-1.5 py-0', getSubjectColor(topic.subject))}>
                    {topic.subject === 'fisica' ? 'Física' : 'Química'}
                  </Badge>
                </div>
                <p className="text-sm font-medium line-clamp-1">{topic.title}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
