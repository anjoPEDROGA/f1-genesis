// src/utils/points.ts

export const POINTS_SYSTEM = [
  25, 18, 15, 12, 10, 8, 6, 4, 2, 1
] as const

export function getPointsForPosition(position: number): number {
  if (position < 1 || position > 10) return 0
  return POINTS_SYSTEM[position - 1]
}

export function isPodium(position: number): boolean {
  return position >= 1 && position <= 3
}

export function isWin(position: number): boolean {
  return position === 1
}