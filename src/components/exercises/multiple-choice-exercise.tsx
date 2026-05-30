'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, getLevelColor } from '@/lib/utils'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { Exercise, ExerciseOption } from '@/types'
import { LEVEL_LABELS } from '@/types'

interface Props {
  exercise: Exercise
  onAnswer: (answer: string, isCorrect: boolean) => void
  showResult: boolean
}

export function MultipleChoiceExercise({ exercise, onAnswer, showResult }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const options = (exercise.options ?? []) as ExerciseOption[]

  function handleSelect(opt: ExerciseOption) {
    if (showResult || selected) return
    setSelected(opt.id)
    onAnswer(opt.id, opt.is_correct)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={cn('text-xs', getLevelColor(exercise.level))}>
            {LEVEL_LABELS[exercise.level]}
          </Badge>
          <Badge variant="outline" className="text-xs">{exercise.points} pts</Badge>
        </div>
        <p className="text-base font-medium leading-relaxed">{exercise.question}</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {options.map(opt => {
            const isSelected = selected === opt.id
            const isCorrect  = opt.is_correct

            let variant: 'outline' | 'default' | 'secondary' = 'outline'
            let extra = ''

            if (showResult && isSelected && isCorrect)  { extra = 'border-green-500 bg-green-50 text-green-800' }
            if (showResult && isSelected && !isCorrect) { extra = 'border-red-500 bg-red-50 text-red-800' }
            if (showResult && !isSelected && isCorrect) { extra = 'border-green-400 bg-green-50 text-green-700' }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                disabled={showResult}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-md border text-sm transition-all flex items-center gap-3',
                  !showResult && !selected && 'hover:bg-accent cursor-pointer',
                  extra || 'border-border',
                  showResult && 'cursor-default'
                )}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium">
                  {opt.id.toUpperCase()}
                </span>
                <span className="flex-1">{opt.text}</span>
                {showResult && isSelected && (
                  isCorrect
                    ? <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                    : <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                )}
                {showResult && !isSelected && isCorrect && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                )}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
