export function getTimeString(createdAt: Date): string {
  return `(${createdAt.getHours().toString().padStart(2, '0')}:${createdAt
    .getMinutes()
    .toString()
    .padStart(2, '0')}) ${createdAt.toDateString()}`
}
