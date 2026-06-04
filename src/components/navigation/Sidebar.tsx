import { Link, useLocation } from "react-router-dom";
import { Download, Upload } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { label: "Visão Geral", path: "/" },
  { label: "Calendário", path: "/calendar" },
  { label: "Equipes", path: "/teams" },
  { label: "Pilotos", path: "/drivers" },
  { label: "Corridas", path: "/races" },
  { label: "Chefes", path: "/principals" },
  { label: "Classificação", path: "/standings" },
];

export default function Sidebar() {
  const location = useLocation();

  const handleExport = () => {
    const data = {
      standings: localStorage.getItem("f1-manager-standings"),
      races: localStorage.getItem("f1-manager-races"),
    };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "f1-manager-save-2026.json";
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.standings) localStorage.setItem("f1-manager-standings", data.standings);
        if (data.races) localStorage.setItem("f1-manager-races", data.races);
        window.location.reload();
      } catch {
        alert("Erro ao importar o save. Arquivo inválido.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-white/10 bg-black/40 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
      <div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="flex items-center gap-3"
          >
            <img src="/f1-genesis-logo.svg" alt="F1 Genesis" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-3xl font-black tracking-tight font-display">Genesis</h1>
              <p className="text-xs uppercase tracking-[0.4em] text-muted mt-2 font-display">F1 Manager</p>
            </div>
          </motion.div>
        </div>

        <nav className="mt-12 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                relative overflow-hidden px-4 py-3 rounded-2xl border transition-all duration-300
                ${location.pathname === link.path ? "border-primary/40 bg-primary/15 shadow-glow" : "border-white/5 bg-white/5 hover:bg-white/10"}
              `}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 rounded-full transition-all ${
                  location.pathname === link.path ? "bg-primary" : "bg-transparent"
                }`}
              />
              <span className="font-display uppercase tracking-[0.18em] text-xs">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleExport}
            title="Exportar Save"
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-[10px] text-muted uppercase tracking-widest font-bold"
          >
            <Download className="w-4 h-4" /> Exportar Backup
          </button>

          <label
            title="Importar Save"
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-[10px] text-muted uppercase tracking-widest font-bold cursor-pointer"
          >
            <Upload className="w-4 h-4" /> Importar Backup
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-display">Temporada</p>
          <h3 className="mt-2 text-3xl font-black font-display">2026</h3>
        </div>
      </div>
    </aside>
  );
}
