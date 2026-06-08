import { createHashRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "./layouts/MainLayout";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const CalendarPage = lazy(() => import("./pages/Calendar/CalendarPage"));
const StandingsPage = lazy(() => import("./pages/Standings/StandingsPage"));
const DriversPage = lazy(() => import("./pages/Drivers/DriversPage"));
const RacesPage = lazy(() => import("./pages/Races/RacesPage"));
const DriverProfilePage = lazy(() => import("./pages/Drivers/DriverProfilePage"));
const PrincipalsPage = lazy(() => import("./pages/Principals/PrincipalsPage"));
const PrincipalProfilePage = lazy(() => import("./pages/Principals/PrincipalProfilePage"));
const TeamsPage = lazy(() => import("./pages/Teams/TeamsPage"));
const TeamProfilePage = lazy(() => import("./pages/Teams/TeamProfilePage"));

export const router = createHashRouter([
  { path: "/", element: <MainLayout><HomePage /></MainLayout> },
  { path: "/calendar", element: <MainLayout><CalendarPage /></MainLayout> },
  { path: "/standings", element: <MainLayout><StandingsPage /></MainLayout> },
  { path: "/drivers", element: <MainLayout><DriversPage /></MainLayout> },
  { path: "/drivers/:id", element: <MainLayout><DriverProfilePage /></MainLayout> },
  { path: "/races", element: <MainLayout><RacesPage /></MainLayout> },
  { path: "/principals", element: <MainLayout><PrincipalsPage /></MainLayout> },
  { path: "/principals/:id", element: <MainLayout><PrincipalProfilePage /></MainLayout> },
  { path: "/teams", element: <MainLayout><TeamsPage /></MainLayout> },
  { path: "/teams/:id", element: <MainLayout><TeamProfilePage /></MainLayout> },
]);
