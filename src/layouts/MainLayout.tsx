import { AnimatePresence, motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import BackgroundGlow from "../components/background/BackgroundGlow"
import Header from "../components/navigation/Header"
import Sidebar from "../components/navigation/Sidebar"
import FloatingCountdown from "../components/telemetry/FloatingCountdown"
import UpdateBanner from "../components/updates/UpdateBanner"

type Props = {
  children: React.ReactNode
}

export default function MainLayout({
  children,
}: Props) {
  const location = useLocation()

  return (
    <main
      className="
        min-h-screen
        bg-bg
        text-text
        relative
        overflow-hidden
      "
    >
      <BackgroundGlow />

      <Sidebar />
      <FloatingCountdown />
      <UpdateBanner />

      {/* Margem à esquerda para não sobrepor a Sidebar de 260px */}
      <div className="ml-[260px] relative layer-ui min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
