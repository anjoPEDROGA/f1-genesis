export default function BackgroundGlow() {
  return (
    <>
      <div
        className="
          fixed
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          rounded-full
          blur-3xl
          opacity-20
          bg-primary
          layer-glow
          pointer-events-none
        "
      />

      <div
        className="
          fixed
          bottom-[-250px]
          right-[-250px]
          w-[600px]
          h-[600px]
          rounded-full
          blur-3xl
          opacity-10
          bg-red-500
          layer-glow
          pointer-events-none
        "
      />
    </>
  )
}