import { useEffect, useState } from "react";
import GlassPanel from "../ui/GlassPanel";
import { APP_VERSION, GITHUB_RELEASES_URL, GITHUB_REPO } from "../../config/appInfo";

type ReleaseInfo = {
  tag_name: string;
  html_url: string;
  name?: string;
};

function normalizeVersion(value: string) {
  return value.trim().replace(/^v/i, "");
}

function compareVersions(a: string, b: string) {
  const pa = normalizeVersion(a).split(".").map(Number);
  const pb = normalizeVersion(b).split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i += 1) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export default function UpdateBanner() {
  const [latest, setLatest] = useState<ReleaseInfo | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem("f1-genesis-update-dismissed");
    if (cached === APP_VERSION) {
      setDismissed(true);
      return;
    }

    let cancelled = false;
    async function check() {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
        if (!response.ok) return;
        const data = (await response.json()) as ReleaseInfo;
        if (!cancelled && compareVersions(data.tag_name, APP_VERSION) > 0) {
          setLatest(data);
        }
      } catch {
        // Silencioso: se o GitHub ficar indisponível, o app segue normal.
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!latest || dismissed) return null;

  return (
    <div className="fixed right-5 bottom-[155px] z-[90] w-[340px] max-w-[calc(100vw-2rem)]">
      <GlassPanel className="p-4 border border-primary/20 bg-[#0b0b0b]/90">
        <p className="text-[9px] uppercase tracking-[0.35em] text-primary font-bold mb-2">
          Atualização disponível
        </p>
        <h4 className="text-lg font-black uppercase tracking-tight">
          {latest.name || latest.tag_name}
        </h4>
        <p className="mt-2 text-xs text-muted leading-relaxed">
          Uma nova versão do F1 Genesis está disponível. A versão instalada é {APP_VERSION}.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => window.open(latest.html_url || GITHUB_RELEASES_URL, "_blank", "noopener,noreferrer")}
            className="flex-1 rounded-xl bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:brightness-110"
          >
            Abrir release
          </button>
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("f1-genesis-update-dismissed", APP_VERSION);
              setDismissed(true);
            }}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted transition-colors hover:bg-white/10 hover:text-white"
          >
            Agora não
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
