import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import { PLAYER_SUMMARY, REGISTRATION_PROGRESS } from "@/pages/dashboard/coach/coachData";

const base = "coachDashboard.overview";
const coachPath = (path) => `/dashboard/coach/${path}`;

const RegistrationProgressCard = () => {
  const { t } = useTranslation();
  const maxProgress = Math.max(...REGISTRATION_PROGRESS.map((item) => item.value));
  const completionRate = Math.round((PLAYER_SUMMARY.complete / PLAYER_SUMMARY.registered) * 100);

  return (
    <section className={`${cardClass} xl:col-span-2`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <CardHeading eyebrow={t(`${base}.progressEyebrow`)} title={t(`${base}.progressTitle`)} />
        <Link to={coachPath("my-players")} className="flex items-center gap-1.5 text-[10px] text-btn-primary hover:underline">
          {t(`${base}.viewActivity`)} <FiArrowRight />
        </Link>
      </div>
      <ol className="mt-6 flex flex-col">
        {REGISTRATION_PROGRESS.map(({ key, value }, index) => (
          <li key={key} className="flex items-center gap-4 border-b border-white/5 py-3 last:border-b-0">
            <span className="w-5 text-[10px] text-white/40">{String(index + 1).padStart(2, "0")}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between text-[11px]">
                <span>{t(`${base}.progress.${key}`)}</span>
                <span className="font-ethnocentric text-accent">{value}</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-accent" style={{ width: `${(value / maxProgress) * 100}%` }} />
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 flex items-center gap-2 text-[10px] text-white/50">
        <FiCheck className="text-green-400" /> {t(`${base}.completionRate`, { percent: completionRate })}
      </p>
    </section>
  );
};

export default RegistrationProgressCard;

