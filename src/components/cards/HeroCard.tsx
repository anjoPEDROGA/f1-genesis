import { useNavigate } from "react-router-dom";

export default function HeroCard() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-panel border border-white/10 bg-white/5 backdrop-blur-md p-10 md:p-16">
      <div className="relative z-10">
        <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4 font-bold">Temporada 2026</p>
        <h2 className="text-5xl md:text-6xl font-black leading-none max-w-3xl tracking-tighter">
          Formula One<br/>Championship Manager
        </h2>
        <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
          Acompanhe finais de semana de corrida, classificação, sessões, previsões e a progressão completa do campeonato em uma interface cinematográfica.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <button 
            onClick={() => navigate('/calendar')}
            className="px-8 py-4 rounded-2xl bg-red-600 shadow-lg shadow-red-900/20 font-black text-white uppercase tracking-widest text-xs transition-all hover:bg-red-700 hover:scale-105 active:scale-95"
          >
            Abrir Calendário
          </button>
          
          <button 
            onClick={() => navigate('/standings')}
            className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-black text-white uppercase tracking-widest text-xs transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
          >
            Ver Classificação
          </button>
        </div>
      </div>

      {/* Brilho decorativo no fundo do card */}
      <div className="absolute -right-20 -top-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}