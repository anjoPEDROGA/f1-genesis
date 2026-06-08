import { useEffect, useState } from "react";
import { useDriverStore } from "../../store/useDriverStore";
import { teams } from "../../data/teams";
import type { Driver } from "../../types/Driver";
import type { SessionResult } from "../../types/Race";
import type { ImportedRaceRow } from "../../utils/raceImport";
import { parseRaceImportText } from "../../utils/raceImport";

type SessionEditorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (results: SessionResult[]) => void;
  sessionData: { label?: string; results?: SessionResult[] } | null;
};

type PreviewRow = ImportedRaceRow & {
  positionInput: string;
  driverIdInput: string;
  statusInput: "FINISHED" | "DNF";
  pointsInput: string;
};

function buildPreviewRows(rows: ImportedRaceRow[]): PreviewRow[] {
  return rows.map((row) => ({
    ...row,
    positionInput: row.positionText,
    driverIdInput: row.driverId,
    statusInput: row.status,
    pointsInput: row.pointsText,
  }));
}

function normalizePosition(value: string) {
  const cleaned = value.trim().toUpperCase();
  if (cleaned === "DNF") return "DNF" as const;
  const numeric = Number.parseInt(cleaned, 10);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function sortPreviewRows(rows: PreviewRow[]) {
  return [...rows].sort((a, b) => {
    if (a.statusInput === "DNF" && b.statusInput !== "DNF") return 1;
    if (a.statusInput !== "DNF" && b.statusInput === "DNF") return -1;

    const aPos = normalizePosition(a.positionInput);
    const bPos = normalizePosition(b.positionInput);
    const aValue = typeof aPos === "number" ? aPos : 999;
    const bValue = typeof bPos === "number" ? bPos : 999;
    return aValue - bValue;
  });
}

function toSessionResults(rows: PreviewRow[]): SessionResult[] {
  const ordered = sortPreviewRows(rows).filter((row) => row.driverIdInput.trim());
  return ordered.map((row, index) => {
    if (row.statusInput === "DNF" || normalizePosition(row.positionInput) === "DNF") {
      return { driverId: row.driverIdInput, position: "DNF" as const };
    }

    const position = normalizePosition(row.positionInput) ?? index + 1;
    return { driverId: row.driverIdInput, position };
  });
}

function getTeamName(teamId: string) {
  return teams.find((team) => team.id === teamId)?.name ?? teamId;
}

function getThumbImage(image: string) {
  return image.includes("/drivers/thumbs/") ? image : image.replace("/drivers/", "/drivers/thumbs/");
}

export default function SessionEditor({ isOpen, onClose, onSave, sessionData }: SessionEditorProps) {
  const drivers: Driver[] = useDriverStore((s) => s.drivers);
  const [activeTab, setActiveTab] = useState<"manual" | "import">("manual");
  const [positions, setPositions] = useState<(string | null)[]>(Array(22).fill(null));
  const [dnf, setDnf] = useState<string[]>([]);
  const [rawText, setRawText] = useState("");
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const saved = sessionData?.results || [];
    const pos = Array(22).fill(null);
    const dnfList: string[] = [];

    saved.forEach((res) => {
      if (res.position === "DNF") {
        dnfList.push(res.driverId);
        return;
      }

      if (typeof res.position === "number" && res.position > 0 && res.position <= pos.length) {
        pos[res.position - 1] = res.driverId;
      }
    });

    setPositions(pos);
    setDnf(dnfList);
    setRawText("");
    setPreviewRows([]);
    setIsProcessing(false);
    setError(null);
    setActiveTab("manual");
  }, [isOpen, sessionData]);

  if (!isOpen) return null;

  const pool = drivers.filter((driver) => !positions.includes(driver.id) && !dnf.includes(driver.id));
  const previewOrdered = sortPreviewRows(previewRows);

  const handleManualSave = () => {
    const formattedPositions = positions
      .map((driverId, index) => (driverId ? { driverId, position: index + 1 } : null))
      .filter((value): value is { driverId: string; position: number } => value !== null);

    const formattedDnf = dnf.map((driverId) => ({ driverId, position: "DNF" as const }));
    onSave([...formattedPositions, ...formattedDnf]);
  };

  const handleImportSave = () => {
    onSave(toSessionResults(previewRows));
  };

  const processRawInput = (input?: string) => {
    const value = (input ?? rawText).trim();
    if (!value) {
      setError("Cole o texto do resultado antes de processar.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const parsedRows = parseRaceImportText(value);
      setPreviewRows(buildPreviewRows(parsedRows));
      if (!parsedRows.length) {
        setError("Não consegui identificar linhas válidas no texto colado.");
      }
    } catch {
      setError("Não foi possível processar o conteúdo enviado.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-[#111] border border-[#333] rounded-lg w-full max-w-7xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-[#333] bg-[#181818] flex justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-black text-red-600 uppercase">{sessionData?.label || "Editor de sessão"}</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-1">Manual ou texto colado</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-xl" type="button">
            ✕
          </button>
        </div>

        <div className="px-4 pt-4">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("manual")}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
                activeTab === "manual" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Manual
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("import")}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
                activeTab === "import" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Importar Texto
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === "manual" ? (
            <div className="h-full grid grid-cols-2 gap-0">
              <div className="overflow-y-auto p-4 border-r border-[#333]">
                <p className="text-[10px] text-gray-500 uppercase mb-2">Classificação Final</p>
                {positions.map((pId, idx) => {
                  const driver = pId ? drivers.find((dr) => dr.id === pId) : null;
                  const team = driver ? teams.find((t) => t.id === driver.teamId) : null;

                  return (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-[#1a1a1a] border border-[#222] rounded mb-1 h-14">
                      <span className="w-6 text-yellow-600 font-black text-sm">{idx + 1}</span>
                      {driver ? (
                        <>
                          <div className="relative">
                            <img src={getThumbImage(driver.image)} className="w-10 h-10 rounded-full border border-gray-700 object-cover" alt="" />
                            <span className="absolute -top-1 -right-1 bg-black text-[9px] text-white px-1 rounded-full border border-gray-500 font-bold">
                              {driver.number}
                            </span>
                          </div>

                          <div className="flex flex-col flex-1 justify-center">
                            <span className="text-sm font-bold leading-none">{driver.lastName.toUpperCase()}</span>
                            {team && (
                              <div className="flex items-center gap-1 mt-1">
                                <img src={team.logo} className="w-3 h-3 object-contain" alt="" />
                                <span className="text-[9px] text-gray-500 uppercase">{team.name}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <button
                              onClick={() => {
                                const target = idx - 1;
                                if (target < 0) return;
                                const next = [...positions];
                                [next[idx], next[target]] = [next[target], next[idx]];
                                setPositions(next);
                              }}
                              className="text-[8px] hover:text-white text-gray-500"
                              type="button"
                            >
                              ▲
                            </button>
                            <button
                              onClick={() => {
                                const target = idx + 1;
                                if (target >= positions.length) return;
                                const next = [...positions];
                                [next[idx], next[target]] = [next[target], next[idx]];
                                setPositions(next);
                              }}
                              className="text-[8px] hover:text-white text-gray-500"
                              type="button"
                            >
                              ▼
                            </button>
                          </div>
                          <button
                            onClick={() => setPositions(positions.map((p, i) => (i === idx ? null : p)))}
                            className="text-red-500 px-3 font-bold"
                            type="button"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-800 italic text-xs pl-2">—</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="overflow-y-auto p-4 flex flex-col gap-6">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase mb-2">Disponíveis</p>
                  {pool.map((driver) => {
                    const team = teams.find((t) => t.id === driver.teamId);

                    return (
                      <div key={driver.id} className="flex items-center gap-3 p-2 bg-[#1a1a1a] rounded mb-1 h-14 border border-transparent hover:border-[#333]">
                        <img src={getThumbImage(driver.image)} className="w-10 h-10 rounded-full border border-gray-700 object-cover" alt="" />

                        <div className="flex flex-col flex-1 justify-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold leading-none">{driver.lastName}</span>
                            <span className="text-[10px] text-gray-500 font-bold">#{driver.number}</span>
                          </div>
                          {team && (
                            <div className="flex items-center gap-1 mt-1">
                              <img src={team.logo} className="w-3 h-3 object-contain" alt="" />
                              <span className="text-[9px] text-gray-500 uppercase">{team.name}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const empty = positions.findIndex((p) => p === null);
                            if (empty !== -1) {
                              const next = [...positions];
                              next[empty] = driver.id;
                              setPositions(next);
                            }
                          }}
                          className="text-primary text-[10px] font-bold px-3 py-1 border border-primary/30 rounded hover:bg-primary/10 transition-colors"
                          type="button"
                        >
                          ADD
                        </button>
                        <button
                          onClick={() => setDnf([...dnf, driver.id])}
                          className="text-red-600 text-[10px] font-bold px-3 py-1 border border-red-900 rounded hover:bg-red-900/20 transition-colors"
                          type="button"
                        >
                          DNF
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <p className="text-[10px] text-red-500 uppercase mb-2">DNF / Abandonaram</p>
                  {dnf.map((driverId) => {
                    const driver = drivers.find((drv) => drv.id === driverId);
                    if (!driver) return null;
                    const team = teams.find((t) => t.id === driver.teamId);

                    return (
                      <div key={driver.id} className="flex items-center gap-3 p-2 bg-red-950/20 border border-red-900 rounded mb-1 h-14">
                        <span className="text-red-500 font-black text-xs">DNF</span>
                        <img src={getThumbImage(driver.image)} className="w-8 h-8 rounded-full object-cover" alt="" />

                        <div className="flex flex-col flex-1 justify-center opacity-70">
                          <span className="text-sm font-bold leading-none">{driver.lastName}</span>
                          {team && (
                            <div className="flex items-center gap-1 mt-1">
                              <img src={team.logo} className="w-3 h-3 object-contain" alt="" />
                              <span className="text-[9px] text-gray-400 uppercase">{team.name}</span>
                            </div>
                          )}
                        </div>

                        <button onClick={() => setDnf(dnf.filter((id) => id !== driver.id))} className="text-xs text-white hover:text-red-400" type="button">
                          Remover
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full grid grid-cols-2 gap-0">
              <div className="overflow-y-auto p-4 border-r border-[#333] flex flex-col gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Passo 1</p>
                      <h3 className="text-sm font-black uppercase">Colar texto do resultado</h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Cole o texto copiado do site no campo abaixo. O app organiza a prévia e você confirma antes de salvar.
                  </p>
                  <textarea
                    value={rawText}
                    onChange={(event) => setRawText(event.target.value)}
                    placeholder="Cole aqui o texto bruto do resultado..."
                    className="w-full h-44 rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/40"
                  />
                  <button
                    type="button"
                    onClick={() => processRawInput()}
                    className="w-full py-3 rounded-xl bg-red-600 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-red-500 transition-colors disabled:opacity-60"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processando..." : "Processar texto"}
                  </button>
                  {error && <p className="text-xs text-red-400">{error}</p>}
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Texto bruto</p>
                  <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-gray-300 max-h-72 overflow-auto">
                    {rawText || "Nenhum texto colado ainda."}
                  </pre>
                </div>
              </div>

              <div className="overflow-y-auto p-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Passo 2</p>
                    <h3 className="text-sm font-black uppercase">Prévia editável</h3>
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                    {previewRows.length} linhas
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <div className="grid grid-cols-[70px_1.5fr_1fr_110px_90px_90px] bg-white/5 text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                    <div className="p-3 border-r border-white/10">Pos</div>
                    <div className="p-3 border-r border-white/10">Piloto</div>
                    <div className="p-3 border-r border-white/10">Equipe</div>
                    <div className="p-3 border-r border-white/10">Status</div>
                    <div className="p-3 border-r border-white/10">Pts</div>
                    <div className="p-3">Raw</div>
                  </div>

                  <div className="max-h-[58vh] overflow-y-auto divide-y divide-white/5">
                    {previewOrdered.length ? (
                      previewOrdered.map((row, index) => (
                        <div key={row.id} className="grid grid-cols-[70px_1.5fr_1fr_110px_90px_90px] bg-[#101010] text-sm">
                          <div className="p-3 border-r border-white/5">
                            <input
                              value={row.positionInput}
                              onChange={(event) => {
                                const value = event.target.value;
                                setPreviewRows((current) =>
                                  current.map((currentRow) =>
                                    currentRow.id === row.id ? { ...currentRow, positionInput: value } : currentRow
                                  )
                                );
                              }}
                              className="w-full bg-transparent outline-none text-white font-bold"
                              placeholder={row.statusInput === "DNF" ? "DNF" : String(index + 1)}
                            />
                          </div>

                          <div className="p-3 border-r border-white/5">
                            <select
                              value={row.driverIdInput}
                              onChange={(event) => {
                                const value = event.target.value;
                                setPreviewRows((current) =>
                                  current.map((currentRow) =>
                                    currentRow.id === row.id ? { ...currentRow, driverIdInput: value } : currentRow
                                  )
                                );
                              }}
                              className="w-full bg-transparent text-white outline-none font-bold"
                            >
                              {drivers.map((driver) => (
                                <option key={driver.id} value={driver.id} className="bg-[#111]">
                                  {driver.lastName.toUpperCase()}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="p-3 border-r border-white/5">
                            <div className="text-[10px] uppercase tracking-widest text-gray-400">
                              {getTeamName(drivers.find((driver) => driver.id === row.driverIdInput)?.teamId ?? "")}
                            </div>
                          </div>

                          <div className="p-3 border-r border-white/5">
                            <select
                              value={row.statusInput}
                              onChange={(event) => {
                                const value = event.target.value as "FINISHED" | "DNF";
                                setPreviewRows((current) =>
                                  current.map((currentRow) =>
                                    currentRow.id === row.id
                                      ? { ...currentRow, statusInput: value, positionInput: value === "DNF" ? "" : currentRow.positionInput }
                                      : currentRow
                                  )
                                );
                              }}
                              className="w-full bg-transparent text-white outline-none text-xs font-black uppercase"
                            >
                              <option value="FINISHED" className="bg-[#111]">FINISHED</option>
                              <option value="DNF" className="bg-[#111]">DNF</option>
                            </select>
                          </div>

                          <div className="p-3 border-r border-white/5">
                            <input
                              value={row.pointsInput}
                              onChange={(event) => {
                                const value = event.target.value;
                                setPreviewRows((current) =>
                                  current.map((currentRow) =>
                                    currentRow.id === row.id ? { ...currentRow, pointsInput: value } : currentRow
                                  )
                                );
                              }}
                              className="w-full bg-transparent outline-none text-white font-bold"
                            />
                          </div>

                          <div className="p-3 text-[10px] text-gray-400 leading-relaxed truncate" title={row.rawLine}>
                            {row.rawLine}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-sm text-gray-500">
                        Nenhuma linha processada ainda. Cole o texto bruto para gerar a prévia.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-xs text-gray-500">
                    A confirmação final salva o resultado no formato que o app já usa hoje.
                  </p>
                  <button
                    type="button"
                    onClick={handleImportSave}
                    disabled={!previewRows.length}
                    className="px-6 py-3 rounded-xl bg-red-600 text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-red-500 transition-colors disabled:opacity-50"
                  >
                    Confirmar e salvar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#333] bg-[#181818] flex gap-4">
          <button onClick={onClose} type="button" className="flex-1 py-3 border border-[#333] rounded text-xs font-bold hover:bg-[#222] transition-colors">
            CANCELAR
          </button>
          {activeTab === "manual" ? (
            <button onClick={handleManualSave} type="button" className="flex-1 py-3 bg-red-600 rounded text-xs font-bold text-white hover:bg-red-700 transition-colors">
              SALVAR RESULTADO
            </button>
          ) : (
            <button
              onClick={handleImportSave}
              type="button"
              className="flex-1 py-3 bg-red-600 rounded text-xs font-bold text-white hover:bg-red-700 transition-colors"
              disabled={!previewRows.length}
            >
              SALVAR IMPORTAÇÃO
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
