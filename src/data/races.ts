import type { Race } from "../types/Race";
const BASE_URL = "https://pub-8f904e7001844d918dca3a6d9b676eb7.r2.dev";

export const races: Race[] = [
  { id: "r1", round: 1, name: "GP da Austrália", circuit: "Albert Park", country: "Austrália", date: "2026-03-08", circuitImage: `${BASE_URL}/circuits/r1.png`, flag: `${BASE_URL}/flags/australia.png`, inauguration: "1996", firstGP: "1996", mostWins: "Michael Schumacher (4)", totalGPs: 28, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-03-05", time: "22:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-03-06", time: "02:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-03-06", time: "22:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-03-07", time: "02:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-03-08", time: "01:00", completed: false, results: [] }
  ]},
  { id: "r2", round: 2, name: "GP da China", circuit: "Shanghai", country: "China", date: "2026-03-15", circuitImage: `${BASE_URL}/circuits/r2.png`, flag: `${BASE_URL}/flags/china.png`, inauguration: "2004", firstGP: "2004", mostWins: "Lewis Hamilton (6)", totalGPs: 18, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-03-13", time: "00:30", completed: false, results: [] },
    { type: "quali_sprint", label: "Quali Sprint", date: "2026-03-13", time: "04:30", completed: false, results: [] },
    { type: "sprint", label: "Sprint", date: "2026-03-14", time: "00:00", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-03-14", time: "04:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-03-15", time: "04:00", completed: false, results: [] }
  ]},
  { id: "r3", round: 3, name: "GP do Japão", circuit: "Suzuka", country: "Japão", date: "2026-03-29", circuitImage: `${BASE_URL}/circuits/r3.png`, flag: `${BASE_URL}/flags/japao.png`, inauguration: "1962", firstGP: "1987", mostWins: "Michael Schumacher (6)", totalGPs: 35, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-03-26", time: "23:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-03-27", time: "03:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-03-27", time: "23:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-03-28", time: "03:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-03-29", time: "02:00", completed: false, results: [] }
  ]},
  { id: "r4", round: 4, name: "GP do Bahrein", circuit: "Sakhir", country: "Bahrein", date: "2026-04-12", circuitImage: `${BASE_URL}/circuits/bahrein-x.png`, flag: `${BASE_URL}/flags/bahrein.png`, inauguration: "2004", firstGP: "2004", mostWins: "Lewis Hamilton (5)", totalGPs: 21, cancelled: true, sessions: [] },
  { id: "r5", round: 5, name: "GP da Arábia Saudita", circuit: "Jeddah", country: "Arábia Saudita", date: "2026-04-19", circuitImage: `${BASE_URL}/circuits/jeddah.png`, flag: `${BASE_URL}/flags/arabiasaudita.png`, inauguration: "2021", firstGP: "2021", mostWins: "Max Verstappen (2)", totalGPs: 5, cancelled: true, sessions: [] },
  { id: "r6", round: 6, name: "GP de Miami", circuit: "Miami", country: "Estados Unidos", date: "2026-05-03", circuitImage: `${BASE_URL}/circuits/r4.png`, flag: `${BASE_URL}/flags/eua.png`, inauguration: "2022", firstGP: "2022", mostWins: "Max Verstappen (3)", totalGPs: 4, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-05-01", time: "13:00", completed: false, results: [] },
    { type: "quali_sprint", label: "Quali Sprint", date: "2026-05-01", time: "17:30", completed: false, results: [] },
    { type: "sprint", label: "Sprint", date: "2026-05-02", time: "13:00", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-05-02", time: "17:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-05-03", time: "17:00", completed: false, results: [] }
  ]},
  { id: "r7", round: 7, name: "GP do Canadá", circuit: "Montreal", country: "Canadá", date: "2026-05-24", circuitImage: `${BASE_URL}/circuits/r5.png`, flag: `${BASE_URL}/flags/canada.png`, inauguration: "1978", firstGP: "1978", mostWins: "Schumacher & Hamilton (7)", totalGPs: 50, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-05-22", time: "13:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-05-22", time: "17:30", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-05-23", time: "13:00", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-05-23", time: "17:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-05-24", time: "17:00", completed: false, results: [] }
  ]},
  { id: "r8", round: 8, name: "GP de Mônaco", circuit: "Monte Carlo", country: "Mônaco", date: "2026-06-07", circuitImage: `${BASE_URL}/circuits/r6.png`, flag: `${BASE_URL}/flags/monaco.png`, inauguration: "1929", firstGP: "1950", mostWins: "Ayrton Senna (6)", totalGPs: 70, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-06-05", time: "08:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-06-05", time: "12:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-06-06", time: "07:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-06-06", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-06-07", time: "10:00", completed: false, results: [] }
  ]},
  { id: "r9", round: 9, name: "GP da Espanha", circuit: "Barcelona", country: "Espanha", date: "2026-06-14", circuitImage: `${BASE_URL}/circuits/r7.png`, flag: `${BASE_URL}/flags/espanha.png`, inauguration: "1991", firstGP: "1991", mostWins: "Michael Schumacher (6)", totalGPs: 35, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-06-12", time: "08:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-06-12", time: "12:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-06-13", time: "07:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-06-13", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-06-14", time: "10:00", completed: false, results: [] }
  ]},
  { id: "r10", round: 10, name: "GP da Áustria", circuit: "Red Bull Ring", country: "Áustria", date: "2026-06-28", circuitImage: `${BASE_URL}/circuits/r8.png`, flag: `${BASE_URL}/flags/austria.png`, inauguration: "1969", firstGP: "1970", mostWins: "Max Verstappen (5)", totalGPs: 37, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-06-26", time: "08:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-06-26", time: "12:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-06-27", time: "07:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-06-27", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-06-28", time: "10:00", completed: false, results: [] }
  ]},
  { id: "r11", round: 11, name: "GP da Grã-Bretanha", circuit: "Silverstone", country: "Reino Unido", date: "2026-07-05", circuitImage: `${BASE_URL}/circuits/r9.png`, flag: `${BASE_URL}/flags/uk.png`, inauguration: "1942", firstGP: "1950", mostWins: "Lewis Hamilton (9)", totalGPs: 75, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-07-03", time: "08:30", completed: false, results: [] },
    { type: "quali_sprint", label: "Quali Sprint", date: "2026-07-03", time: "12:30", completed: false, results: [] },
    { type: "sprint", label: "Sprint", date: "2026-07-04", time: "08:00", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-07-04", time: "12:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-07-05", time: "11:00", completed: false, results: [] }
  ]},
  { id: "r12", round: 12, name: "GP da Bélgica", circuit: "Spa", country: "Bélgica", date: "2026-07-19", circuitImage: `${BASE_URL}/circuits/r10.png`, flag: `${BASE_URL}/flags/belgica.png`, inauguration: "1921", firstGP: "1950", mostWins: "Michael Schumacher (6)", totalGPs: 56, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-07-17", time: "08:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-07-17", time: "12:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-07-18", time: "07:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-07-18", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-07-19", time: "10:00", completed: false, results: [] }
  ]},
  { id: "r13", round: 13, name: "GP da Hungria", circuit: "Hungaroring", country: "Hungria", date: "2026-07-26", circuitImage: `${BASE_URL}/circuits/r11.png`, flag: `${BASE_URL}/flags/hungria.png`, inauguration: "1985", firstGP: "1986", mostWins: "Lewis Hamilton (8)", totalGPs: 40, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-07-24", time: "08:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-07-24", time: "12:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-07-25", time: "07:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-07-25", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-07-26", time: "10:00", completed: false, results: [] }
  ]},
  { id: "r14", round: 14, name: "GP dos Países Baixos", circuit: "Zandvoort", country: "Países Baixos", date: "2026-08-23", circuitImage: `${BASE_URL}/circuits/r12.png`, flag: `${BASE_URL}/flags/holanda.png`, inauguration: "1948", firstGP: "1952", mostWins: "Jim Clark (4)", totalGPs: 35, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-08-21", time: "07:30", completed: false, results: [] },
    { type: "quali_sprint", label: "Quali Sprint", date: "2026-08-21", time: "11:30", completed: false, results: [] },
    { type: "sprint", label: "Sprint", date: "2026-08-22", time: "07:00", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-08-22", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-08-23", time: "10:00", completed: false, results: [] }
  ]},
  { id: "r15", round: 15, name: "GP da Itália", circuit: "Monza", country: "Itália", date: "2026-09-06", circuitImage: `${BASE_URL}/circuits/r13.png`, flag: `${BASE_URL}/flags/italia.png`, inauguration: "1922", firstGP: "1950", mostWins: "Michael Schumacher (5)", totalGPs: 75, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-09-04", time: "07:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-09-04", time: "11:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-09-05", time: "07:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-09-05", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-09-06", time: "10:00", completed: false, results: [] }
  ]},
  { id: "r16", round: 16, name: "GP da Espanha", circuit: "Barcelona", country: "Espanha", date: "2026-09-13", circuitImage: `${BASE_URL}/circuits/r14.png`, flag: `${BASE_URL}/flags/espanha2.png`, inauguration: "1991", firstGP: "1991", mostWins: "Michael Schumacher (6)", totalGPs: 35, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-09-11", time: "08:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-09-11", time: "12:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-09-12", time: "07:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-09-12", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-09-13", time: "10:00", completed: false, results: [] }
  ]},
  { id: "r17", round: 17, name: "GP do Azerbaijão", circuit: "Baku", country: "Azerbaijão", date: "2026-09-20", circuitImage: `${BASE_URL}/circuits/r15.png`, flag: `${BASE_URL}/flags/azerbaijao.png`, inauguration: "2016", firstGP: "2016", mostWins: "Sergio Pérez (2)", totalGPs: 10, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-09-24", time: "05:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-09-24", time: "09:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-09-25", time: "05:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-09-25", time: "09:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-09-26", time: "08:00", completed: false, results: [] }
  ]},
  { id: "r18", round: 18, name: "GP de Singapura", circuit: "Marina Bay", country: "Singapura", date: "2026-10-11", circuitImage: `${BASE_URL}/circuits/r16.png`, flag: `${BASE_URL}/flags/singapura.png`, inauguration: "2008", firstGP: "2008", mostWins: "Sebastian Vettel (5)", totalGPs: 15, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-10-09", time: "06:30", completed: false, results: [] },
    { type: "quali_sprint", label: "Quali Sprint", date: "2026-10-09", time: "09:30", completed: false, results: [] },
    { type: "sprint", label: "Sprint", date: "2026-10-10", time: "06:00", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-10-10", time: "10:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-10-11", time: "09:00", completed: false, results: [] }
  ]},
  { id: "r19", round: 19, name: "GP dos EUA", circuit: "Austin", country: "Estados Unidos - Austin", date: "2026-10-25", circuitImage: `${BASE_URL}/circuits/r17.png`, flag: `${BASE_URL}/flags/eua3.png`, inauguration: "2012", firstGP: "2012", mostWins: "Lewis Hamilton (5)", totalGPs: 12, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-10-23", time: "14:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-10-23", time: "18:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-10-24", time: "14:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-10-24", time: "18:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-10-25", time: "17:00", completed: false, results: [] }
  ]},
  { id: "r20", round: 20, name: "GP da Cidade do México", circuit: "Mexico City", country: "México", date: "2026-11-01", circuitImage: `${BASE_URL}/circuits/r18.png`, flag: `${BASE_URL}/flags/mexico.png`, inauguration: "1959", firstGP: "1962", mostWins: "Max Verstappen (5)", totalGPs: 24, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-10-30", time: "15:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-10-30", time: "19:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-10-31", time: "14:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-10-31", time: "18:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-11-01", time: "17:00", completed: false, results: [] }
  ]},
  { id: "r21", round: 21, name: "GP do Brasil", circuit: "Interlagos", country: "Brasil", date: "2026-11-08", circuitImage: `${BASE_URL}/circuits/r19.png`, flag: `${BASE_URL}/flags/brasil.png`, inauguration: "1940", firstGP: "1973", mostWins: "Lewis Hamilton (3)", totalGPs: 41, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-11-06", time: "11:30", completed: false, results: [] },
    { type: "quali_sprint", label: "Quali Sprint", date: "2026-11-06", time: "15:30", completed: false, results: [] },
    { type: "sprint", label: "Sprint", date: "2026-11-07", time: "11:00", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-11-07", time: "15:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-11-08", time: "14:00", completed: false, results: [] }
  ]},
  { id: "r22", round: 22, name: "GP de Las Vegas", circuit: "Las Vegas", country: "Estados Unidos - Las Vegas", date: "2026-11-22", circuitImage: `${BASE_URL}/circuits/r20.png`, flag: `${BASE_URL}/flags/eua2.png`, inauguration: "2023", firstGP: "2023", mostWins: "Max Verstappen (2)", totalGPs: 3, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-11-19", time: "21:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-11-20", time: "01:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-11-20", time: "21:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-11-21", time: "01:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-11-22", time: "01:00", completed: false, results: [] }
  ]},
  { id: "r23", round: 23, name: "GP do Catar", circuit: "Lusail", country: "Catar", date: "2026-11-29", circuitImage: `${BASE_URL}/circuits/r21.png`, flag: `${BASE_URL}/flags/catar.png`, inauguration: "2004", firstGP: "2021", mostWins: "Max Verstappen (2)", totalGPs: 4, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-11-27", time: "10:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-11-27", time: "14:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-11-28", time: "11:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-11-28", time: "15:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-11-29", time: "13:00", completed: false, results: [] }
  ]},
  { id: "r24", round: 24, name: "GP de Abu Dhabi", circuit: "Yas Marina", country: "Emirados Árabes Unidos", date: "2026-12-06", circuitImage: `${BASE_URL}/circuits/r22.png`, flag: `${BASE_URL}/flags/abudhabi.png`, inauguration: "2009", firstGP: "2009", mostWins: "Lewis Hamilton (5)", totalGPs: 17, sessions: [
    { type: "treino1", label: "Treino Livre 1", date: "2026-12-04", time: "06:30", completed: false, results: [] },
    { type: "treino2", label: "Treino Livre 2", date: "2026-12-04", time: "10:00", completed: false, results: [] },
    { type: "treino3", label: "Treino Livre 3", date: "2026-12-05", time: "07:30", completed: false, results: [] },
    { type: "quali", label: "Qualificação", date: "2026-12-05", time: "11:00", completed: false, results: [] },
    { type: "corrida", label: "Corrida", date: "2026-12-06", time: "10:00", completed: false, results: [] }
  ]}
];