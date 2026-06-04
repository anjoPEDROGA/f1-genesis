type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p
          className="
            uppercase
            tracking-[0.4em]
            text-xs
            text-primary
            mb-3
          "
        >
          {eyebrow}
        </p>
      )}

      <h2
        className="
          text-4xl
          font-black
          tracking-tight
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            mt-3
            text-muted
            max-w-2xl
            leading-relaxed
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}