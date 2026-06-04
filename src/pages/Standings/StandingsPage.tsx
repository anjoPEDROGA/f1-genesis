import { useState } from "react";
import { motion } from "framer-motion";
import { useStandingsStore } from "../../store/useStandingsStore";
import { useDriverStore } from "../../store/useDriverStore";
import { useRaceStore } from "../../store/useRaceStore"; // Importado para resetar as corridas
import SectionTitle from "../../components/ui/SectionTitle";
import GlassPanel from "../../components/ui/GlassPanel";
import { staggerContainer, fadeUp } from "../../lib/motion";

function getThumbImage(image: string) {
  return image.replace("/drivers/", "/drivers/thumbs/")
}

export default function StandingsPage() {
  const [activeTab, setActiveTab] = useState<"drivers" | "constructors">("drivers");
  
  const { driverStandings, constructorStandings, resetStandings } = useStandingsStore();
  const { resetRaces } = useRaceStore();
  const { getDriverById, getTeamById } = useDriverStore();

  // Função que limpa todo o cache da temporada
  const handleResetSeason = () => {
    if (window.confirm("Tem certeza que deseja resetar todo o campeonato? Todos os resultados e pontos serão perdidos.")) {
      resetStandings();
      resetRaces();
      alert("Temporada resetada com sucesso!");
    }
  };

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-6 py-12 space-y-12"
    >
      <motion.div variants={fadeUp} className="flex justify-between items-end">
        <SectionTitle
          eyebrow="Season 2026"
          title="World Championship"
          subtitle="Current standings for the FIA Formula One World Championship."
        />
        
        <div className="flex flex-col items-end gap-4">
          {/* Botão de Reset */}
          <button
            onClick={handleResetSeason}
            className="px-4 py-2 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white border border-red-600/50 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Reset Season
          </button>

          {/* Abas de Navegação */}
          <div className="flex bg-surface2 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("drivers")}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "drivers" ? "bg-primary text-white shadow-lg" : "text-muted hover:text-white"
              }`}
            >
              Pilotos
            </button>
            <button
              onClick={() => setActiveTab("constructors")}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "constructors" ? "bg-primary text-white shadow-lg" : "text-muted hover:text-white"
              }`}
            >
              Construtores
            </button>
          </div>
        </div>
      </motion.div>

      {/* TABELA DE PILOTOS */}
      {activeTab === "drivers" && (
        <motion.div variants={fadeUp} className="space-y-4">
          {driverStandings.length === 0 ? (
            <p className="text-muted text-center py-10">Nenhuma corrida concluída ainda.</p>
          ) : (
            driverStandings.map((standing) => {
              const driver = getDriverById(standing.driverId);
              const team = driver ? getTeamById(driver.teamId) : null;
              if (!driver || !team) return null;

              return (
                <GlassPanel key={driver.id} className="p-0 overflow-hidden flex items-center relative group">
                  <div className="w-2 h-full absolute left-0 top-0" style={{ backgroundColor: team.color }} />
                  
                  <div className="flex-1 flex items-center p-4 pl-8">
                    <div className="w-12 text-2xl font-black text-muted group-hover:text-white transition-colors">
                      {standing.position}
                    </div>
                    
                    <img src={getThumbImage(driver.image)} alt={driver.lastName} className="w-16 h-16 object-contain drop-shadow-lg mx-6" />
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-bold uppercase tracking-tight font-display">
                        <span className="text-muted font-normal mr-2">{driver.firstName}</span>
                        {driver.lastName}
                      </h4>
                      <p className="text-xs uppercase tracking-widest text-muted mt-1">{team.name}</p>
                    </div>
                    
                    <div className="flex gap-10 text-center px-8 border-r border-white/5">
                      <div>
                        <p className="text-[10px] text-muted uppercase">Wins</p>
                        <p className="font-bold">{standing.wins}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted uppercase">Podiums</p>
                        <p className="font-bold">{standing.podiums}</p>
                      </div>
                    </div>
                    
                    <div className="w-32 text-right pr-6">
                      <p className="text-3xl font-black text-primary">{standing.points}</p>
                      <p className="text-[10px] text-muted uppercase tracking-widest">PTS</p>
                    </div>
                  </div>
                </GlassPanel>
              );
            })
          )}
        </motion.div>
      )}

      {/* TABELA DE CONSTRUTORES */}
      {activeTab === "constructors" && (
        <motion.div variants={fadeUp} className="space-y-4">
          {constructorStandings.length === 0 ? (
            <p className="text-muted text-center py-10">Nenhuma corrida concluída ainda.</p>
          ) : (
            constructorStandings.map((standing) => {
              const team = getTeamById(standing.teamId);
              if (!team) return null;

              return (
                <GlassPanel key={team.id} className="p-0 overflow-hidden flex items-center relative group">
                  <div className="w-2 h-full absolute left-0 top-0" style={{ backgroundColor: team.color }} />
                  
                  <div className="flex-1 flex items-center p-6 pl-8">
                    <div className="w-12 text-2xl font-black text-muted group-hover:text-white transition-colors">
                      {standing.position}
                    </div>
                    
                    <div className="w-24 h-16 flex items-center justify-center mx-6">
                      <img src={team.logo} alt={team.name} className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold uppercase tracking-tight font-display" style={{ color: team.color }}>
                        {team.name}
                      </h4>
                    </div>
                    
                    <div className="flex gap-10 text-center px-8 border-r border-white/5">
                      <div>
                        <p className="text-[10px] text-muted uppercase">Wins</p>
                        <p className="font-bold">{standing.wins}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted uppercase">Podiums</p>
                        <p className="font-bold">{standing.podiums}</p>
                      </div>
                    </div>
                    
                    <div className="w-32 text-right pr-6">
                      <p className="text-3xl font-black text-primary">{standing.points}</p>
                      <p className="text-[10px] text-muted uppercase tracking-widest">PTS</p>
                    </div>
                  </div>
                </GlassPanel>
              );
            })
          )}
        </motion.div>
      )}
    </motion.section>
  );
}
