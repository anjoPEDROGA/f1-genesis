import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { fadeUp, staggerContainer } from "../../lib/motion"
import HeroCard from "../../components/cards/HeroCard"
import SectionTitle from "../../components/ui/SectionTitle"
import StatsGrid from "../../components/dashboard/StatsGrid"
import NextRaceCard from "../../components/race/NextRaceCard"
import DriversGrid from "../../components/drivers/DriversGrid"
import StandingsGrid from "../../components/standings/StandingsGrid"
import RaceControl from "../../components/race/RaceControl"
import { principals } from "../../data/principals"
import { teams } from "../../data/teams"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-6 py-12 space-y-16"
    >
      <motion.div variants={fadeUp}>
        <HeroCard />
      </motion.div>

      <motion.div variants={fadeUp}>
        <SectionTitle
          eyebrow="Telemetria"
          title="Visão Geral do Campeonato"
          subtitle="Acompanhamento em tempo real da temporada atual da Fórmula 1."
        />
        <StatsGrid />
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionTitle eyebrow="Ao Vivo" title="Top 10 Classificação" />
          <StandingsGrid />
        </div>

        <div>
          <SectionTitle eyebrow="Ação" title="Controle de Corrida" />
          <div className="bg-white/5 border border-white/10 rounded-panel p-6 flex flex-col items-center justify-center text-center h-64">
            <p className="text-muted text-sm mb-6 max-w-[200px]">
              Execute o motor de simulação para gerar os resultados do próximo Grand Prix.
            </p>
            <RaceControl />
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <SectionTitle eyebrow="Fim de Semana" title="Próximo Evento" />
        <NextRaceCard />
      </motion.div>

      <motion.div variants={fadeUp}>
        <SectionTitle
          eyebrow="Chefes"
          title="Team Principals"
          subtitle="Acesso rápido aos líderes de cada equipe."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {principals.map((principal) => (
            <button
              key={principal.teamId}
              onClick={() => navigate(`/principals/${principal.teamId}`)}
              className="relative overflow-hidden rounded-panel border border-white/10 bg-white/5 backdrop-blur-md p-4 text-left transition-all hover:border-white/30 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20" />
              <div className="relative z-10 flex items-center gap-4">
                <img
                  src={principal.image}
                  alt={principal.name}
                  className="w-14 h-14 rounded-full object-cover border border-white/10"
                />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted truncate">
                    {principal.team}
                  </p>
                  <h3 className="text-lg font-black font-display truncate">{principal.name}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <SectionTitle
          eyebrow="Equipes"
          title="Atalhos para as Ligas"
          subtitle="Clique no logo para abrir o perfil completo da equipe."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => navigate(`/teams/${team.id}`)}
              className="relative overflow-hidden rounded-panel border border-white/10 bg-white/5 backdrop-blur-md p-4 flex items-center justify-center transition-all hover:border-white/30 hover:-translate-y-1 min-h-[96px]"
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: `radial-gradient(circle at center, ${team.color}88, transparent 70%)` }}
              />
              <img src={team.logo} alt={team.name} className="relative z-10 h-12 w-full object-contain opacity-90" />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <SectionTitle eyebrow="Pilotos" title="Pilotos em Destaque" />
        <DriversGrid />
      </motion.div>
    </motion.section>
  )
}
