// src/services/raceSimulation.ts

import type { Driver } from "../types/Driver"
import type { Result } from "../types/Result"
import { simulateRace as runSimulation } from "../utils/simulateRace"

/**
 * Service layer para simulação de corridas
 * Adiciona delay para simular processamento/animação
 */
export async function simulateRace(
  drivers: Driver[]
): Promise<Result[]> {
  // Simula delay de processamento (para animações futuras)
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const results = runSimulation(drivers)

  return results
}

/**
 * Simula uma corrida instantaneamente (sem delay)
 */
export function simulateRaceInstant(
  drivers: Driver[]
): Result[] {
  return runSimulation(drivers)
}