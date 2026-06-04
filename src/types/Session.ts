export type SessionType =
  | "practice1"
  | "practice2"
  | "practice3"
  | "qualifying"
  | "sprint"
  | "race";

export type Session = {
  id: string;
  raceId: string;
  type: SessionType;
  date: string;
  time: string;
  completed: boolean;
};