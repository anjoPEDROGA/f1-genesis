import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.1 }}
              className="mb-6 h-32 w-32 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden"
            >
              <img
                src="/f1-genesis-logo.svg"
                alt="F1 Genesis"
                className="h-full w-full object-contain p-4"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter"
            >
              F1 Genesis
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mt-3 text-xs uppercase tracking-[0.35em] text-muted"
            >
              Inicializando telemetria
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
