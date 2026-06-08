import { drivers } from "../data/drivers";

export type ImportedRaceRow = {
  id: string;
  rawLine: string;
  positionText: string;
  driverId: string;
  driverName: string;
  teamName: string;
  status: "FINISHED" | "DNF";
  pointsText: string;
  extraText: string;
};

type DriverIndexItem = {
  driver: (typeof drivers)[number];
  aliases: string[];
};

const driverIndex: DriverIndexItem[] = drivers.map((driver) => {
  const fullName = `${driver.firstName} ${driver.lastName}`;
  const initialName = `${driver.firstName[0]}. ${driver.lastName}`;

  return {
    driver,
    aliases: [driver.code, driver.firstName, driver.lastName, fullName, initialName, `${driver.firstName[0]} ${driver.lastName}`]
      .map(normalizeText)
      .filter(Boolean),
  };
});

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(value: string) {
  return value
    .replace(/[|]/g, " ")
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\r/g, "")
    .trim();
}

function splitLines(rawText: string) {
  return cleanText(rawText)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function findDriver(line: string) {
  const normalizedLine = normalizeText(line);
  let bestAlias = "";
  let bestDriver: (typeof drivers)[number] | undefined;

  for (const item of driverIndex) {
    for (const alias of item.aliases) {
      if (!alias) continue;
      if (normalizedLine.includes(alias) && alias.length > bestAlias.length) {
        bestAlias = alias;
        bestDriver = item.driver;
      }
    }
  }

  return bestDriver;
}

function extractPoints(block: string) {
  const matches = [...block.matchAll(/\b\d+\b/g)].map((entry) => entry[0]);
  return matches.length ? matches[matches.length - 1] : "";
}

function buildRow(positionText: string, driverLine: string, block: string, index: number): ImportedRaceRow | null {
  const driver = findDriver(driverLine);
  if (!driver) return null;

  const isDnf = positionText.toUpperCase() === "DNF";

  return {
    id: `${Date.now()}-${index}`,
    rawLine: `${positionText} ${driverLine}`.trim(),
    positionText: isDnf ? "" : positionText,
    driverId: driver.id,
    driverName: `${driver.firstName} ${driver.lastName}`,
    teamName: driver.teamId,
    status: isDnf ? "DNF" : "FINISHED",
    pointsText: extractPoints(block),
    extraText: block.replace(/\s+/g, " ").trim(),
  };
}

function parseSequential(rawText: string) {
  const lines = splitLines(rawText);
  const rows: ImportedRaceRow[] = [];

  let currentPosition = "";
  let currentBlock: string[] = [];
  let currentDriverLine = "";

  const pushCurrent = () => {
    if (!currentPosition || !currentDriverLine) return;
    const block = currentBlock.join("\n");
    const row = buildRow(currentPosition, currentDriverLine, block, rows.length);
    if (row) rows.push(row);
  };

  for (const line of lines) {
    const normalized = normalizeText(line);

    if (/^(CLA|PILOTO|VOLTAS|TEMPO|INTERVALO|KMH|PITS|PONTOS|RESULTADOS?|POSICAO|POSIÇÃO)$/.test(normalized)) {
      continue;
    }

    const positionMatch = line.match(/^(DNF|\d{1,2})\b/i);
    if (positionMatch && (!currentPosition || currentDriverLine)) {
      if (currentPosition && currentDriverLine) {
        pushCurrent();
      }

      currentPosition = positionMatch[1].toUpperCase();
      currentBlock = [line];
      currentDriverLine = "";
      continue;
    }

    if (currentPosition) {
      currentBlock.push(line);
      if (!currentDriverLine) {
        currentDriverLine = line;
      }
    }
  }

  pushCurrent();

  return rows;
}

function parseFallback(rawText: string) {
  const normalizedRaw = normalizeText(rawText);
  const rows: ImportedRaceRow[] = [];

  for (const item of driverIndex) {
    const alias = item.aliases.find((candidate) => candidate && normalizedRaw.includes(candidate));
    if (!alias) continue;

    rows.push({
      id: `${Date.now()}-${item.driver.id}`,
      rawLine: item.driver.lastName,
      positionText: "",
      driverId: item.driver.id,
      driverName: `${item.driver.firstName} ${item.driver.lastName}`,
      teamName: item.driver.teamId,
      status: "FINISHED",
      pointsText: "",
      extraText: rawText.replace(/\s+/g, " ").trim(),
    });
  }

  return rows;
}

export function parseRaceImportText(rawText: string) {
  const rows = parseSequential(rawText);
  if (rows.length) return rows;
  return parseFallback(rawText);
}
