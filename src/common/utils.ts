export function getTimeString(createdAt: Date): string {
  return `(${createdAt.getHours()}:${createdAt.getMinutes()}) ${createdAt.toDateString()}`
}
