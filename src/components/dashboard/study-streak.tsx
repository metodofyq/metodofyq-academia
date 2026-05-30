import { Flame } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { format, subDays, parseISO } from 'date-fns'

interface Props {
  completedDates: string[]
}

function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0
  const unique = [...new Set(dates)].sort().reverse()
  let streak = 0
  let cursor = format(new Date(), 'yyyy-MM-dd')

  for (const d of unique) {
    if (d === cursor) {
      streak++
      cursor = format(subDays(parseISO(cursor), 1), 'yyyy-MM-dd')
    } else break
  }
  return streak
}

export function StudyStreak({ completedDates }: Props) {
  const streak = computeStreak(completedDates)

  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${streak > 0 ? 'bg-orange-100' : 'bg-muted'}`}>
          <Flame className={`h-6 w-6 ${streak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
        </div>
        <div className="text-3xl font-bold">{streak}</div>
        <div className="text-sm text-muted-foreground">
          {streak === 1 ? 'día de racha' : 'días de racha'}
        </div>
        {streak >= 7 && (
          <div className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            🔥 ¡Semana perfecta!
          </div>
        )}
      </CardContent>
    </Card>
  )
}
