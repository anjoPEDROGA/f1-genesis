import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/ui/SectionTitle";
import { principals } from "../../data/principals";
import { teams } from "../../data/teams";
import { getCountryFlagUrl } from "../../utils/flags";

export default function PrincipalsPage() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      <SectionTitle
        eyebrow="Chefes"
        title="Team Principals"
        subtitle="Perfis, histórico e conquistas dos líderes de cada equipe."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {principals.map((principal) => {
          const team = teams.find((item) => item.id === principal.teamId);

          return (
            <div
              key={principal.teamId}
              onClick={() => navigate(`/principals/${principal.teamId}`)}
              className="text-left relative overflow-hidden rounded-panel border border-white/10 bg-white/5 backdrop-blur-md p-6 group cursor-pointer transition-all hover:border-white/30 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative z-10 flex items-center gap-4">
                <img
                  src={principal.image}
                  alt={principal.name}
                  className="w-20 h-20 rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted">{principal.team}</p>
                  <h3 className="text-2xl font-black font-display">{principal.name}</h3>
                  <p className="text-sm text-muted mt-1 flex items-center gap-2">
                    {getCountryFlagUrl(principal.nationality) && (
                      <img src={getCountryFlagUrl(principal.nationality)} alt="" className="w-4 h-3 object-cover rounded-[2px]" />
                    )}
                    <span>{principal.nationality}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/teams/${principal.teamId}`);
                }}
                className="relative z-10 mt-5 flex items-center gap-3 text-left"
              >
                <img
                  src={team?.logo}
                  alt={principal.team}
                  className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary">Abrir equipe</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
