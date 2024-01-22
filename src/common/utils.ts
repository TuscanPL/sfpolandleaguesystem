import type { MatchStatus } from '@/models/app/matchModel'

export function getTimeString(createdAt: Date): string {
  return `(${createdAt.getHours().toString().padStart(2, '0')}:${createdAt
    .getMinutes()
    .toString()
    .padStart(2, '0')}) ${createdAt.toDateString()}`
}

export function getMatchStatusTranslation(matchStatus?: MatchStatus): string {
  switch (matchStatus) {
    case 'upcoming':
      return 'Nadchodzący'
    case 'completed':
      return 'Zakończony'
    case 'cancelled':
      return 'Anulowany'
    case 'in_progress':
      return 'W trakcie'
    default:
      return 'Unknown'
  }
}
