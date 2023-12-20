export function getTimeString(createdAt: Date): string {
  return `(${createdAt.getHours()}:${createdAt
    .getMinutes()
    .toString()
    .padStart(2, '0')}) ${createdAt.toDateString()}`
}
