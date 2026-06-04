import { forwardRef, useRef } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  interactive?: boolean;
};

const MAX_TILT = 7;

const GlassPanel = forwardRef<HTMLDivElement, Props>(function GlassPanel(
  { children, className = "", style, interactive = true, ...rest },
  forwardedRef
) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    innerRef.current = node;

    if (typeof forwardedRef === "function") {
      forwardedRef(node);
    } else if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  const updateTilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !innerRef.current) return;

    const rect = innerRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * (MAX_TILT * 2);
    const rx = (0.5 - py) * (MAX_TILT * 2);

    innerRef.current.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
    innerRef.current.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
    innerRef.current.style.setProperty("--glow-x", `${(px * 100).toFixed(1)}%`);
    innerRef.current.style.setProperty("--glow-y", `${(py * 100).toFixed(1)}%`);
  };

  const resetTilt = () => {
    if (!interactive || !innerRef.current) return;
    innerRef.current.style.setProperty("--tilt-x", "0deg");
    innerRef.current.style.setProperty("--tilt-y", "0deg");
    innerRef.current.style.setProperty("--glow-x", "50%");
    innerRef.current.style.setProperty("--glow-y", "30%");
  };

  return (
    <div
      ref={setRefs}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
      className={`group relative isolate rounded-panel transition-transform duration-300 will-change-transform ${className}`}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        transform:
          "translateY(0px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
        boxShadow:
          "0 1px 1px rgba(255,255,255,0.04), 0 18px 42px rgba(0,0,0,0.42), 0 2px 8px rgba(0,0,0,0.28)",
        ...style,
      }}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-panel opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 30%), rgba(255,255,255,0.12), transparent 38%), linear-gradient(135deg, rgba(255,255,255,0.08), transparent 40%)",
          transform: "translateZ(10px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-panel opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), transparent 35%, rgba(255,255,255,0.02))",
          transform: "translateZ(5px)",
        }}
      />
      <div
        className="relative z-10 h-full w-full"
        style={{ transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </div>
  );
});

export default GlassPanel;
