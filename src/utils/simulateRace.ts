// src/utils/simulateRace.ts

import type { Driver } from "../types/Driver"
import type { Result } from "../types/Result"
import { getPointsForPosition } from "./points"

/**
 * Simula uma corrida com base nos pilotos fornecidos
 * Adiciona aleatoriedade realista baseada em performance de time
 */
export function simulateRace(drivers: Driver[]): Result[] {
  // Performance base por time (simulação simplificada)
  const teamPerformance: Record<string, number> = {
    redbull: 0.95,
    mclaren: 0.90,
    ferrari: 0.88,
    mercedes: 0.85,
    astonmartin: 0.75,
    alpine: 0.70,
    williams: 0.65,
    rb: 0.62,
    haas: 0.58,
    sauber: 0.55,
  }

  // Gera tempo de volta para cada piloto
  const driversWithTimes = drivers.map((driver) => {
    const basePerformance = teamPerformance[driver.teamId] || 0.5
    const randomFactor = 0.95 + Math.random() * 0.1 // ±5% variação
    const lapTime = 90 / (basePerformance * randomFactor)

    return {
      driver,
      lapTime,
    }
  })

  // Ordena por tempo de volta (menor = melhor)
  driversWithTimes.sort((a, b) => a.lapTime - b.lapTime)

  // Cria resultados com posições e pontos
  const results: Result[] = driversWithTimes.map((item, index) => ({
    driverId: item.driver.id,
    position: index + 1,
    points: getPointsForPosition(index + 1),
  }))

  return results
}