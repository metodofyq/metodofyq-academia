'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { sm2, scoreToSM2Grade } from '@/lib/spaced-repetition'
import { MultipleChoiceExercise } from './multiple-choice-exercise'
import { NumericExercise } from './numeric-exercise'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, ChevronRight, Trophy } from 'lucide-react'
import type { Exercise } from '@/types'

interface Props {
  exercises: Exercise[]
  topicId: string
  taskId?: string
}

type AttemptResult = {
  exerciseId: string
  answer: string
  isCorrect: boolean
  timeSpent: number
}

export function ExerciseSession({ exercises, topicId, taskId }: Props) {
  const router = useRouter()
  const [current, setCurrent]     = useState(0)
  const [results, setResults]     = useState<AttemptResult[]>([])
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished]   = useState(false)
  const [startTime] = useState(Date.now())
  const [exerciseStart, setExerciseStart] = useState(Date.now())

  const exercise = exercises[current]
  const progress = ((current + (showResult ? 1 : 0)) / exercises.length) * 100

  const handleAnswer = useCallback(async (answer: string, isCorrect: boolean) => {
    const timeSpent = Math.round((Date.now() - exerciseStart) / 1000)
    const result: AttemptResult = { exerciseId: exercise.id, answer, isCorrect, timeSpent }
    setResults(prev => [...prev, result])

    // Save attempt to DB
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('exercise_attempts').insert({
        student_id:          user.id,
        exercise_id:         exercise.id,
        answer,
        is_correct:          isCorrect,
        time_spent_seconds:  timeSpent,
        score:               isCorrect ? exercise.points : 0,
      })
    }

    setShowResult(true)
  }, [exercise, exerciseStart])

  const handleNext = useCallback(async () => {
    if (current + 1 >= exercises.length) {
      // Session complete — update SR card and task status
      const allResults = results
      const correctCount = allResults.filter(r => r.isCorrect).length
      const scorePercent = Math.round((correctCount / exercises.length) * 100)

      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Update spaced repetition
        const { data: srCard } = await supabase
          .from('spaced_repetition')
          .select('*')
          .eq('student_id', user.id)
          .eq('topic_id', topicId)
          .single()

        if (srCard) {
          const grade = scoreToSM2Grade(scorePercent)
          const updated = sm2(srCard, grade)
          await supabase.from('spaced_repetition')
            .update(updated)
            .eq('id', srCard.id)
        }

        // Level up if > 80% correct
        if (scorePercent >= 80) {
          const { data: tp } = await supabase
            .from('topic_progress')
            .select('current_level')
            .eq('student_id', user.id)
            .eq('topic_id', topicId)
            .single()

          if (tp && tp.current_level < 4) {
            await supabase.from('topic_progress')
              .update({
                current_level:   tp.current_level + 1,
                last_studied_at: new Date().toISOString(),
              })
              .eq('student_id', user.id)
              .eq('topic_id', topicId)
          }
        }

        // Mark daily task complete
        if (taskId) {
          await supabase.from('daily_tasks')
            .update({ is_completed: true, completed_at: new Date().toISOString() })
            .eq('id', taskId)
            .eq('student_id', user.id)
        }
      }

      setFinished(true)
      return
    }

    setCurrent(c => c + 1)
    setShowResult(false)
    setExerciseStart(Date.now())
  }, [current, exercises.length, results, topicId, taskId])

  if (finished) {
    const correctCount = results.filter(r => r.isCorrect).length
    const score = Math.round((correctCount / exercises.length) * 100)

    return (
      <Card>
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
          <h3 className="text-xl font-bold">¡Sesión completada!</h3>
          <div className="text-4xl font-bold text-primary">{score}%</div>
          <p className="text-muted-foreground">
            {correctCount} correctas de {exercises.length} ejercicios
          </p>
          {score >= 80 && (
            <Badge className="bg-green-100 text-green-800">¡Nivel superado! +1 nivel</Badge>
          )}
          <div className="flex gap-3 justify-center pt-4">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Volver al dashboard
            </Button>
            <Button onClick={() => {
              setCurrent(0)
              setResults([])
              setShowResult(false)
              setFinished(false)
              setExerciseStart(Date.now())
            }}>
              Repetir ejercicios
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <Progress value={progress} className="flex-1 h-2" />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {current + 1}/{exercises.length}
        </span>
      </div>

      {/* Exercise card */}
      {exercise.type === 'multiple_choice' ? (
        <MultipleChoiceExercise
          exercise={exercise}
          onAnswer={handleAnswer}
          showResult={showResult}
        />
      ) : (
        <NumericExercise
          exercise={exercise}
          onAnswer={handleAnswer}
          showResult={showResult}
        />
      )}

      {/* Result feedback + next */}
      {showResult && (
        <Card className={results[results.length - 1]?.isCorrect
          ? 'border-green-300 bg-green-50'
          : 'border-red-300 bg-red-50'
        }>
          <CardContent className="pt-4 flex items-start gap-3">
            {results[results.length - 1]?.isCorrect
              ? <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              : <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            }
            <div className="flex-1">
              <p className="font-medium text-sm">
                {results[results.length - 1]?.isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
              </p>
              {exercise.explanation && (
                <p className="text-sm mt-1 text-muted-foreground">{exercise.explanation}</p>
              )}
            </div>
            <Button size="sm" onClick={handleNext} className="shrink-0">
              {current + 1 >= exercises.length ? 'Ver resultado' : 'Siguiente'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
