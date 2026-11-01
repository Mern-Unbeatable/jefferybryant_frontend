import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiEdit2 } from "react-icons/fi";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import StatusBadge from "@/pages/dashboard/coach/components/StatusBadge";
import { getInitials } from "@/utils/getInitials";
import { ORGANIZATION } from "@/pages/dashboard/coach/coachData";

const base = "coachDashboard.overview";
const coachPath = (path) => `/dashboard/coach/${path}`;

const CoachWelcomeBanner = () => {
  const { t } = useTranslation();

  return (
    <section className={`${cardClass} flex flex-col gap-5 sm:flex-row sm:items-center`}>
      <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-btn-primary font-ethnocentric text-xl text-primary">
        {getInitials(ORGANIZATION.name)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/50">{t(`${base}.eyebrow`)}</p>
        <h1 className="mt-1 font-ethnocentric text-xl uppercase sm:text-3xl">
          {t(`${base}.welcome`)} <span className="text-accent">{ORGANIZATION.shortName}</span>
        </h1>
        <p className="mt-2 text-sm text-white/60">{t(`${base}.subtitle`)}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/60">
          <span>{t(`coachDashboard.organizationTypes.${ORGANIZATION.type}`)}</span>
          <span className="text-white/20">|</span>
          <span>
            {ORGANIZATION.city}, {ORGANIZATION.country}
          </span>
          <StatusBadge status={ORGANIZATION.status}>{t("coachDashboard.statuses.approved")}</StatusBadge>
        </p>
      </div>
      <Link
        to={coachPath("invite-players")}
        className="flex shrink-0 items-center justify-center gap-2 self-start rounded-sm bg-btn-primary px-4 py-2.5 text-xs text-primary transition hover:bg-btn-primary/90 sm:self-center"
      >
        <FiEdit2 /> {t("coachDashboard.invitePlayers")}
      </Link>
    </section>
  );
};

export default CoachWelcomeBanner;

