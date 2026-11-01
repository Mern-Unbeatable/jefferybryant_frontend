import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import { COACH_STATS } from "@/pages/dashboard/coach/coachData";

const base = "coachDashboard.overview";
const coachPath = (path) => `/dashboard/coach/${path}`;

const CoachStatsGrid = () => {
  const { t } = useTranslation();

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {COACH_STATS.map(({ key, value, icon }) => {
        const Icon = icon;
        return (
          <Link
            key={key}
            to={coachPath("my-players")}
            className={`${cardClass} group flex items-start gap-3 transition hover:border-white/25`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-btn-primary/10 text-btn-primary">
              <Icon />
            </span>
            <span className="flex-1">
              <span className="block text-sm uppercase tracking-[0.15em] text-white/50">
                {t(`${base}.stats.${key}`)}
              </span>
              <span className="mt-1 block font-ethnocentric text-2xl">{value}</span>
            </span>
            <FiChevronRight className="text-white/30 transition group-hover:text-white" />
          </Link>
        );
      })}
    </section>
  );
};

export default CoachStatsGrid;

