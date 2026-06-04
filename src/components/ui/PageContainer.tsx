type Props = {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        max-w-7xl
        mx-auto
        px-6
        py-12
        space-y-12
        ${className}
      `}
    >
      {children}
    </div>
  )
}