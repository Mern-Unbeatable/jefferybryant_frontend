import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiAlertTriangle, FiArrowRight, FiInfo } from "react-icons/fi";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import {
  CURRENT_STATUS,
  completedSections,
  profileSections,
} from "@/pages/dashboard/player/playerData";
import CompletionRing from "./CompletionRing";
import StatusStepper from "./StatusStepper";

const base = "playerDashboard";
const playerPath = (path) => `/dashboard/player/${path}`;

/**
 * ProfileProgressSection - Grid section showing profile completion rate and recruitment status stepper
 *
 * @param {Function} onOpenStatusModal - Callback when status info button is clicked
 */
const ProfileProgressSection = ({ onOpenStatusModal }) => {
  const { t } = useTranslation();

  const totalSections = profileSections.length;
  const percent = Math.round((completedSections / totalSections) * 100);

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {/* Profile Completion Card */}
      <section className={`${cardClass} lg:col-span-2`}>
        <div className="flex items-start justify-between gap-4">
          <CardHeading
            eyebrow={t(`${base}.completion.eyebrow`)}
            title={t(`${base}.completion.title`)}
          />
          <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[9px] uppercase tracking-wide text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {t(`${base}.completion.live`)}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <CompletionRing percent={percent} />
          <div className="flex-1">
            <p className="text-sm">
              {t(`${base}.completion.count`, {
                done: completedSections,
                total: totalSections,
              })}
            </p>
            <p className="mt-1 text-[11px] text-white/50">
              {t(`${base}.completion.hint`)}
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${percent}%` }}
              />
            </div>
            <Link
              to={playerPath("highlight-video")}
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-btn-primary px-4 py-2.5 text-xs text-primary transition hover:bg-btn-primary/90"
            >
              <FiArrowRight /> {t(`${base}.completion.cta`)}
            </Link>
          </div>
        </div>
      </section>

      {/* Recruitment Status Card */}
      <section className={cardClass}>
        <div className="flex items-start justify-between gap-4">
          <CardHeading
            eyebrow={t(`${base}.status.eyebrow`)}
            title={t(`${base}.status.title`)}
          />
          <button
            type="button"
            onClick={onOpenStatusModal}
            aria-label={t(`${base}.statusInfo`)}
            className="text-base text-white/50 transition-colors hover:text-accent"
          >
            <FiInfo />
          </button>
        </div>

        <div className="mt-5 flex gap-3 rounded-md border border-btn-primary/40 bg-btn-primary/5 p-3">
          <FiAlertTriangle className="mt-0.5 shrink-0 text-btn-primary" />
          <div>
            <p className="text-[11px] uppercase tracking-wide text-btn-primary">
              {t(`${base}.statuses.${CURRENT_STATUS}`)}
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-white/60">
              {t(`${base}.status.alertText`)}
            </p>
          </div>
        </div>

        <StatusStepper />

        <p className="mt-5 flex items-center gap-1.5 text-[10px] text-white/40">
          <FiInfo className="shrink-0" /> {t(`${base}.status.footnote`)}
        </p>
      </section>
    </div>
  );
};

export default ProfileProgressSection;

