import type { Team } from "../types/Team";

const BASE_URL = "https://pub-8f904e7001844d918dca3a6d9b676eb7.r2.dev";
const PRINCIPALS_URL = `${BASE_URL}/principals`;
const CARS_URL = `${BASE_URL}/cars`;

export const teams: Team[] = [
  { id: "mclaren", name: "McLaren", color: "#FF8000", logo: `${BASE_URL}/teams/mclaren.png`, principalName: "Andrea Stella", principalImage: `${PRINCIPALS_URL}/stella.png`, carImage: `${CARS_URL}/carro-mclaren.png` },
  { id: "ferrari", name: "Ferrari", color: "#E10600", logo: `${BASE_URL}/teams/ferrari.png`, principalName: "Frédéric Vasseur", principalImage: `${PRINCIPALS_URL}/vasseur.png`, carImage: `${CARS_URL}/carro-ferrari.png` },
  { id: "redbull", name: "Red Bull Racing", color: "#3671C6", logo: `${BASE_URL}/teams/redbull.png`, principalName: "Laurent Mekies", principalImage: `${PRINCIPALS_URL}/mekies.png`, carImage: `${CARS_URL}/carro-redbull.png` },
  { id: "mercedes", name: "Mercedes", color: "#27F4D2", logo: `${BASE_URL}/teams/mercedes.png`, principalName: "Toto Wolff", principalImage: `${PRINCIPALS_URL}/wolff.png`, carImage: `${CARS_URL}/carro-mercedes.png` },
  { id: "astonmartin", name: "Aston Martin", color: "#229971", logo: `${BASE_URL}/teams/aston-martin.png`, principalName: "Adrian Newey", principalImage: `${PRINCIPALS_URL}/newey.png`, carImage: `${CARS_URL}/carro-aston-martin.png` },
  { id: "alpine", name: "Alpine", color: "#FF87BC", logo: `${BASE_URL}/teams/alpine.png`, principalName: "Flavio Briatore", principalImage: `${PRINCIPALS_URL}/briatore.png`, carImage: `${CARS_URL}/carro-alpine.png` },
  { id: "williams", name: "Williams", color: "#64C4FF", logo: `${BASE_URL}/teams/williams.png`, principalName: "James Vowles", principalImage: `${PRINCIPALS_URL}/vowles.png`, carImage: `${CARS_URL}/carro-williams.png` },
  { id: "rb", name: "Racing Bulls", color: "#6692FF", logo: `${BASE_URL}/teams/racing-bulls.png`, principalName: "Alan Permane", principalImage: `${PRINCIPALS_URL}/permane.png`, carImage: `${CARS_URL}/carro-racingbulls.png` },
  { id: "haas", name: "Haas", color: "#8E939A", logo: `${BASE_URL}/teams/haas.png`, principalName: "Ayao Komatsu", principalImage: `${PRINCIPALS_URL}/komatsu.png`, carImage: `${CARS_URL}/carro-haas.png` },
  { id: "audi", name: "Audi", color: "#E84B2C", logo: `${BASE_URL}/teams/audi.png`, principalName: "Mattia Binotto", principalImage: `${PRINCIPALS_URL}/binoto.png`, carImage: `${CARS_URL}/carro-audi.png` },
  { id: "cadillac", name: "Cadillac", color: "#8C96A8", logo: `${BASE_URL}/teams/cadillac.png`, principalName: "Graeme Lowdon", principalImage: `${PRINCIPALS_URL}/lowdon.png`, carImage: `${CARS_URL}/carro-cadillac.png` },
];
