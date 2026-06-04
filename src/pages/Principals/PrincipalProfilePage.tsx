import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GlassPanel from "../../components/ui/GlassPanel";
import { getPrincipalByTeamId } from "../../data/principals";
import { getCountryFlagUrl } from "../../utils/flags";
import { teams } from "../../data/teams";

export default function PrincipalProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const principal = id ? getPrincipalByTeamId(id) : undefined;
  const team = teams.find((item) => item.id === id);

  if (!principal) return <div className="p-20 text-center text-muted">Chefe não encontrado.</div>;

  return (
    <div className="max-w-5xl mx-auto p-12 space-y-8">
      <button
        type="button"
        onClick={() => (location.key ? navigate(-1) : navigate("/principals"))}
        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
      </button>

      <GlassPanel className="p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img src={principal.image} alt={principal.name} className="w-48 h-48 rounded-full object-cover border border-white/10" />
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">{principal.team}</p>
            <h1 className="text-4xl font-black font-display mt-2">{principal.name}</h1>
            <p className="text-muted mt-2 flex items-center gap-2">
              {getCountryFlagUrl(principal.nationality) && (
                <img src={getCountryFlagUrl(principal.nationality)} alt="" className="w-5 h-3 object-cover rounded-[2px]" />
              )}
              <span>{principal.nationality}</span>
              <span>• {principal.birth} • {principal.age}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/teams/${principal.teamId}`)}
            className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
            style={{
              color: team?.color,
              borderColor: `${team?.color}55`,
              backgroundColor: `${team?.color}10`,
            }}
          >
            {team?.logo && <img src={team.logo} alt={principal.team} className="w-4 h-4 object-contain" />}
            Ver equipe
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principal.titles.map((title) => (
              <div key={title} className="rounded-2xl bg-white/5 border border-white/5 p-4">
                <p className="text-sm">{title}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-3">Histórico de Equipes</p>
            <div className="flex flex-wrap gap-2">
              {principal.history.map((item) => (
                <span key={item} className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
