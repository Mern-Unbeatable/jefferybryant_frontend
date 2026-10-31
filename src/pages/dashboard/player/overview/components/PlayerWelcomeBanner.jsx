import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiAlertTriangle,
  FiEdit2,
  FiInfo,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import {
  CURRENT_STATUS,
  PLAYER_ID,
  welcomeMeta,
} from "@/pages/dashboard/player/playerData";
import { getInitials } from "@/utils/getInitials";

const base = "playerDashboard";
const playerPath = (path) => `/dashboard/player/${path}`;

/**
 * PlayerWelcomeBanner - Header welcome card displaying player identity, position, status, and edit action
 *
 * @param {Function} onOpenStatusModal - Callback when status info button is clicked
 */
const PlayerWelcomeBanner = ({ onOpenStatusModal }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <section className={`${cardClass} flex flex-col gap-5 sm:flex-row sm:items-center`}>
      <div className="relative h-20 w-20 shrink-0">
        <span className="flex h-full w-full items-center justify-center rounded-md bg-linear-to-br from-accent/30 to-btn-primary/20 font-ethnocentric text-xl">
          {getInitials(user?.name)}
        </span>
        <span className="absolute -bottom-1.5 -left-1.5 rounded-sm bg-btn-primary px-1.5 py-0.5 text-[9px] font-medium text-primary">
          {welcomeMeta.positionCode}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-[10px]">
          <span className="uppercase tracking-[0.15em] text-accent">
            {t(`${base}.cfitId`, { id: PLAYER_ID })}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-btn-primary/60 px-2 py-0.5 uppercase tracking-wide text-btn-primary">
            <FiAlertTriangle /> {t(`${base}.statuses.${CURRENT_STATUS}`)}
          </span>
          <button
            type="button"
            onClick={onOpenStatusModal}
            aria-label={t(`${base}.statusInfo`)}
            className="text-sm text-white/50 transition-colors hover:text-accent"
          >
            <FiInfo />
          </button>
        </div>
        <h1 className="mt-2 font-ethnocentric text-lg uppercase leading-tight text-accent sm:text-2xl">
          {t(`${base}.welcome`, { name: user?.name })}
        </h1>
        <p className="mt-1.5 text-xs text-white/60">{t(`${base}.welcomeText`)}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-white/70">
          <li className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-btn-primary" /> {welcomeMeta.position}
          </li>
          <li className="flex items-center gap-1.5">
            <FiMapPin className="text-accent" /> {welcomeMeta.location}
          </li>
          <li className="flex items-center gap-1.5">
            <FiShield className="text-btn-primary" /> {welcomeMeta.club}
          </li>
        </ul>
      </div>

      <Link
        to={playerPath("personal-physical")}
        className="flex shrink-0 items-center justify-center gap-2 self-start rounded-sm bg-btn-primary px-4 py-2.5 text-xs text-primary transition hover:bg-btn-primary/90 sm:self-center"
      >
        <FiEdit2 /> {t(`${base}.editInformation`)}
      </Link>
    </section>
  );
};

export default PlayerWelcomeBanner;

