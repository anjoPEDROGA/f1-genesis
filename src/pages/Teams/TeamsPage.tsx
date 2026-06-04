import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import SectionTitle from "../../components/ui/SectionTitle"
import { useDriverStore } from "../../store/useDriverStore"
import { getTeamHistory } from "../../data/teamStats"

export default function TeamsPage() {
  const teams = useDriverStore((s) => s.teams)
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const filteredTeams = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return teams
    return teams.filter((team) =>
      [team.name, team.id]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
  }, [query, teams])

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <SectionTitle
        eyebrow="Equipes"
        title="Campeonato de Construtores"
        subtitle="As equipes ativas da temporada 2026."
      />

      <div className="max-w-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar equipe..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-muted focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
          <div
            key={team.id}
            onClick={() => navigate(`/teams/${team.id}`)}
            className="relative overflow-hidden rounded-panel border border-white/10 bg-white/5 backdrop-blur-md p-8 group cursor-pointer transition-all hover:border-white/30 hover:-translate-y-1"
          >
            <div
              className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
              style={{ background: `radial-gradient(circle at top right, ${team.color}88, transparent 70%)` }}
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <img src={team.logo} alt={team.name} className="h-20 object-contain mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-black uppercase tracking-tight font-display" style={{ color: team.color }}>
                {team.name}
              </h3>
              <div className="mt-5 w-full flex items-center justify-between gap-4 rounded-2xl bg-black/20 border border-white/5 p-3">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    navigate(`/principals/${team.id}`)
                  }}
                  className="flex items-center gap-3 min-w-0 text-left"
                >
                  <img
                    src={team.principalImage}
                    alt={team.principalName}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Chefe</p>
                    <p className="text-sm font-bold truncate">{team.principalName}</p>
                  </div>
                </button>
                <img
                  src={team.carImage}
                  alt={`${team.name} carro`}
                  className="w-24 h-12 object-contain opacity-80"
                />
              </div>
              {getTeamHistory(team.id) && (
                <p className="mt-3 text-xs text-muted uppercase tracking-[0.25em]">
                  {getTeamHistory(team.id)?.wins} vitórias históricas
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
