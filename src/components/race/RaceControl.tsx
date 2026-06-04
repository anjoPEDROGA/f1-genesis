import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDriverStore } from "../../store/useDriverStore";
import { useStandingsStore } from "../../store/useStandingsStore";
import { useRaceStore } from "../../store/useRaceStore";
import { simulateRace } from "../../services/raceSimulation";

export default function RaceControl() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const drivers = useDriverStore((s) => s.drivers);
  const { advanceRound, updateSession } = useRaceStore(); 
  const nextRace = useRaceStore((s) => s.getNextRace());
  const recalculateAll = useStandingsStore((s) => s.recalculateAll);

  async function runRace() {
    if (!nextRace) return;
    
    setIsSimulating(true);
    setShowModal(true); // Abre a tela de cinema
    
    try {
      const results = await simulateRace(drivers);
      updateSession(nextRace.id, "corrida", results);
      
      const updatedRaces = useRaceStore.getState().races;
      recalculateAll(updatedRaces); 
      advanceRound();
      
    } catch (error) {
      console.error("Erro na simulação:", error);
    } finally {
      setIsSimulating(false);
      // Mantém a tela de sucesso aberta por 2 segundos antes de fechar
      setTimeout(() => setShowModal(false), 2000); 
    }
  }

  return (
    <>
      <button
        onClick={runRace}
        disabled={isSimulating || !nextRace}
        className="px-6 py-3 rounded-2xl bg-red-600 shadow-lg shadow-red-900/20 font-black text-white uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-red-700 hover:scale-105 active:scale-95"
      >
        {nextRace 
          ? `Simular ${nextRace.name.replace("GP da ", "").replace("GP do ", "").replace("GP de ", "")}` 
          : "Temporada Encerrada"
        }
      </button>

      {/* TELA DE LOADING CINEMATOGRÁFICA */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            <div className="text-center flex flex-col items-center">
              {isSimulating ? (
                <>
                  <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-6" />
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white animate-pulse">
                    Processando Telemetria
                  </h2>
                  <p className="text-muted mt-4 uppercase tracking-[0.3em] text-sm font-bold">
                    Simulando Resultados • {nextRace?.country}
                  </p>
                </>
              ) : (
                <>
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                  >
                    <span className="text-4xl text-white font-black">✓</span>
                  </motion.div>
                  <h2 className="text-4xl font-black uppercase tracking-widest text-white">
                    Resultados Gerados
                  </h2>
                  <p className="text-green-400 mt-4 uppercase tracking-[0.3em] text-sm font-bold">
                    Classificação Atualizada
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}