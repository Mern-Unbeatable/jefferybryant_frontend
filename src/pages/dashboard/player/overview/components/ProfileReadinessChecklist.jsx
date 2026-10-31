import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import { profileSections } from "@/pages/dashboard/player/playerData";

const base = "playerDashboard";
const playerPath = (path) => `/dashboard/player/${path}`;

/**
 * ProfileReadinessChecklist - Next steps & profile readiness checklist section
 */
const ProfileReadinessChecklist = () => {
  const { t } = useTranslation();
  const nextSteps = [...profileSections].sort((a, b) => a.complete - b.complete);

  return (
    <section className={cardClass}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <CardHeading
          eyebrow={t(`${base}.nextSteps.eyebrow`)}
          title={t(`${base}.nextSteps.title`)}
        />
        <p className="text-[10px] text-white/40">
          {t(`${base}.nextSteps.hint`)}
        </p>
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {nextSteps.map(({ key, path, icon, complete, required }) => {
          const Icon = complete ? FiCheck : icon;
          return (
            <li key={key}>
              <Link
                to={playerPath(path)}
                className="flex items-center gap-4 rounded-md border border-white/10 bg-black/20 p-4 transition hover:border-white/25"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                    complete
                      ? "bg-accent/15 text-accent"
                      : "bg-btn-primary/15 text-btn-primary"
                  }`}
                >
                  <Icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 font-ethnocentric text-[11px] uppercase">
                    {t(`${base}.sections.${key}.title`)}
                    {required && !complete && (
                      <span className="rounded-sm bg-btn-primary px-1.5 py-0.5 font-sans text-[9px] text-primary">
                        {t(`${base}.nextSteps.required`)}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[10px] text-white/50">
                    {t(`${base}.sections.${key}.text`)}
                  </span>
                </span>
                <span
                  className={`hidden rounded-full px-2.5 py-1 text-[9px] uppercase tracking-wide sm:inline ${
                    complete
                      ? "bg-accent/10 text-accent"
                      : "bg-btn-primary/10 text-btn-primary"
                  }`}
                >
                  {t(`${base}.statuses.${complete ? "complete" : "incomplete"}`)}
                </span>
                <FiChevronRight className="shrink-0 text-white/40" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ProfileReadinessChecklist;

