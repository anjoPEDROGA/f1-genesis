import StatCard from "../cards/StatCard"
import { useRaceStore } from "../../store/useRaceStore"
import { useDriverStore } from "../../store/useDriverStore"

export default function StatsGrid() {
  const races = useRaceStore((s) => s.races);
  const nextRace = useRaceStore((s) => s.getNextRace());
  const drivers = useDriverStore((s) => s.drivers);
  const teams = useDriverStore((s) => s.teams);

  // Pega as 3 primeiras letras do país (ex: Mônaco -> MON)
  const getCountryCode = (countryName: string) => {
    return countryName.substring(0, 3).toUpperCase();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        label="Etapas"
        value={races.length.toString()}
        extra="Calendário completo do campeonato"
      />

      <StatCard
        label="Pilotos"
        value={drivers.length.toString()}
        extra="Lista ativa atual"
      />

      <StatCard
        label="Equipes"
        value={teams.length.toString()}
        extra="Campeonato de construtores"
      />

      <StatCard
        label="Próxima Corrida"
        value={nextRace ? getCountryCode(nextRace.country) : "FIM"}
        extra={nextRace ? nextRace.name : "Temporada Encerrada"}
      />
    </div>
  )
}