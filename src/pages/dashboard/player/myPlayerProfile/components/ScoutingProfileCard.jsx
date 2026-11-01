import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiEdit2 } from "react-icons/fi";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import {
  CURRENT_STATUS,
  completedSections,
  profileSections,
  sampleProfile,
} from "@/pages/dashboard/player/playerData";

const base = "playerDashboard";

/**
 * ScoutingProfileCard - Summary header card displaying player initials, name, position, club, completion and status
 */
const ScoutingProfileCard = () => {
  const { t } = useTranslation();

  return (
    <section
      className={`${cardClass} flex flex-col gap-5 bg-linear-to-r from-white/5 to-white/2 sm:flex-row sm:items-center`}
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-btn-primary font-ethnocentric text-lg text-primary">
        {sampleProfile.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">
          {t(`${base}.profile.scoutingProfile`)}
        </p>
        <h2 className="mt-1 font-ethnocentric text-xl uppercase sm:text-2xl">
          {sampleProfile.name}
        </h2>
        <p className="mt-1 text-sm text-white/70">
          {sampleProfile.position} · {sampleProfile.club}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-white/50">
          <span>{sampleProfile.location}</span>
          <span className="text-white/20">|</span>
          <span>
            {t(`${base}.profile.complete`, {
              done: completedSections,
              total: profileSections.length,
            })}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-btn-primary">
            {t(`${base}.statuses.${CURRENT_STATUS}`)}
          </span>
        </p>
      </div>
      <Link
        to="/dashboard/player/personal-physical"
        className="flex shrink-0 items-center justify-center gap-2 self-start rounded-sm bg-btn-primary px-4 py-2.5 text-xs text-primary transition hover:bg-btn-primary/90 sm:self-center"
      >
        <FiEdit2 /> {t(`${base}.overview.edit`)}
      </Link>
    </section>
  );
};

export default ScoutingProfileCard;

