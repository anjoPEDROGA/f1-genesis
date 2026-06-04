import { useNavigate } from "react-router-dom"
import type { Driver } from "../../types/Driver"
import { teams } from "../../data/teams"
import { getCountryFlagUrl } from "../../utils/flags"

type Props = {
  driver: Driver
}

function getThumbImage(image: string) {
  return image.replace("/drivers/", "/drivers/thumbs/")
}

export default function DriverCard({ driver }: Props) {
  const navigate = useNavigate()
  const team = teams.find(t => t.id === driver.teamId)

  return (
    <div
      onClick={() => navigate(`/drivers/${driver.id}`)}
      className="relative overflow-hidden rounded-panel border border-white/10 bg-white/5 backdrop-blur-md p-6 group cursor-pointer transition-all hover:border-white/30 hover:-translate-y-1"
    >
      {/* Fundo com a cor da equipe */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
        style={{
          background: `radial-gradient(circle at top right, ${team?.color}55, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-[#111]">
            <img src={getThumbImage(driver.image)} alt={driver.lastName} className="w-full h-full object-cover" />
          </div>

          {team?.logo && (
            <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
          )}
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-muted flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: team?.color || '#ffffff' }} />
          {team?.name}
        </p>

        <h3 className="mt-4 text-3xl font-black uppercase font-display group-hover:text-white transition-colors">
          {driver.lastName}
        </h3>

        <p className="mt-1 text-muted">{driver.firstName}</p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            navigate(`/teams/${driver.teamId}`)
          }}
          className="mt-3 inline-flex items-center rounded-full border px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
          style={{
            color: team?.color,
            borderColor: `${team?.color}55`,
            backgroundColor: `${team?.color}10`,
          }}
        >
          {team?.name}
        </button>

        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted flex items-center gap-2">
          {getCountryFlagUrl(driver.nationality) && (
            <img src={getCountryFlagUrl(driver.nationality)} alt="" className="w-4 h-3 object-cover rounded-[2px]" />
          )}
          <span>{driver.nationality}</span>
        </p>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-5xl font-black text-white/20 group-hover:text-white/40 transition-colors">
            {driver.number}
          </span>
          <span className="text-sm uppercase tracking-[0.3em] text-muted font-bold">
            {driver.code}
          </span>
        </div>
      </div>
    </div>
  )
}
