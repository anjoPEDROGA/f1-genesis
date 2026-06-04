import GlassPanel from "../ui/GlassPanel"

type Props = {
  label: string
  value: string
  extra?: string
}

export default function StatCard({
  label,
  value,
  extra,
}: Props) {
  return (
    <GlassPanel
      className="
        p-6
        relative
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/5
          to-transparent
          opacity-40
        "
      />

      <div className="relative z-10">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-muted
          "
        >
          {label}
        </p>

        <h3
          className="
            mt-4
            text-4xl
            font-black
          "
        >
          {value}
        </h3>

        {extra && (
          <p
            className="
              mt-3
              text-sm
              text-muted
            "
          >
            {extra}
          </p>
        )}
      </div>
    </GlassPanel>
  )
}