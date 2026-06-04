import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DriverStanding, ConstructorStanding } from "../types/Standing";
import type { Race } from "../types/Race";
import { isPodium, isWin } from "../utils/points";
import { drivers } from "../data/drivers";

const POINTS_RACE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
const POINTS_SPRINT = [8, 7, 6, 5, 4, 3, 2, 1];

type StandingsStore = {
  driverStandings: DriverStanding[];
  constructorStandings: ConstructorStanding[];
  isSimulating: boolean;
  recalculateAll: (races: Race[]) => void;
  resetStandings: () => void;
};

export const useStandingsStore = create<StandingsStore>()(
  persist(
    (set) => ({
      driverStandings: [],
      constructorStandings: [],
      isSimulating: false,

      recalculateAll: (races: Race[]) => {
        set({ isSimulating: true });

        const driverStats: Record<string, { points: number; wins: number; podiums: number }> = {};
        const teamStats: Record<string, { points: number; wins: number; podiums: number }> = {};

        races.forEach((race) => {
          race.sessions.forEach((session) => {
            if (!session.completed || !session.results) return;

            // SEPARAÇÃO DE EVENTOS: Só pontua e conta estatísticas se for Corrida ou Sprint
            if (session.type !== "corrida" && session.type !== "sprint") return;

            const isSprint = session.type === "sprint";
            const pointsTable = isSprint ? POINTS_SPRINT : POINTS_RACE;

            session.results.forEach((res, index) => {
              if (res.position === "DNF") return;

              const driverId = res.driverId;
              const pointsEarned = pointsTable[index] || 0;
              const pos = typeof res.position === "number" ? res.position : 0;

              // Pilotos
              if (!driverStats[driverId]) driverStats[driverId] = { points: 0, wins: 0, podiums: 0 };
              driverStats[driverId].points += pointsEarned;
              
              // Só conta Vitória/Pódio se for a corrida principal (domingo) ou se você quiser considerar vitórias de Sprint (opcional)
              if (session.type === "corrida") {
                if (isWin(pos)) driverStats[driverId].wins += 1;
                if (isPodium(pos)) driverStats[driverId].podiums += 1;
              }

              // Construtores
              const driverInfo = drivers.find(d => d.id === driverId);
              if (driverInfo) {
                const teamId = driverInfo.teamId;
                if (!teamStats[teamId]) teamStats[teamId] = { points: 0, wins: 0, podiums: 0 };
                teamStats[teamId].points += pointsEarned;
                
                if (session.type === "corrida") {
                  if (isWin(pos)) teamStats[teamId].wins += 1;
                  if (isPodium(pos)) teamStats[teamId].podiums += 1;
                }
              }
            });
          });
        });

        const updatedDriverStandings: DriverStanding[] = Object.keys(driverStats)
          .map((driverId) => ({
            driverId,
            points: driverStats[driverId].points,
            wins: driverStats[driverId].wins,
            podiums: driverStats[driverId].podiums,
            position: 0,
          }))
          .sort((a, b) => b.points - a.points);
        updatedDriverStandings.forEach((s, i) => (s.position = i + 1));

        const updatedConstructorStandings: ConstructorStanding[] = Object.keys(teamStats)
          .map((teamId) => ({
            teamId,
            points: teamStats[teamId].points,
            wins: teamStats[teamId].wins,
            podiums: teamStats[teamId].podiums,
            position: 0,
          }))
          .sort((a, b) => b.points - a.points);
        updatedConstructorStandings.forEach((s, i) => (s.position = i + 1));

        set({ driverStandings: updatedDriverStandings, constructorStandings: updatedConstructorStandings, isSimulating: false });
      },

      resetStandings: () => set({ driverStandings: [], constructorStandings: [] }),
    }),
    { name: "f1-manager-standings" }
  )
);