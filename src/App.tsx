import { RouterProvider } from "react-router-dom"
import { useState } from "react"
import { router } from "./router"

import "./styles/globals.css"
import SplashScreen from "./components/startup/SplashScreen"

function App() {
  const [ready, setReady] = useState(() => sessionStorage.getItem("f1-genesis-splash") === "done")

  return (
    <>
      <RouterProvider router={router} />
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
