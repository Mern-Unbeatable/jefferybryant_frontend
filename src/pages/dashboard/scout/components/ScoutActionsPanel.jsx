import { useTranslation } from "react-i18next";
import { FiCheck, FiChevronRight, FiEye, FiFlag, FiInfo, FiStar } from "react-icons/fi";

const base = "scoutDashboard.actions";

const SCOUT_ACTIONS = [
  { key: "continueMonitoring", icon: FiStar },
  { key: "requestInformation", icon: FiInfo },
  { key: "furtherEvaluation", icon: FiEye },
  { key: "passOnPlayer", icon: FiFlag, danger: true },
];

const ScoutActionsPanel = ({ isWatched, feedback, onAction }) => {
  const { t } = useTranslation();

  return (
    <section className="rounded-lg border border-white/10 bg-white/3 p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{t(`${base}.eyebrow`)}</p>
      <h2 className="mt-1.5 font-ethnocentric text-sm uppercase leading-snug">{t(`${base}.title`)}</h2>
      <p className="mt-2 text-[10px] text-white/45">{t(`${base}.text`)}</p>

      {feedback && (
        <p role="status" className="mt-4 flex items-center gap-2 rounded-sm border border-accent/30 bg-accent/10 p-2.5 text-[10px] text-accent">
          <FiCheck className="shrink-0" /> {feedback}
        </p>
      )}

      <ul className="mt-4 flex flex-col">
        {SCOUT_ACTIONS.map(({ key, icon, danger }) => {
          const Icon = icon;
          const label = key === "continueMonitoring" && isWatched ? "monitoring" : key;
          return (
            <li key={key} className="border-t border-white/10">
              <button type="button" onClick={() => onAction(key)} className="group flex w-full items-center gap-3 py-3 text-left">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm ${
                    danger ? "bg-red-500/10 text-red-400" : "bg-accent/10 text-accent"
                  }`}
                >
                  <Icon className={label === "monitoring" ? "fill-current" : ""} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px]">{t(`${base}.${label}.label`)}</span>
                  <span className="block text-[9px] text-white/40">{t(`${base}.${label}.hint`)}</span>
                </span>
                <FiChevronRight className="text-white/30 transition group-hover:text-white" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ScoutActionsPanel;
