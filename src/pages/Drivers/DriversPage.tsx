import { useMemo, useState } from "react"
import SectionTitle from "../../components/ui/SectionTitle"
import DriversGrid from "../../components/drivers/DriversGrid"
import { drivers } from "../../data/drivers"

export default function DriversPage() {
  const [query, setQuery] = useState("")
  const filteredDrivers = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return drivers
    return drivers.filter((driver) =>
      [driver.firstName, driver.lastName, driver.teamId, driver.nationality]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
  }, [query])

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        px-6
        py-12
        space-y-10
      "
    >
      <SectionTitle
        eyebrow="Drivers"
        title="Full Driver Lineup"
        subtitle="Complete list of current Formula 1 drivers."
      />

      <div className="max-w-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar piloto, equipe ou nacionalidade..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-muted focus:border-primary"
        />
      </div>

      <DriversGrid items={filteredDrivers} />
    </section>
  )
}
