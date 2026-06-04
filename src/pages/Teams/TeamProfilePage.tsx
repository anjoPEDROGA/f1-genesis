import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDriverStore } from "../../store/useDriverStore"
import { useStandingsStore } from "../../store/useStandingsStore"
import GlassPanel from "../../components/ui/GlassPanel"
import { ArrowLeft, Users, Flag, Activity } from "lucide-react"
import { getTeamHistory } from "../../data/teamStats"

function getThumbImage(image: string) {
  return image.replace("/drivers/", "/drivers/thumbs/")
}

export default function TeamProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // CORREÇÃO DO LOOP INFINITO: Pegamos as funções primeiro (referências fixas)
  const getTeamById = useDriverStore((s) => s.getTeamById)
  const getDriversByTeam = useDriverStore((s) => s.getDriversByTeam)
  
  // Só executamos depois
  const team = getTeamById(id || "")
  const teamDrivers = getDriversByTeam(id || "")
  const history = id ? getTeamHistory(id) : undefined
  
  const seasonStats = useStandingsStore((s) => 
    s.constructorStandings.find((standing) => standing.teamId === id)
  )

  if (!team) return <div className="p-20 text-center text-muted">Equipe não encontrada.</div>

  return (
    <div className="max-w-6xl mx-auto p-12 space-y-8">
      <button
        type="button"
        onClick={() => (location.key ? navigate(-1) : navigate("/teams"))}
        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassPanel className="p-10 lg:col-span-1 flex flex-col items-center text-center relative overflow-hidden" style={{ borderTopColor: team.color }}>
          <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at top, ${team.color}, transparent 70%)`}} />
          <div className="w-48 h-32 flex items-center justify-center mb-6 z-10">
            <img src={team.logo} alt={team.name} className="max-w-full max-h-full object-contain" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 z-10 font-display" style={{ color: team.color }}>{team.name}</h1>
          {history && (
            <p className="text-xs text-muted uppercase tracking-[0.35em] z-10">
              {history.country} • Base: {history.base}
            </p>
          )}
          <div className="mt-6 w-full rounded-2xl bg-white/5 border border-white/10 p-4 z-10 space-y-4">
            <button
              type="button"
              onClick={() => navigate(`/principals/${team.id}`)}
              className="w-full flex items-center gap-3 text-left rounded-xl bg-black/20 border border-white/5 p-3 hover:border-white/20 transition-colors"
            >
              <img
                src={team.principalImage}
                alt={team.principalName}
                className="w-16 h-16 rounded-full object-cover border border-white/10"
              />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Chefe de equipe</p>
                <p className="font-bold text-lg">{team.principalName}</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/teams/${team.id}`)}
              className="w-full flex items-center gap-3 rounded-xl bg-black/20 border border-white/5 p-3 hover:border-white/20 transition-colors"
            >
              <img src={team.logo} alt={team.name} className="w-16 h-16 object-contain" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Equipe</p>
                <p className="font-bold text-lg">{team.name}</p>
              </div>
            </button>
            <div className="rounded-xl bg-black/20 border border-white/5 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Carro 2026</p>
              <img src={team.carImage} alt={`${team.name} carro`} className="w-full h-28 object-contain" />
            </div>
          </div>
        </GlassPanel>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <GlassPanel className="p-6 flex flex-col items-center text-center">
              <Activity className="w-8 h-8 mb-2 opacity-80" style={{ color: team.color }} />
              <p className="text-4xl font-black font-display">{seasonStats?.points || 0}</p>
              <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Pontos (2026)</p>
            </GlassPanel>
            <GlassPanel className="p-6 flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-gray-300 mb-2 opacity-80" />
              <p className="text-4xl font-black font-display">{seasonStats?.position || "-"}</p>
              <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Posição Atual</p>
            </GlassPanel>
            <GlassPanel className="p-6 flex flex-col items-center text-center">
              <Flag className="w-8 h-8 text-green-500 mb-2 opacity-80" />
              <p className="text-4xl font-black font-display">{seasonStats?.wins || 0}</p>
              <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Vitórias (2026)</p>
            </GlassPanel>
          </div>

          {history && (
            <GlassPanel className="p-8">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6">Histórico da Equipe</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-2">Fundação</p>
                  <p className="text-xl font-black font-display">{history.foundation}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-2">Vitórias</p>
                  <p className="text-xl font-black font-display">{history.wins}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-2">Poles</p>
                  <p className="text-xl font-black font-display">{history.poles}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-2">Pódios</p>
                  <p className="text-xl font-black font-display">{history.podiums}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-3">Títulos de Pilotos</p>
                  <p className="text-2xl font-black font-display mb-3">{history.driversTitles}</p>
                  <div className="space-y-2">
                    {history.driversChampionships?.length ? history.driversChampionships.map((item) => (
                      <p key={item} className="text-sm text-muted">{item}</p>
                    )) : <p className="text-sm text-muted">Não possui títulos de pilotos.</p>}
                  </div>
                </div>

                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-3">Títulos de Construtores</p>
                  <p className="text-2xl font-black font-display mb-3">{history.constructorsTitles}</p>
                  <div className="flex flex-wrap gap-2">
                    {history.constructorsChampionships?.length ? history.constructorsChampionships.map((year) => (
                      <span key={year} className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold">{year}</span>
                    )) : <p className="text-sm text-muted">Não possui títulos de construtores.</p>}
                  </div>
                </div>
              </div>

              <p className="mt-6 text-muted leading-relaxed">{history.biography}</p>
              {history.legacy && <p className="mt-4 text-sm text-muted leading-relaxed">{history.legacy}</p>}
            </GlassPanel>
          )}

          <GlassPanel className="p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6">Dupla de Pilotos</h2>
            <div className="grid grid-cols-2 gap-6">
              {teamDrivers.map(driver => (
                <button
                  key={driver.id}
                  type="button"
                  onClick={() => navigate(`/drivers/${driver.id}`)}
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 text-left hover:border-white/20 transition-colors"
                >
                  <img src={getThumbImage(driver.image)} className="w-16 h-16 rounded-full object-cover bg-black" alt="" />
                  <div>
                    <p className="text-xs text-muted uppercase tracking-widest">{driver.firstName}</p>
                    <p className="text-xl font-black uppercase font-display">{driver.lastName}</p>
                  </div>
                </button>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}
