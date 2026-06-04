import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassPanel from "../ui/GlassPanel";
import { useRaceStore } from "../../store/useRaceStore";

export default function NextRaceCard() {
  const navigate = useNavigate();
  const nextRace = useRaceStore((s) => s.getNextRace());

  if (!nextRace) {
    return (
      <GlassPanel className="p-8 text-center text-muted h-52 flex items-center justify-center">
        O campeonato terminou. Resete a temporada para começar de novo.
      </GlassPanel>
    );
  }

  return (
    <GlassPanel
      className="p-0 relative overflow-hidden min-h-[200px] border-white/10 group cursor-pointer transition-all hover:border-white/30 hover:-translate-y-1"
      onClick={() => navigate(`/races?race=${nextRace.id}`)}
    >
      <div className="relative w-full h-full p-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <img
          src={nextRace.flag}
          alt=""
          className="absolute left-0 top-0 h-full w-1/2 object-cover opacity-20 pointer-events-none transition-opacity group-hover:opacity-30"
          style={{ maskImage: "linear-gradient(to right, black, transparent)" }}
        />

        <div className="relative z-10 flex-1 w-full">
          <p className="text-red-600 font-black tracking-[0.3em] text-[10px] mb-1 uppercase">
            ROUND {nextRace.round}
          </p>

          <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            {nextRace.name
              .replace("GP da ", "")
              .replace("GP do ", "")
              .replace("GP de ", "")}
          </h3>

          <p className="text-gray-400 font-bold text-sm">{nextRace.name}</p>

          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                Data Principal
              </p>
              <p className="font-bold text-sm mt-1 text-white">
                {nextRace.date}
              </p>
            </div>

            <div>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                Circuito
              </p>
              <p className="font-bold text-sm mt-1 text-white">
                {nextRace.circuit}
              </p>
            </div>

            <div>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                Histórico
              </p>
              <p className="font-bold text-sm mt-1 text-white">
                {nextRace.totalGPs} GPs realizados
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-auto min-w-[200px] bg-black/40 p-4 rounded-xl border border-white/5">
          <p className="text-[10px] text-primary uppercase tracking-widest font-bold mb-3">
            Cronograma
          </p>

          <div className="space-y-2">
            {nextRace.sessions.map((session, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center gap-6 border-b border-white/5 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-xs font-bold text-gray-300">
                  {session.label}
                </span>
                <span className="text-[10px] text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">
                  {session.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative z-10 w-48 h-full hidden lg:flex items-center justify-center ml-4"
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img
            src={nextRace.circuitImage}
            alt="Circuito"
            className="w-full h-full object-contain opacity-40 mix-blend-screen drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]"
          />
        </motion.div>
      </div>
    </GlassPanel>
  );
}
