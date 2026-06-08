import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GenesisLogo from "../branding/GenesisLogo";

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      window.setTimeout(onFinish, 450);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#040404]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,90,31,0.18),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_35%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.05, type: "spring", stiffness: 130, damping: 16 }}
            className="mb-8 w-[420px] max-w-[88vw]"
          >
              <GenesisLogo variant="splash" className="w-full" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-[-0.08em] font-display"
            >
              F1 GENESIS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.35 }}
              className="mt-4 text-xs md:text-sm uppercase tracking-[0.45em] text-muted"
            >
              Inicializando telemetria
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
