const BASE_URL = "https://pub-8f904e7001844d918dca3a6d9b676eb7.r2.dev/principals";

export type PrincipalStats = {
  teamId: string;
  team: string;
  name: string;
  nationality: string;
  birth: string;
  age: string;
  titles: string[];
  history: string[];
  image: string;
};

export const principals: PrincipalStats[] = [
  {
    teamId: "mclaren",
    team: "McLaren",
    name: "Andrea Stella",
    nationality: "Itália",
    birth: "22 de fevereiro de 1971",
    age: "55 anos",
    titles: ["2× Campeão Mundial de Construtores (McLaren — 2024, 2025)", "1× Campeão Mundial de Pilotos (Lando Norris — 2025)"],
    history: ["Ferrari (2000–2014)", "McLaren (2015–presente)"],
    image: `${BASE_URL}/stella.png`,
  },
  {
    teamId: "ferrari",
    team: "Ferrari",
    name: "Frédéric Vasseur",
    nationality: "França",
    birth: "28 de maio de 1968",
    age: "58 anos",
    titles: ["Diversos títulos nas categorias de base (ART Grand Prix)", "Nenhum título de F1 como Team Principal até 2026"],
    history: ["ASM Formula 3 (1996–2004)", "ART Grand Prix (2005–presente)", "Ferrari (2023–presente)"],
    image: `${BASE_URL}/vasseur.png`,
  },
  {
    teamId: "redbull",
    team: "Red Bull Racing",
    name: "Laurent Mekies",
    nationality: "França",
    birth: "28 de abril de 1977",
    age: "49 anos",
    titles: ["Participou de campanhas campeãs na Ferrari e Red Bull em cargos técnicos", "Nenhum título como Team Principal"],
    history: ["Ferrari (2018–2023)", "RB / Racing Bulls (2024–2025)", "Red Bull Racing (2025–presente)"],
    image: `${BASE_URL}/mekies.png`,
  },
  {
    teamId: "mercedes",
    team: "Mercedes",
    name: "Toto Wolff",
    nationality: "Áustria",
    birth: "12 de janeiro de 1972",
    age: "54 anos",
    titles: ["8× Campeão Mundial de Construtores (Mercedes)", "7× Campeão Mundial de Pilotos"],
    history: ["Williams (investidor e diretor, 2009–2013)", "Mercedes (2013–presente)"],
    image: `${BASE_URL}/wolff.png`,
  },
  {
    teamId: "astonmartin",
    team: "Aston Martin",
    name: "Adrian Newey",
    nationality: "Grã-Bretanha",
    birth: "26 de dezembro de 1958",
    age: "67 anos",
    titles: ["14× Campeão Mundial de Pilotos (carros projetados por ele)", "12× Campeão Mundial de Construtores"],
    history: ["Williams (1991–1996)", "McLaren (1997–2005)", "Red Bull Racing (2006–2024)", "Aston Martin (2025–presente)"],
    image: `${BASE_URL}/newey.png`,
  },
  {
    teamId: "alpine",
    team: "Alpine",
    name: "Flavio Briatore",
    nationality: "Itália",
    birth: "12 de abril de 1950",
    age: "76 anos",
    titles: ["4× Campeão Mundial de Pilotos", "4× Campeão Mundial de Construtores"],
    history: ["Benetton Formula (1988–1997)", "Renault F1 (2000–2009)", "Alpine (2024–presente)"],
    image: `${BASE_URL}/briatore.png`,
  },
  {
    teamId: "williams",
    team: "Williams",
    name: "James Vowles",
    nationality: "Grã-Bretanha",
    birth: "20 de junho de 1979",
    age: "46 anos",
    titles: ["8× Campeão Mundial de Construtores", "7× Campeão Mundial de Pilotos"],
    history: ["Brawn GP (2009)", "Mercedes (2010–2022)", "Williams (2023–presente)"],
    image: `${BASE_URL}/vowles.png`,
  },
  {
    teamId: "haas",
    team: "Haas",
    name: "Ayao Komatsu",
    nationality: "Japão",
    birth: "28 de maio de 1976",
    age: "50 anos",
    titles: ["Nenhum título mundial de F1"],
    history: ["British American Racing (2003–2005)", "Renault (2006–2014)", "Lotus (2012–2015)", "Haas (2016–presente)"],
    image: `${BASE_URL}/komatsu.png`,
  },
  {
    teamId: "rb",
    team: "Racing Bulls",
    name: "Alan Permane",
    nationality: "Grã-Bretanha",
    birth: "1967",
    age: "59 anos",
    titles: ["2× Campeão Mundial de Pilotos", "2× Campeão Mundial de Construtores"],
    history: ["Benetton (1989–2001)", "Renault (2002–2011)", "Lotus (2012–2015)", "Racing Bulls (2024–presente)"],
    image: `${BASE_URL}/permane.png`,
  },
  {
    teamId: "audi",
    team: "Audi",
    name: "Mattia Binotto",
    nationality: "Itália (nascido na Suíça)",
    birth: "3 de novembro de 1969",
    age: "56 anos",
    titles: ["6× Campeão Mundial de Construtores", "5× Campeão Mundial de Pilotos"],
    history: ["Ferrari (1995–2024)", "Audi F1 Project / Sauber (2024–presente)"],
    image: `${BASE_URL}/binoto.png`,
  },
  {
    teamId: "cadillac",
    team: "Cadillac",
    name: "Graeme Lowdon",
    nationality: "Reino Unido",
    birth: "23 de abril de 1965",
    age: "61 anos",
    titles: ["Nova liderança da Cadillac F1"],
    history: ["Cadillac F1 Project (2026–presente)"],
    image: `${BASE_URL}/lowdon.png`,
  },
];

export function getPrincipalByTeamId(teamId: string) {
  return principals.find((principal) => principal.teamId === teamId);
}
