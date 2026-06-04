import { useStandingsStore } from "../../store/useStandingsStore"
import { useDriverStore } from "../../store/useDriverStore"
import GlassPanel from "../ui/GlassPanel"

export default function StandingsGrid() {
  const standings = useStandingsStore((s) => s.driverStandings) || [];
  const drivers = useDriverStore((state) => state.drivers)

  if (standings.length === 0) {
    return (
      <GlassPanel className="p-10 text-center flex flex-col items-center justify-center border-dashed border-white/20">
        <p className="text-muted mb-2">O campeonato ainda não começou.</p>
        <p className="text-sm text-primary">Simule uma corrida para gerar a classificação.</p>
      </GlassPanel>
    )
  }

  return (
    <GlassPanel className="p-6">
      <div className="space-y-4">
        {standings
          .sort((a, b) => a.position - b.position)
          .slice(0, 10)
          .map((standing) => {
            const driver = drivers.find((d) => d.id === standing.driverId)
            
            return (
              <div
                key={standing.driverId}
                className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-5">
                  <span className="text-2xl font-black text-white/20 w-6 text-center">
                    {standing.position}
                  </span>
                  <div>
                    <p className="font-bold text-lg leading-none mb-1 font-display uppercase">
                      <span className="text-muted font-normal mr-1">{driver?.firstName}</span>
                      {driver?.lastName}
                    </p>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      {driver?.teamId}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-black text-2xl text-primary leading-none">
                    {standing.points}
                  </p>
                  <p className="text-muted text-[10px] uppercase tracking-widest mt-1">
                    pts
                  </p>
                </div>
              </div>
            )
          })}
      </div>
    </GlassPanel>
  )
}
