import type { Team } from "../types/Team";

export type TeamHistory = {
  foundation: string;
  country: string;
  base: string;
  constructorsTitles: number;
  driversTitles: number;
  wins: number;
  poles: number;
  podiums: number;
  driversChampionships?: string[];
  constructorsChampionships?: string[];
  biography: string;
  legacy?: string;
};

export const teamHistory: Record<string, TeamHistory> = {
  ferrari: {
    foundation: "1950",
    country: "Itália",
    base: "Maranello, Itália",
    constructorsTitles: 16,
    driversTitles: 15,
    wins: 248,
    poles: 254,
    podiums: 836,
    driversChampionships: [
      "Alberto Ascari (1952, 1953)",
      "Juan Manuel Fangio (1956)",
      "Mike Hawthorn (1958)",
      "Phil Hill (1961)",
      "John Surtees (1964)",
      "Niki Lauda (1975, 1977)",
      "Jody Scheckter (1979)",
      "Michael Schumacher (2000, 2001, 2002, 2003, 2004)",
      "Kimi Räikkönen (2007)",
    ],
    constructorsChampionships: ["1961", "1964", "1975", "1976", "1977", "1979", "1982", "1983", "1999", "2000", "2001", "2002", "2003", "2004", "2007", "2008"],
    biography:
      "Única equipe presente em todas as temporadas da Fórmula 1 desde 1950. É a maior vencedora da história da categoria e uma das marcas esportivas mais reconhecidas do mundo.",
  },
  mclaren: {
    foundation: "1966",
    country: "Reino Unido",
    base: "Woking, Inglaterra",
    constructorsTitles: 10,
    driversTitles: 13,
    wins: 203,
    poles: 177,
    podiums: 561,
    driversChampionships: [
      "Emerson Fittipaldi (1974)",
      "James Hunt (1976)",
      "Niki Lauda (1984)",
      "Alain Prost (1985, 1986, 1989)",
      "Ayrton Senna (1988, 1990, 1991)",
      "Mika Häkkinen (1998, 1999)",
      "Lewis Hamilton (2008)",
      "Lando Norris (2025)",
    ],
    constructorsChampionships: ["1974", "1984", "1985", "1988", "1989", "1990", "1991", "1998", "2024", "2025"],
    biography:
      "Fundada por Bruce McLaren, tornou-se uma das equipes mais importantes da Fórmula 1. Foi palco das carreiras de Senna, Prost, Häkkinen e Hamilton.",
  },
  mercedes: {
    foundation: "1954",
    country: "Alemanha",
    base: "Brackley, Inglaterra",
    constructorsTitles: 8,
    driversTitles: 9,
    wins: 136,
    poles: 148,
    podiums: 317,
    driversChampionships: ["Juan Manuel Fangio (1954, 1955)", "Lewis Hamilton (2014, 2015, 2017, 2018, 2019, 2020)", "Nico Rosberg (2016)"],
    constructorsChampionships: ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
    biography:
      "Dominou a Era Híbrida da Fórmula 1 e estabeleceu o recorde de oito títulos consecutivos de construtores.",
  },
  redbull: {
    foundation: "2005",
    country: "Áustria",
    base: "Milton Keynes, Inglaterra",
    constructorsTitles: 6,
    driversTitles: 8,
    wins: 130,
    poles: 111,
    podiums: 298,
    driversChampionships: ["Sebastian Vettel (2010, 2011, 2012, 2013)", "Max Verstappen (2021, 2022, 2023, 2024)"],
    constructorsChampionships: ["2010", "2011", "2012", "2013", "2022", "2023"],
    biography:
      "Comprou a Jaguar Racing em 2004 e rapidamente se transformou em uma potência da Fórmula 1.",
  },
  williams: {
    foundation: "1978",
    country: "Reino Unido",
    base: "Grove, Inglaterra",
    constructorsTitles: 9,
    driversTitles: 7,
    wins: 114,
    poles: 128,
    podiums: 313,
    driversChampionships: [
      "Alan Jones (1980)",
      "Keke Rosberg (1982)",
      "Nelson Piquet (1987)",
      "Nigel Mansell (1992)",
      "Alain Prost (1993)",
      "Damon Hill (1996)",
      "Jacques Villeneuve (1997)",
    ],
    constructorsChampionships: ["1980", "1981", "1986", "1987", "1992", "1993", "1994", "1996", "1997"],
    biography:
      "Equipe criada por Frank Williams que se tornou a maior escuderia independente da história da Fórmula 1.",
  },
  astonmartin: {
    foundation: "2021",
    country: "Reino Unido",
    base: "Silverstone, Inglaterra",
    constructorsTitles: 0,
    driversTitles: 0,
    wins: 0,
    poles: 0,
    podiums: 9,
    biography:
      "Retornou à Fórmula 1 em 2021 após a transformação da Racing Point. Seus melhores resultados vieram com Fernando Alonso.",
    legacy: "Construtores: 0. Pilotos: 0. Vitórias históricas: 0.",
  },
  alpine: {
    foundation: "2021",
    country: "França",
    base: "Enstone, Inglaterra",
    constructorsTitles: 0,
    driversTitles: 0,
    wins: 1,
    poles: 0,
    podiums: 6,
    biography:
      "Marca esportiva da Renault que substituiu a identidade Renault F1 Team em 2021. Sua única vitória ocorreu com Esteban Ocon no GP da Hungria de 2021.",
    legacy: "Legado da Estrutura: 5 títulos de construtores, 4 de pilotos e 50 vitórias.",
  },
  haas: {
    foundation: "2016",
    country: "Estados Unidos",
    base: "Kannapolis (EUA) / Banbury (Reino Unido)",
    constructorsTitles: 0,
    driversTitles: 0,
    wins: 0,
    poles: 1,
    podiums: 0,
    biography:
      "Primeira equipe americana da era moderna da Fórmula 1. Sua maior façanha foi a pole position de Kevin Magnussen em Interlagos 2022.",
  },
  rb: {
    foundation: "2024",
    country: "Itália",
    base: "Faenza, Itália",
    constructorsTitles: 0,
    driversTitles: 0,
    wins: 0,
    poles: 0,
    podiums: 1,
    biography:
      "Equipe satélite da Red Bull e sucessora direta da AlphaTauri.",
    legacy: "Legado da estrutura: 2 vitórias, 1 pole e 7 pódios.",
  },
  audi: {
    foundation: "2026",
    country: "Alemanha",
    base: "Hinwil, Suíça",
    constructorsTitles: 0,
    driversTitles: 0,
    wins: 0,
    poles: 0,
    podiums: 0,
    biography:
      "A Audi estreia oficialmente em 2026 utilizando a estrutura histórica da Sauber.",
    legacy: "Legado da estrutura (Sauber/BMW/Alfa Romeo): 1 vitória, 1 pole e 27 pódios.",
  },
  cadillac: {
    foundation: "2026",
    country: "Estados Unidos",
    base: "Fishers, Indiana (EUA)",
    constructorsTitles: 0,
    driversTitles: 0,
    wins: 0,
    poles: 0,
    podiums: 0,
    biography:
      "Nova equipe da General Motors que entrou na Fórmula 1 em 2026, tornando-se a 11ª escuderia do grid.",
  },
};

export function getTeamHistory(teamId: Team["id"]) {
  return teamHistory[teamId];
}
