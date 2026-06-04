import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom"
import { fadeUp, staggerContainer } from "../../lib/motion"
import { races } from "../../data/races"
import type { Race } from "../../types/Race"
import SectionTitle from "../../components/ui/SectionTitle"
import GlassPanel from "../../components/ui/GlassPanel"

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR")
}

export default function CalendarPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selectedRace, setSelectedRace] = useState<Race | null>(null)
  const [query, setQuery] = useState("")

  const filteredRaces = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return races
    return races.filter((race) =>
      [race.name, race.country, race.circuit, String(race.round)]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
  }, [query])

  useEffect(() => {
    const raceId = searchParams.get("race")
    if (!raceId) return
    setSelectedRace(races.find((item) => item.id === raceId) || null)
  }, [searchParams])

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-6 py-12 space-y-12"
    >
      <motion.div variants={fadeUp}>
        <SectionTitle
          eyebrow="Temporada 2026"
          title="Calendário do Campeonato"
          subtitle="O calendário recorde de 24 corridas (* incluindo eventos cancelados)."
        />
      </motion.div>

      <motion.div variants={fadeUp} className="max-w-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar corrida, circuito ou país..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-muted focus:border-primary"
        />
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRaces.map((race) => {
          const isCancelled = race.cancelled === true

          return (
            <GlassPanel
              key={race.id}
              className={`p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden group transition-all ${
                isCancelled ? "border-red-900/30" : "cursor-pointer hover:border-white/30 hover:-translate-y-1"
              }`}
            >
              {!isCancelled && <div className="absolute inset-0 z-20" onClick={() => setSelectedRace(race)} />}

              {isCancelled && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/25 backdrop-blur-sm pointer-events-none opacity-70 group-hover:opacity-35 transition-opacity">
                  <span className="bg-red-600 text-white font-black px-6 py-2 -rotate-12 uppercase tracking-[0.4em] text-xl shadow-2xl">
                    Cancelado
                  </span>
                </div>
              )}

              {race.flag ? (
                <img
                  src={race.flag}
                  className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-15 pointer-events-none transition-opacity group-hover:opacity-30"
                  style={{ maskImage: "linear-gradient(to left, black, transparent)" }}
                  alt=""
                />
              ) : (
                <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-white/10 to-transparent opacity-20 pointer-events-none" />
              )}

              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-3">Round {race.round}</p>
                  <h3 className="text-2xl font-black mb-1 uppercase font-display">
                    {race.country} {isCancelled ? "*" : ""}
                  </h3>
                  <p className="text-muted text-xs uppercase tracking-widest">{race.name}</p>
                </div>

                {race.circuitImage ? (
                  <img src={race.circuitImage} className="w-20 h-20 opacity-40 mix-blend-screen pointer-events-none" alt="Circuito" />
                ) : (
                  <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 pointer-events-none" />
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-end relative z-10">
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-[0.2em] mb-1">Data</p>
                  <p className="font-bold text-sm uppercase font-display">{formatDate(race.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted uppercase tracking-[0.2em] mb-1">Circuito</p>
                  <p className="font-bold text-xs truncate max-w-[140px] uppercase">{race.circuit}</p>
                </div>
              </div>
            </GlassPanel>
          )
        })}
      </motion.div>

      <AnimatePresence>
        {selectedRace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedRace(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                {selectedRace.flag ? (
                  <img
                    src={selectedRace.flag}
                    className={`absolute inset-0 w-full h-full object-cover opacity-20 ${selectedRace.cancelled ? "blur-[1px]" : ""}`}
                    alt=""
                    style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-b from-white/10 to-transparent ${selectedRace.cancelled ? "blur-[1px]" : ""}`} />
                )}
                {selectedRace.circuitImage ? (
                  <img
                    src={selectedRace.circuitImage}
                    className={`relative z-10 h-32 object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] ${selectedRace.cancelled ? "blur-[1px]" : ""}`}
                    alt="Traçado"
                  />
                ) : (
                  <div className={`relative z-10 w-32 h-32 rounded-full border border-white/10 bg-white/5 ${selectedRace.cancelled ? "blur-[1px]" : ""}`} />
                )}
              </div>

              <div className="p-8">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-1 font-display">{selectedRace.circuit}</h2>
                  <p className="text-primary uppercase tracking-widest text-xs font-bold">{selectedRace.name}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-[10px] text-muted uppercase tracking-widest mb-2">Inauguração</p>
                    <p className="font-black text-xl">{selectedRace.inauguration || "-"}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-[10px] text-muted uppercase tracking-widest mb-2">Primeiro GP</p>
                    <p className="font-black text-xl">{selectedRace.firstGP || "-"}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-[10px] text-muted uppercase tracking-widest mb-2">Total de Corridas</p>
                    <p className="font-black text-xl">{selectedRace.totalGPs || "-"}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-[10px] text-muted uppercase tracking-widest mb-2">Maior Vencedor</p>
                    <p className="font-bold text-sm leading-tight text-primary">{selectedRace.mostWins || "-"}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/races?race=${selectedRace.id}`)}
                  className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl text-xs uppercase tracking-widest font-bold"
                >
                  Ver em Corridas
                </button>

                <button
                  onClick={() => setSelectedRace(null)}
                  className="mt-3 w-full py-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl text-xs uppercase tracking-widest font-bold"
                >
                  Fechar Histórico
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
