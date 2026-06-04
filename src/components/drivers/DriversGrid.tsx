import DriverCard from "./DriverCard"
import { drivers } from "../../data/drivers"

type Props = {
  items?: typeof drivers
}

export default function DriversGrid({ items = drivers }: Props) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {items.map(driver => (
        <DriverCard
          key={driver.id}
          driver={driver}
        />
      ))}
    </div>
  )
}
