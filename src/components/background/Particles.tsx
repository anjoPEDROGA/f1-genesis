export default function Particles() {
  return (
    <div
      className="
        fixed
        inset-0
        overflow-hidden
        pointer-events-none
        z-0
      "
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="
            absolute
            rounded-full
            bg-white/5
            animate-pulse
          "
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 4 + 2}s`,
          }}
        />
      ))}
    </div>
  )
}