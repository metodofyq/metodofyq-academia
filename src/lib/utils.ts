import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, addDays, isToday, isPast } from 'date-fns'
import { es } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, pattern = 'dd MMM yyyy') {
  return format(new Date(date), pattern, { locale: es })
}

export function isDateToday(date: string | Date) {
  return isToday(new Date(date))
}

export function isDatePast(date: string | Date) {
  return isPast(new Date(date))
}

export function addDaysToDate(date: string | Date, days: number) {
  return addDays(new Date(date), days)
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

export function calculateAccuracyPercent(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

export function getSubjectColor(subject: string): string {
  return subject === 'fisica'
    ? 'bg-blue-100 text-blue-800'
    : 'bg-green-100 text-green-800'
}

export function getLevelColor(level: number): string {
  const colors = [
    'bg-gray-100 text-gray-700',
    'bg-yellow-100 text-yellow-700',
    'bg-orange-100 text-orange-700',
    'bg-red-100 text-red-700',
    'bg-purple-100 text-purple-700',
  ]
  return colors[level] ?? colors[0]
}
