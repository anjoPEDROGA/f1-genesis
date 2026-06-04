export default function GridLines() {
  return (
    <div
      className="
        fixed
        inset-0
        pointer-events-none
        opacity-[0.03]
        z-0
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />
    </div>
  )
}