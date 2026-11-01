import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiCheck, FiCheckCircle, FiClock, FiUser } from "react-icons/fi";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import { formatDate } from "@/utils/formatDate";
import { RECENT_ACTIVITY } from "@/pages/dashboard/coach/coachData";

const base = "coachDashboard.overview";
const coachPath = (path) => `/dashboard/coach/${path}`;

const activityIcons = {
  verified: FiCheck,
  complete: FiCheckCircle,
  submitted: FiClock,
  registered: FiUser,
};

const RecentActivityCard = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className={cardClass}>
      <div className="flex items-start justify-between gap-3">
        <CardHeading eyebrow={t(`${base}.activityEyebrow`)} title={t(`${base}.activityTitle`)} />
        <Link to={coachPath("notifications")} className="text-xs text-btn-primary hover:underline">
          {t(`${base}.viewAll`)}
        </Link>
      </div>
      <ul className="mt-5 flex flex-col">
        {RECENT_ACTIVITY.map(({ id, name, type, time, date }) => {
          const Icon = activityIcons[type];
          return (
            <li key={id} className="flex items-center gap-3 border-b border-white/5 py-3 last:border-b-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-base text-accent">
                <Icon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs sm:text-sm font-medium text-white">{name}</span>
                <span className="block text-xs text-white/50">{t(`${base}.activity.${type}`)}</span>
              </span>
              <span className="shrink-0 text-xs text-white/40">
                {date ? formatDate(date, i18n.language, { month: "short", day: "numeric" }) : t(`dashboardTime.${time}`)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RecentActivityCard;
