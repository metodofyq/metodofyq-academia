import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Target, TrendingUp } from 'lucide-react'
import { calculateAccuracyPercent } from '@/lib/utils'

interface Props {
  topicsStarted: number
  totalAttempts: number
  correctAttempts: number
}

export function ProgressOverview({ topicsStarted, totalAttempts, correctAttempts }: Props) {
  const accuracy = calculateAccuracyPercent(correctAttempts, totalAttempts)

  const stats = [
    { label: 'Temas iniciados', value: topicsStarted,   icon: BookOpen,   color: 'text-blue-600' },
    { label: 'Ejercicios hechos', value: totalAttempts, icon: Target,     color: 'text-green-600' },
    { label: '% Acierto',        value: `${accuracy}%`, icon: TrendingUp, color: 'text-purple-600' },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-4">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
