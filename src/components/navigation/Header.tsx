import { useEffect, useMemo, useState } from "react";
import { useRaceStore } from "../../store/useRaceStore";
import { Minus, Square, X } from "lucide-react";

function parseSessionDate(sessionDate: string, sessionTime: string) {
  return new Date(`${sessionDate}T${sessionTime}:00`);
}

export default function Header() {
  const nextRace = useRaceStore((s) => s.getNextRace());

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const nextSession = useMemo(() => {
    if (!nextRace || !nextRace.sessions.length) return null;

    const upcomingSessions = [...nextRace.sessions]
      .map((session) => ({
        ...session,
        targetDate: parseSessionDate(session.date, session.time),
      }))
      .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

    return (
      upcomingSessions.find((session) => session.targetDate.getTime() >= now.getTime()) ??
      upcomingSessions[upcomingSessions.length - 1] ??
      null
    );
  }, [nextRace, now]);

  const nextSessionLabel = nextSession?.label ?? "";

  const countdown = useMemo(() => {
    if (!nextRace || !nextRace.sessions.length) return "TEMPORADA FINALIZADA";
    if (!nextSession) return "EVENTO ENCERRADO";

    const difference = nextSession.targetDate.getTime() - now.getTime();
    const isSameDay = now.toDateString() === nextSession.targetDate.toDateString();

    if (difference <= 0) return "AO VIVO";
    if (isSameDay) return `HOJE - ${nextSession.label.toUpperCase()}`;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);

    return `FALTAM ${days}d ${hours
      .toString()
      .padStart(2, "0")}h ${mins
      .toString()
      .padStart(2, "0")}m ${secs
      .toString()
      .padStart(2, "0")}s`;
  }, [nextRace, nextSession, now]);

  const currentDate = now.toLocaleDateString("pt-BR");

  const desktopControls = (window as Window & {
    desktopControls?: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      isMaximized: () => Promise<boolean>;
    };
  }).desktopControls;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="h-20 px-8 flex items-center justify-between drag-region">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Telemetria ao Vivo
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Centro de Controle da F1
            </h2>
            <p className="mt-1 text-xs text-muted">
              {currentDate}
            </p>
          </div>

        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs text-muted mb-1">Próximo Evento</p>

            <div className="flex items-center gap-3">
              {nextRace?.flag && (
                <img
                  src={nextRace.flag}
                  alt="Bandeira"
                  className="w-6 h-4 object-cover rounded shadow-sm opacity-80"
                />
              )}

              <div>
                <h3 className="font-bold">
                  {nextRace
                    ? `${nextRace.country} - ${nextRace.circuit}`
                    : "Nenhuma"}
                </h3>

                <p className="text-xs text-muted">
                  Próxima sessão: {nextSessionLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="w-[1px] h-8 bg-white/10" />

          <div className="min-w-[200px]">
            <p className="text-xs text-muted mb-1">Status do Evento</p>

            <h3
              className={`font-mono font-bold tracking-tight ${
                countdown === "AO VIVO"
                  ? "text-red-500 animate-pulse"
                  : countdown === "CANCELADO"
                  ? "text-gray-500"
                  : "text-yellow-500"
              }`}
            >
              {countdown}
            </h3>
          </div>

          <div className="flex items-center gap-2 ml-4 no-drag">
            <button
              type="button"
              onClick={() => desktopControls?.minimize()}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label="Minimizar"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => desktopControls?.maximize()}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label="Maximizar"
            >
              <Square className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => desktopControls?.close()}
              className="w-10 h-10 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-colors flex items-center justify-center text-red-400"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
