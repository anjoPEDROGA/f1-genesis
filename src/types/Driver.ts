export type Driver = {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  number: number;
  teamId: string;
  image: string;
  nationality: string;
  dateOfBirth: string;
  baseWins: number;
  basePodiums: number;
  championships: number;
  bio?: string;
  history?: string[];
};
