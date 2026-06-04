import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRaceStore } from "../../store/useRaceStore";
import { useStandingsStore } from "../../store/useStandingsStore";
import SectionTitle from "../../components/ui/SectionTitle";
import GlassPanel from "../../components/ui/GlassPanel";
import SessionEditor from "../../components/race/SessionEditor";
import type { Session } from "../../types/Race";

export default function RacesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedRaceId = searchParams.get("race");
  const { races, updateSession } = useRaceStore();
  const nextRace = useRaceStore((s) => s.getNextRace());
  const recalculateAll = useStandingsStore((s) => s.recalculateAll);
  const raceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [editor, setEditor] = useState<{ isOpen: boolean; raceId: string | null; session: Session | null }>({
    isOpen: false,
    raceId: null,
    session: null,
  });

  useEffect(() => {
    if (!selectedRaceId) return;
    const el = raceRefs.current[selectedRaceId];
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedRaceId]);

  const handleSave = (grid: any[], dnf: any[]) => {
    if (editor.raceId && editor.session) {
      const allResults = [...grid, ...dnf];
      updateSession(editor.raceId, editor.session.type, allResults);
      const updatedRaces = useRaceStore.getState().races;
      recalculateAll(updatedRaces);
      setEditor({ isOpen: false, raceId: null, session: null });
    }
  };

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <div className="max-w-7xl mx-auto p-12 space-y-8">
      <SectionTitle title="Season Calendar" eyebrow="2026 Season" />

      <div className="grid gap-6">
        {races.map((race) => {
          const isNext = race.id === nextRace?.id;
          const isCompleted = !isNext && race.date < today;
          const isSelected = selectedRaceId === race.id;
          const isCancelled = race.cancelled === true;

          return (
            <GlassPanel
              key={race.id}
              ref={(node) => {
                raceRefs.current[race.id] = node;
              }}
              className={`relative p-6 border-l-4 transition-all overflow-hidden group ${
                isSelected
                  ? "border-l-primary ring-2 ring-primary/30"
                  : isCancelled
                    ? "border-l-red-500"
                    : isNext
                      ? "border-l-primary"
                      : isCompleted
                        ? "border-l-green-500"
                        : "border-l-white/10"
              }`}
            >
              {isCancelled && (
                <>
                  <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] opacity-70 group-hover:opacity-40 transition-opacity pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-red-600 text-white font-black px-6 py-2 -rotate-12 uppercase tracking-[0.4em] text-xl shadow-2xl">
                      Cancelado
                    </span>
                  </div>
                </>
              )}

              <div className={`flex items-start justify-between mb-6 gap-4 ${isCancelled ? "blur-[1.5px] group-hover:blur-0 transition-all" : ""}`}>
                <div className="flex gap-4 items-center min-w-0">
                  {race.flag ? (
                    <img src={race.flag} className="w-16 h-10 object-cover rounded shadow-md border border-white/5" alt={race.country} />
                  ) : (
                    <div className="w-16 h-10 rounded shadow-md border border-white/5 bg-white/5 flex items-center justify-center text-[10px] uppercase text-muted">
                      {race.country.slice(0, 5)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-muted text-xs uppercase tracking-widest font-bold">Round {race.round}</p>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter truncate">{race.name}</h3>
                    <p className="text-muted text-sm truncate">{race.circuit} • {race.country}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-3">
                  <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${isCancelled ? "bg-red-500/20 text-red-400" : isCompleted ? "bg-green-500/20 text-green-500" : isNext ? "bg-primary text-white" : "bg-white/5"}`}>
                    {isCancelled ? "Canceled" : isCompleted ? "Finished" : isNext ? "Next Up" : "Upcoming"}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/calendar?race=${race.id}`)}
                    className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    Abrir calendário
                  </button>
                  {race.circuitImage ? (
                    <img src={race.circuitImage} className={`w-24 h-24 object-contain opacity-30 mix-blend-screen ${isCancelled ? "blur-[1.5px] group-hover:blur-0 transition-all" : ""}`} alt="Circuito" />
                  ) : (
                    <div className={`w-24 h-24 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[10px] uppercase text-muted ${isCancelled ? "blur-[1.5px] group-hover:blur-0 transition-all" : ""}`}>
                      Sem imagem
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {race.sessions.map((session, idx) => (
                  <button
                    key={idx}
                    onClick={() => setEditor({ isOpen: true, raceId: race.id, session })}
                    className="flex flex-col items-center justify-center p-4 bg-surface2 border border-border rounded-xl hover:border-primary transition-all group"
                  >
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider mb-1 group-hover:text-white">
                      {session.label}
                    </span>
                    <span className={`text-[9px] font-bold ${session.completed ? "text-green-500" : "text-primary"}`}>
                      {session.completed ? "EDITAR" : "PREENCHER"}
                    </span>
                  </button>
                ))}
              </div>
            </GlassPanel>
          );
        })}
      </div>

      <SessionEditor
        isOpen={editor.isOpen}
        sessionData={editor.session}
        onClose={() => setEditor({ isOpen: false, raceId: null, session: null })}
        onSave={handleSave}
      />
    </div>
  );
}
