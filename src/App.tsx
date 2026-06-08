import { RouterProvider } from "react-router-dom"
import { Suspense, useState } from "react"
import { router } from "./router"

import "./styles/globals.css"
import SplashScreen from "./components/startup/SplashScreen"

function App() {
  const [ready, setReady] = useState(() => sessionStorage.getItem("f1-genesis-splash") === "done")

  return (
    <>
      <Suspense
        fallback={
          <div className="fixed inset-0 z-[250] flex items-center justify-center bg-[#040404] text-white">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-white/10 border-t-primary animate-spin" />
              <p className="text-xs uppercase tracking-[0.35em] text-muted">Carregando telemetria</p>
            </div>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
      {!ready && (
        <SplashScreen
          onFinish={() => {
            sessionStorage.setItem("f1-genesis-splash", "done")
            setReady(true)
          }}
        />
      )}
    </>
  )
}

export default App
