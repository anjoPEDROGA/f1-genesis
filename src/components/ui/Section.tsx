type Props = {
  children: React.ReactNode
  className?: string
}

export default function Section({
  children,
  className = "",
}: Props) {
  return (
    <section className={`space-y-6 ${className}`}>
      {children}
    </section>
  )
}