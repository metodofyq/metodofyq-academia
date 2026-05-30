/**
 * SM-2 spaced repetition algorithm.
 * Grade scale: 0–5 where ≥3 = correct recall
 *   5 = perfect  4 = correct after hesitation  3 = correct with difficulty
 *   2 = wrong but easy  1 = wrong  0 = complete blackout
 */

import type { SpacedRepetition } from '@/types'

export type SM2Result = {
  ease_factor: number
  interval_days: number
  repetitions: number
  next_review_date: string
}

export function sm2(card: Pick<SpacedRepetition, 'ease_factor' | 'interval_days' | 'repetitions'>, grade: number): SM2Result {
  if (grade < 0 || grade > 5) throw new Error('SM-2 grade must be 0–5')

  let { ease_factor, interval_days, repetitions } = card

  if (grade >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval_days = 1
    } else if (repetitions === 1) {
      interval_days = 6
    } else {
      interval_days = Math.round(interval_days * ease_factor)
    }
    repetitions += 1
  } else {
    // Incorrect — reset interval but keep ease factor
    repetitions = 0
    interval_days = 1
  }

  // Update ease factor
  ease_factor = ease_factor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  if (ease_factor < 1.3) ease_factor = 1.3

  const next = new Date()
  next.setDate(next.getDate() + interval_days)
  const next_review_date = next.toISOString().split('T')[0]

  return {
    ease_factor: Math.round(ease_factor * 1000) / 1000,
    interval_days,
    repetitions,
    next_review_date,
  }
}

/**
 * Convert a score percentage (0–100) to an SM-2 grade (0–5).
 */
export function scoreToSM2Grade(scorePercent: number): number {
  if (scorePercent >= 90) return 5
  if (scorePercent >= 75) return 4
  if (scorePercent >= 60) return 3
  if (scorePercent >= 40) return 2
  if (scorePercent >= 20) return 1
  return 0
}

/**
 * Initialize a fresh SR card for a new topic.
 */
export function newCard(): Omit<SM2Result, 'next_review_date'> {
  return {
    ease_factor: 2.5,
    interval_days: 1,
    repetitions: 0,
  }
}
