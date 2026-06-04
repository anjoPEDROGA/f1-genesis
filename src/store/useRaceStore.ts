import { create } from "zustand";
import { persist } from "zustand/middleware";
import { races as initialRaces } from "../data/races";
import type { Race } from "../types/Race";
import type { SessionResult } from "../types/Race";

function getSessionDateTime(sessionDate: string, sessionTime: string) {
  return new Date(`${sessionDate}T${sessionTime}:00`);
}

function getNextUpcomingSession(race: Race) {
  if (race.cancelled || !race.sessions.length) return undefined;

  const now = Date.now();

  return [...race.sessions]
    .map((session) => ({
      session,
      targetDate: getSessionDateTime(session.date, session.time),
    }))
    .filter(({ targetDate }) => targetDate.getTime() > now)
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())[0];
}

type RaceStore = {
  races: Race[];
  currentRound: number;
  advanceRound: () => void;
  getNextRace: () => Race | undefined;
  updateSession: (raceId: string, sessionType: string, results: SessionResult[]) => void;
  resetRaces: () => void;
};

export const useRaceStore = create<RaceStore>()(
  persist(
    (set, get) => ({
      races: initialRaces,
      currentRound: 1,

      advanceRound: () =>
        set((state) => ({
          currentRound: Math.min(state.currentRound + 1, 24),
        })),

      getNextRace: () => {
        const { races } = get();
        return [...races]
          .filter((race) => !race.cancelled)
          .map((race) => {
            const nextSession = getNextUpcomingSession(race);
            return nextSession
              ? {
                  race,
                  targetDate: nextSession.targetDate,
                }
              : undefined;
          })
          .filter((item): item is { race: Race; targetDate: Date } => Boolean(item))
          .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())[0]
          ?.race;
      },

      updateSession: (raceId, sessionType, results) => {
        set((state) => ({
          races: state.races.map((race) => {
            if (race.id !== raceId) return race;

            return {
              ...race,
              sessions: race.sessions.map((s) =>
                s.type === sessionType
                  ? { ...s, results, completed: true }
                  : s
              ),
            };
          }),
        }));
      },

      resetRaces: () =>
        set({
          races: initialRaces,
          currentRound: 1,
        }),
    }),
    { name: "f1-manager-races" }
  )
);
