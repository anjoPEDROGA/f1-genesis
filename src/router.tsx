import { createHashRouter } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/Home/HomePage"
import CalendarPage from "./pages/Calendar/CalendarPage"
import StandingsPage from "./pages/Standings/StandingsPage"
import DriversPage from "./pages/Drivers/DriversPage"
import RacesPage from "./pages/Races/RacesPage"
import DriverProfilePage from "./pages/Drivers/DriverProfilePage"
import PrincipalsPage from "./pages/Principals/PrincipalsPage"
import PrincipalProfilePage from "./pages/Principals/PrincipalProfilePage"

// Importações das páginas de Equipes (A lista e o perfil individual)
import TeamsPage from "./pages/Teams/TeamsPage" 
import TeamProfilePage from "./pages/Teams/TeamProfilePage" 

export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: "/calendar",
    element: <MainLayout><CalendarPage /></MainLayout>,
  },
  {
    path: "/standings",
    element: <MainLayout><StandingsPage /></MainLayout>,
  },
  {
    path: "/drivers",
    element: <MainLayout><DriversPage /></MainLayout>,
  },
  {
    path: "/drivers/:id",
    element: <MainLayout><DriverProfilePage /></MainLayout>,
  },
  {
    path: "/races",
    element: <MainLayout><RacesPage /></MainLayout>,
  },
  {
    path: "/principals",
    element: <MainLayout><PrincipalsPage /></MainLayout>,
  },
  {
    path: "/principals/:id",
    element: <MainLayout><PrincipalProfilePage /></MainLayout>,
  },
  
  // A rota que mostra a grade com todas as 10 equipes
  {
    path: "/teams",
    element: <MainLayout><TeamsPage /></MainLayout>, 
  },
  
  // A rota que mostra os detalhes de uma equipe específica
  {
    path: "/teams/:id",
    element: <MainLayout><TeamProfilePage /></MainLayout>, 
  },
])
