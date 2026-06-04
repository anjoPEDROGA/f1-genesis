const BASE_URL = "https://pub-8f904e7001844d918dca3a6d9b676eb7.r2.dev/flags";

const COUNTRY_TO_FLAG_URL: Record<string, string> = {
  "Reino Unido": `${BASE_URL}/uk.png`,
  "Estados Unidos": `${BASE_URL}/eua.png`,
  "Estados Unidos - Austin": `${BASE_URL}/eua3.png`,
  "Estados Unidos - Las Vegas": `${BASE_URL}/eua2.png`,
  "Brasil": `${BASE_URL}/brasil.png`,
  "Mônaco": `${BASE_URL}/monaco.png`,
  "MÃ´naco": `${BASE_URL}/monaco.png`,
  "França": `${BASE_URL}/frança.png`,
  "FranÃ§a": `${BASE_URL}/frança.png`,
  "Alemanha": `${BASE_URL}/alemanha.png`,
  "Itália": `${BASE_URL}/italia.png`,
  "ItÃ¡lia": `${BASE_URL}/italia.png`,
  "Austrália": `${BASE_URL}/australia.png`,
  "AustrÃ¡lia": `${BASE_URL}/australia.png`,
  "Canadá": `${BASE_URL}/canada.png`,
  "CanadÃ¡": `${BASE_URL}/canada.png`,
  "Espanha": `${BASE_URL}/espanha.png`,
  "Áustria": `${BASE_URL}/austria.png`,
  "Ãustria": `${BASE_URL}/austria.png`,
  "Países Baixos": `${BASE_URL}/holanda.png`,
  "PaÃ­ses Baixos": `${BASE_URL}/holanda.png`,
  "México": `${BASE_URL}/mexico.png`,
  "MÃ©xico": `${BASE_URL}/mexico.png`,
  "Finlândia": `${BASE_URL}/finlandia.png`,
  "FinlÃ¢ndia": `${BASE_URL}/finlandia.png`,
  "Nova Zelândia": `${BASE_URL}/novazelandia.png`,
  "Nova ZelÃ¢ndia": `${BASE_URL}/novazelandia.png`,
  "Tailândia": `${BASE_URL}/tailandia.png`,
  "TailÃ¢ndia": `${BASE_URL}/tailandia.png`,
  "Argentina": `${BASE_URL}/argentina.png`,
  "Arábia Saudita": `${BASE_URL}/arabiasaudita.png`,
  "ArÃ¡bia Saudita": `${BASE_URL}/arabiasaudita.png`,
  "China": `${BASE_URL}/china.png`,
  "Japão": `${BASE_URL}/japao.png`,
  "JapÃ£o": `${BASE_URL}/japao.png`,
  "Hungria": `${BASE_URL}/hungria.png`,
  "Bélgica": `${BASE_URL}/belgica.png`,
  "BÃ©lgica": `${BASE_URL}/belgica.png`,
  "Catar": `${BASE_URL}/catar.png`,
  "Emirados Árabes Unidos": `${BASE_URL}/abudhabi.png`,
  "Emirados Ãrabes Unidos": `${BASE_URL}/abudhabi.png`,
  "Azerbaijão": `${BASE_URL}/azerbaijao.png`,
  "AzerbaijÃ£o": `${BASE_URL}/azerbaijao.png`,
  "Singapura": `${BASE_URL}/singapura.png`,
  "Bahrein": `${BASE_URL}/bahrein.png`,
};

function normalizeCountry(country: string) {
  return country
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function getCountryFlagUrl(country: string) {
  const direct = COUNTRY_TO_FLAG_URL[country];
  if (direct) return direct;

  const normalized = normalizeCountry(country);
  const match = Object.entries(COUNTRY_TO_FLAG_URL).find(
    ([key]) => normalizeCountry(key) === normalized
  );

  return match?.[1] ?? "";
}
