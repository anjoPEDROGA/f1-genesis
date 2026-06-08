import { motion } from "framer-motion";

type GenesisLogoProps = {
  variant?: "sidebar" | "splash";
  className?: string;
};

export default function GenesisLogo({ variant = "sidebar", className = "" }: GenesisLogoProps) {
  const isSplash = variant === "splash";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className={`relative ${className}`}
    >
      <div className={`relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/50 shadow-[0_20px_70px_rgba(0,0,0,0.45)] ${isSplash ? "p-5" : "p-4"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,90,31,0.22),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%)]" />
        <div className={`relative flex items-center ${isSplash ? "gap-5" : "gap-4"}`}>
          <motion.div
            initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.05 }}
            className={`relative shrink-0 ${isSplash ? "h-16 w-16" : "h-12 w-12"}`}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ffb347] via-[#ff5a1f] to-[#e10600] blur-md opacity-30" />
            <img
              src="/branding/formula-1-logo.png"
              alt="Formula 1"
              className="relative h-full w-full object-contain drop-shadow-[0_0_18px_rgba(255,77,0,0.35)]"
            />
          </motion.div>

          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className={`font-black uppercase leading-none ${isSplash ? "text-4xl md:text-6xl tracking-[-0.08em] font-display" : "text-[2rem] tracking-[-0.08em] font-display"}`}
            >
              Genesis
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.35 }}
              className={`uppercase text-muted ${isSplash ? "mt-4 text-xs md:text-sm tracking-[0.45em]" : "mt-2 text-[10px] tracking-[0.35em]"}`}
            >
              F1 Manager
            </motion.p>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.8 }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/18 to-transparent blur-sm"
        />
      </div>
    </motion.div>
  );
}
