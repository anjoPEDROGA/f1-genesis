export type SessionType =
  | "treino1"
  | "treino2"
  | "treino3"
  | "quali_sprint"
  | "quali"
  | "sprint"
  | "corrida";

export type SessionResult = {
  driverId: string;
  position: number | "DNF";
};

export type Session = {
  type: SessionType;
  label: string;
  date: string;
  time: string;
  completed: boolean;
  results: SessionResult[];
};

export type Race = {
  id: string;
  round: number;
  name: string;
  circuit: string;
  country: string;
  date: string;
  circuitImage: string;
  flag: string;
  cancelled?: boolean;
  inauguration: string;
  firstGP: string;
  mostWins: string;
  totalGPs: number;
  sessions: Session[];
};