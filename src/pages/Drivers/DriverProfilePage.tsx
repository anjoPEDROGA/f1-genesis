import { useLocation, useNavigate, useParams, Link } from "react-router-dom"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useDriverStore } from "../../store/useDriverStore"
import { useStandingsStore } from "../../store/useStandingsStore"
import GlassPanel from "../../components/ui/GlassPanel"
import { ArrowLeft, Trophy, Medal, Flag } from "lucide-react"
import { getCountryFlagUrl } from "../../utils/flags"
import { driverPoints2025 } from "../../data/results25"
import { driverProfiles } from "../../data/driverProfiles"

function getProfileImage(image: string) {
  return image.replace("/drivers/", "/drivers/profiles/")
}

export default function DriverProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Dados do piloto (banco de dados)
  const getDriver = useDriverStore((s) => s.getDriverById)
  const getTeam = useDriverStore((s) => s.getTeamById)
  const driver = getDriver(id || "")
  const team = driver ? getTeam(driver.teamId) : null

  // Dados da temporada atual (simulação)
  const seasonStats = useStandingsStore((s) => 
    s.driverStandings.find((standing) => standing.driverId === id)
  )
  const profile = id ? driverProfiles[id] : undefined

  if (!driver) return <div className="p-20 text-center text-muted">Piloto não encontrado.</div>

  // A MÁGICA DA MATEMÁTICA: Base histórica + Temporada 2026
  const totalWins = driver.baseWins + (seasonStats?.wins || 0)
  const totalPodiums = driver.basePodiums + (seasonStats?.podiums || 0)

  // Gráfico Fictício (Futuramente podemos plugar os resultados reais das corridas aqui)
  const chartData = [
    { season: "2025", points: driverPoints2025[driver.id] || 0 },
    { season: "2026", points: seasonStats?.points || 0 },
  ]

  return (
    <div className="max-w-6xl mx-auto p-12 space-y-8">
      <button
        type="button"
        onClick={() => (location.key ? navigate(-1) : navigate("/drivers"))}
        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Voltar para Pilotos
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CARD PRINCIPAL (Foto e Infos Básicas) */}
        <GlassPanel className="p-10 lg:col-span-1 flex flex-col items-center text-center relative overflow-hidden group border-t-4" style={{ borderTopColor: team?.color }}>
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: `radial-gradient(circle at top, ${team?.color}, transparent 70%)`}} />
          
          <img src={getProfileImage(driver.image)} className="w-full h-[420px] mb-6 border border-white/10 object-contain z-10 shadow-2xl bg-[#111]" alt={driver.lastName} />
          
          <div className="z-10">
            <p className="text-xl text-muted font-normal">{driver.firstName}</p>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 font-display">{driver.lastName}</h1>
            <Link
              to={team ? `/teams/${team.id}` : "/teams"}
              className="text-sm font-bold uppercase tracking-widest px-4 py-1 rounded-full border inline-block hover:opacity-90 transition-opacity"
              style={{ color: team?.color, borderColor: `${team?.color}40`, backgroundColor: `${team?.color}10` }}
            >
              {team?.name}
            </Link>
            <button
              type="button"
              onClick={() => navigate(`/teams/${team?.id ?? driver.teamId}`)}
              className="relative z-30 pointer-events-auto mt-4 inline-flex items-center justify-center rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
              style={{
                color: team?.color,
                borderColor: `${team?.color}55`,
                backgroundColor: `${team?.color}10`,
              }}
            >
              Ver equipe
            </button>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-white/5 z-10">
            <div>
              <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Nacionalidade</p>
              <p className="font-bold text-sm flex items-center gap-2">
                {getCountryFlagUrl(driver.nationality) && (
                  <img src={getCountryFlagUrl(driver.nationality)} alt="" className="w-5 h-3 object-cover rounded-[2px]" />
                )}
                <span>{driver.nationality}</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Nascimento</p>
              <p className="font-bold text-sm">{driver.dateOfBirth}</p>
            </div>
          </div>

          {profile?.bio && (
            <div className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left z-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Mini biografia</p>
              <p className="text-sm leading-relaxed text-muted">{profile.bio}</p>
            </div>
          )}

          {profile?.history?.length ? (
            <div className="mt-4 w-full text-left z-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-3">Histórico de carreira</p>
              <div className="flex flex-wrap gap-2">
                {profile.history.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

        </GlassPanel>

        {/* ESTATÍSTICAS E GRÁFICO */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Cards de Stats na Carreira */}
          <div className="grid grid-cols-3 gap-4">
            <GlassPanel className="p-6 flex flex-col items-center justify-center text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mb-2 opacity-80" />
              <p className="text-4xl font-black">{driver.championships}</p>
              <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Títulos Mundiais</p>
            </GlassPanel>
            
            <GlassPanel className="p-6 flex flex-col items-center justify-center text-center">
              <Flag className="w-8 h-8 text-primary mb-2 opacity-80" />
              <p className="text-4xl font-black">{totalWins}</p>
              <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Vitórias na Carreira</p>
            </GlassPanel>
            
            <GlassPanel className="p-6 flex flex-col items-center justify-center text-center">
              <Medal className="w-8 h-8 text-gray-300 mb-2 opacity-80" />
              <p className="text-4xl font-black">{totalPodiums}</p>
              <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Pódios Totais</p>
            </GlassPanel>
          </div>

          {/* Temporada 2026 (Se tiver dados) */}
          <GlassPanel className="p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Desempenho: Temporada 2026</h2>
            <div className="flex items-center gap-12">
              <div>
                <p className="text-5xl font-black text-white">{seasonStats?.points || 0}</p>
                <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Pontos Atuais</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div>
                <p className="text-2xl font-bold">{seasonStats?.position || "-"}</p>
                <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Posição no Mundial</p>
              </div>
            </div>
          </GlassPanel>

          {/* Gráfico */}
          <GlassPanel className="p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6">Comparativo de Pontos</h2>
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <XAxis dataKey="season" stroke="#555" tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis stroke="#555" tick={{ fill: '#888', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="points" stroke={team?.color || "#e10600"} strokeWidth={3} dot={{ r: 4, fill: '#111', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}
