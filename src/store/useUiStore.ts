import { create } from "zustand"

type UiStore = {
  sidebarOpen: boolean
  toggleSidebar: () => void
  
  currentView: "grid" | "list"
  setView: (view: "grid" | "list") => void
  
  showRaceResults: boolean
  setShowRaceResults: (show: boolean) => void
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen 
  })),

  currentView: "grid",
  setView: (view) => set({ currentView: view }),

  showRaceResults: false,
  setShowRaceResults: (show) => set({ showRaceResults: show }),
}))