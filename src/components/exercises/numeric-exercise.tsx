'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn, getLevelColor } from '@/lib/utils'
import { LEVEL_LABELS } from '@/types'
import type { Exercise } from '@/types'

interface Props {
  exercise: Exercise
  onAnswer: (answer: string, isCorrect: boolean) => void
  showResult: boolean
}

function checkNumeric(answer: string, correct: string, tolerance: number): boolean {
  const a = parseFloat(answer.replace(',', '.'))
  const c = parseFloat(correct)
  if (isNaN(a) || isNaN(c)) return false
  if (c === 0) return Math.abs(a) < 1e-9
  return Math.abs((a - c) / c) <= tolerance
}

export function NumericExercise({ exercise, onAnswer, showResult }: Props) {
  const [value, setValue]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim() || submitted) return
    setSubmitted(true)
    const isCorrect = exercise.type === 'numeric'
      ? checkNumeric(value, exercise.correct_answer ?? '', exercise.tolerance ?? 0.01)
      : value.trim().toLowerCase() === (exercise.correct_answer ?? '').toLowerCase()
    onAnswer(value.trim(), isCorrect)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={cn('text-xs', getLevelColor(exercise.level))}>
            {LEVEL_LABELS[exercise.level]}
          </Badge>
          <Badge variant="outline" className="text-xs">{exercise.points} pts</Badge>
          {exercise.type === 'numeric' && (
            <Badge variant="secondary" className="text-xs">
              ±{Math.round((exercise.tolerance ?? 0.01) * 100)}% tolerancia
            </Badge>
          )}
        </div>
        <p className="text-base font-medium leading-relaxed">{exercise.question}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type={exercise.type === 'numeric' ? 'text' : 'text'}
            placeholder={exercise.type === 'numeric' ? 'Escribe el valor numérico…' : 'Tu respuesta…'}
            value={value}
            onChange={e => setValue(e.target.value)}
            disabled={showResult}
            className="flex-1"
            autoFocus
          />
          <Button type="submit" disabled={showResult || !value.trim()}>
            Comprobar
          </Button>
        </form>

        {showResult && exercise.correct_answer && (
          <div className="mt-3 p-3 rounded-md bg-muted text-sm">
            <span className="font-medium">Respuesta correcta: </span>
            <span className="text-primary">{exercise.correct_answer}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
