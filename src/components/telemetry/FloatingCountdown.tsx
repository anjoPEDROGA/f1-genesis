import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRaceStore } from "../../store/useRaceStore";

function parseSessionDate(sessionDate: string, sessionTime: string) {
  return new Date(`${sessionDate}T${sessionTime}:00`);
}

export default function FloatingCountdown() {
  const navigate = useNavigate();
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
      .map((session) => ({ ...session, targetDate: parseSessionDate(session.date, session.time) }))
      .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

    return (
      upcomingSessions.find((session) => session.targetDate.getTime() >= now.getTime()) ??
      upcomingSessions[upcomingSessions.length - 1] ??
      null
    );
  }, [nextRace, now]);

  const status = useMemo(() => {
    if (!nextRace) return "TEMPORADA FINALIZADA";
    if (!nextSession) return "EVENTO ENCERRADO";

    const diff = nextSession.targetDate.getTime() - now.getTime();
    const sameDay = now.toDateString() === nextSession.targetDate.toDateString();
    if (diff <= 0) return "AO VIVO";
    if (sameDay) return `HOJE • ${nextSession.label.toUpperCase()}`;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}D ${hours.toString().padStart(2, "0")}H ${mins.toString().padStart(2, "0")}M`;
  }, [nextRace, nextSession, now]);

  if (!nextRace) return null;

  return (
    <button
      type="button"
      onClick={() => navigate(`/races?race=${nextRace.id}`)}
      className="fixed bottom-5 right-5 z-[80] w-[320px] max-w-[calc(100vw-2rem)] text-left rounded-2xl border border-white/10 bg-[#0c0c0c]/85 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden transition-transform hover:-translate-y-1 hover:border-white/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent opacity-60" />
      <div className="relative z-10 p-4">
        <p className="text-[9px] uppercase tracking-[0.4em] text-primary font-bold mb-2">
          Próximo Evento
        </p>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-black uppercase tracking-tight leading-none truncate">
              {nextRace.country}
            </h4>
            <p className="text-[11px] text-muted truncate">{nextRace.circuit}</p>
          </div>
          {nextRace.flag && (
            <img src={nextRace.flag} alt="" className="w-8 h-5 rounded-sm object-cover border border-white/10" />
          )}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted">Sessão</p>
            <p className="text-sm font-bold text-white">{nextSession?.label ?? "—"}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted">Status</p>
            <p className={`text-sm font-black ${status === "AO VIVO" ? "text-red-500" : "text-yellow-500"}`}>
              {status}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
