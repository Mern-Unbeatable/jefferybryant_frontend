import { useTranslation } from "react-i18next";
import { FiCheckCircle, FiCopy, FiDownload, FiLink } from "react-icons/fi";
import { LuQrCode, LuShieldCheck } from "react-icons/lu";

const checks = ["unique", "share", "connected"];
const base = "coaches.invitation";

const AcademyInvitationSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t(`${base}.eyebrow`)}
          </p>
          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t(`${base}.titleLine1`)}</span>
            <span className="block">{t(`${base}.titleLine2`)}</span>
            <span className="block text-accent">{t(`${base}.titleHighlight`)}</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/80">
            {t(`${base}.description`)}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {checks.map((key) => (
              <li key={key} className="flex items-center gap-3 text-xs text-white/80">
                <FiCheckCircle className="shrink-0 text-btn-primary" />
                {t(`${base}.checks.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/3 p-5 shadow-2xl shadow-black/40 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm">{t(`${base}.card.title`)}</p>
            <span className="text-[10px] uppercase tracking-wide text-btn-primary">
              {t(`${base}.card.preview`)}
            </span>
          </div>

          <p className="mt-5 text-[11px] text-white/60">{t(`${base}.card.academyLabel`)}</p>
          <div className="mt-2 flex items-center justify-between gap-3 rounded-sm border border-white/10 bg-primary px-3 py-2.5 text-xs">
            <span className="truncate">Kingston Youth Football Academy</span>
            <LuShieldCheck className="shrink-0 text-white/50" />
          </div>

          <p className="mt-4 text-[11px] text-white/60">{t(`${base}.card.linkLabel`)}</p>
          <div className="mt-2 flex items-center justify-between gap-3 rounded-sm border border-white/10 bg-primary px-3 py-2.5 font-mono text-xs text-white/80">
            <span className="truncate">cfit.example / invite / kingston-academy</span>
            <FiLink className="shrink-0 text-white/50" />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[2fr_3fr]">
            <div className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-sm bg-white text-primary">
              <LuQrCode className="text-3xl" />
              <span className="text-[9px] uppercase tracking-wide">
                {t(`${base}.card.qrPreview`)}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-sm bg-btn-primary px-4 py-2.5 text-xs text-primary transition hover:bg-btn-primary/90"
              >
                <FiCopy /> {t(`${base}.card.copy`)}
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-sm border border-white/10 bg-primary px-4 py-2.5 text-xs transition hover:border-white/40"
              >
                <FiDownload /> {t(`${base}.card.download`)}
              </button>
              <p className="text-[10px] text-white/40">{t(`${base}.card.note`)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyInvitationSection;
