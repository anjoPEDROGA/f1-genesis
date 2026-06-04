import { create } from "zustand"
import { drivers } from "../data/drivers"
import { teams } from "../data/teams"
import type { Driver } from "../types/Driver"
import type { Team } from "../types/Team"

type DriverStore = {
  drivers: Driver[]
  teams: Team[]
  
  getDriverById: (id: string) => Driver | undefined
  getTeamById: (id: string) => Team | undefined
  getDriversByTeam: (teamId: string) => Driver[]
}

export const useDriverStore = create<DriverStore>(() => ({
  drivers,
  teams,
  
  getDriverById: (id) =>
    drivers.find((d) => d.id === id),
    
  getTeamById: (id) =>
    teams.find((t) => t.id === id),
    
  getDriversByTeam: (teamId) =>
    drivers.filter((d) => d.teamId === teamId),
}))