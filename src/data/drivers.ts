import type { Driver } from "../types/Driver";

const BASE_URL = "https://pub-8f904e7001844d918dca3a6d9b676eb7.r2.dev";

export const drivers: Driver[] = [
  // McLaren
  { id: "nor", code: "NOR", firstName: "Lando", lastName: "Norris", number: 4, teamId: "mclaren", image: `${BASE_URL}/drivers/norris.png`, nationality: "Reino Unido", dateOfBirth: "13/11/1999", baseWins: 5, basePodiums: 20, championships: 1 },
  { id: "pia", code: "PIA", firstName: "Oscar", lastName: "Piastri", number: 81, teamId: "mclaren", image: `${BASE_URL}/drivers/piastri.png`, nationality: "Austrália", dateOfBirth: "06/04/2001", baseWins: 3, basePodiums: 15, championships: 0 },

  // Ferrari
  { id: "lec", code: "LEC", firstName: "Charles", lastName: "Leclerc", number: 16, teamId: "ferrari", image: `${BASE_URL}/drivers/leclerc.png`, nationality: "Mônaco", dateOfBirth: "16/10/1997", baseWins: 6, basePodiums: 36, championships: 0 },
  { id: "ham", code: "HAM", firstName: "Lewis", lastName: "Hamilton", number: 44, teamId: "ferrari", image: `${BASE_URL}/drivers/hamilton.png`, nationality: "Reino Unido", dateOfBirth: "07/01/1985", baseWins: 105, basePodiums: 200, championships: 7 },

  // Red Bull
  { id: "ver", code: "VER", firstName: "Max", lastName: "Verstappen", number: 1, teamId: "redbull", image: `${BASE_URL}/drivers/verstappen.png`, nationality: "Países Baixos", dateOfBirth: "30/09/1997", baseWins: 60, basePodiums: 100, championships: 4 },
  { id: "had", code: "HAD", firstName: "Isack", lastName: "Hadjar", number: 9, teamId: "redbull", image: `${BASE_URL}/drivers/hadjar.png`, nationality: "França", dateOfBirth: "28/09/2004", baseWins: 0, basePodiums: 0, championships: 0 },

  // Mercedes
  { id: "rus", code: "RUS", firstName: "George", lastName: "Russell", number: 63, teamId: "mercedes", image: `${BASE_URL}/drivers/russell.png`, nationality: "Reino Unido", dateOfBirth: "15/02/1998", baseWins: 2, basePodiums: 15, championships: 0 },
  { id: "ant", code: "ANT", firstName: "Kimi", lastName: "Antonelli", number: 12, teamId: "mercedes", image: `${BASE_URL}/drivers/antonelli.png`, nationality: "Itália", dateOfBirth: "25/08/2006", baseWins: 1, basePodiums: 2, championships: 0 },

  // Aston Martin
  { id: "alo", code: "ALO", firstName: "Fernando", lastName: "Alonso", number: 14, teamId: "astonmartin", image: `${BASE_URL}/drivers/alonso.png`, nationality: "Espanha", dateOfBirth: "29/07/1981", baseWins: 32, basePodiums: 100, championships: 2 },
  { id: "str", code: "STR", firstName: "Lance", lastName: "Stroll", number: 18, teamId: "astonmartin", image: `${BASE_URL}/drivers/stroll.png`, nationality: "Canadá", dateOfBirth: "29/10/1998", baseWins: 0, basePodiums: 3, championships: 0 },

  // Alpine
  { id: "gas", code: "GAS", firstName: "Pierre", lastName: "Gasly", number: 10, teamId: "alpine", image: `${BASE_URL}/drivers/gasly.png`, nationality: "França", dateOfBirth: "07/02/1996", baseWins: 1, basePodiums: 5, championships: 0 },
  { id: "col", code: "COL", firstName: "Franco", lastName: "Colapinto", number: 43, teamId: "alpine", image: `${BASE_URL}/drivers/colapinto.png`, nationality: "Argentina", dateOfBirth: "27/05/2003", baseWins: 0, basePodiums: 0, championships: 0 },

  // Williams
  { id: "sai", code: "SAI", firstName: "Carlos", lastName: "Sainz", number: 55, teamId: "williams", image: `${BASE_URL}/drivers/sainz.png`, nationality: "Espanha", dateOfBirth: "01/09/1994", baseWins: 3, basePodiums: 20, championships: 0 },
  { id: "alb", code: "ALB", firstName: "Alex", lastName: "Albon", number: 23, teamId: "williams", image: `${BASE_URL}/drivers/albon.png`, nationality: "Tailândia", dateOfBirth: "23/03/1996", baseWins: 0, basePodiums: 2, championships: 0 },

  // Haas
  { id: "oco", code: "OCO", firstName: "Esteban", lastName: "Ocon", number: 31, teamId: "haas", image: `${BASE_URL}/drivers/ocon.png`, nationality: "França", dateOfBirth: "17/09/1996", baseWins: 1, basePodiums: 4, championships: 0 },
  { id: "bea", code: "BEA", firstName: "Ollie", lastName: "Bearman", number: 87, teamId: "haas", image: `${BASE_URL}/drivers/bearman.png`, nationality: "Reino Unido", dateOfBirth: "08/05/2005", baseWins: 0, basePodiums: 0, championships: 0 },

  // Racing Bulls (RB)
  { id: "law", code: "LAW", firstName: "Liam", lastName: "Lawson", number: 30, teamId: "rb", image: `${BASE_URL}/drivers/lawson.png`, nationality: "Nova Zelândia", dateOfBirth: "11/02/2002", baseWins: 0, basePodiums: 0, championships: 0 },
  { id: "lin", code: "LIN", firstName: "Arvid", lastName: "Lindblad", number: 41, teamId: "rb", image: `${BASE_URL}/drivers/lindblad.png`, nationality: "Reino Unido", dateOfBirth: "08/08/2007", baseWins: 0, basePodiums: 0, championships: 0 },

  // Audi
  { id: "hul", code: "HUL", firstName: "Nico", lastName: "Hülkenberg", number: 27, teamId: "audi", image: `${BASE_URL}/drivers/hulkenberg.png`, nationality: "Alemanha", dateOfBirth: "19/08/1987", baseWins: 0, basePodiums: 0, championships: 0 },
  { id: "bor", code: "BOR", firstName: "Gabriel", lastName: "Bortoleto", number: 96, teamId: "audi", image: `${BASE_URL}/drivers/bortoleto.png`, nationality: "Brasil", dateOfBirth: "14/10/2004", baseWins: 0, basePodiums: 0, championships: 0 },

  // Cadillac
  { id: "per", code: "PER", firstName: "Sergio", lastName: "Pérez", number: 11, teamId: "cadillac", image: `${BASE_URL}/drivers/perez.png`, nationality: "México", dateOfBirth: "26/01/1990", baseWins: 6, basePodiums: 30, championships: 0 },
  { id: "bot", code: "BOT", firstName: "Valtteri", lastName: "Bottas", number: 77, teamId: "cadillac", image: `${BASE_URL}/drivers/bottas.png`, nationality: "Finlândia", dateOfBirth: "28/08/1989", baseWins: 10, basePodiums: 60, championships: 0 },
];