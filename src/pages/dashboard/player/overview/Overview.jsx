import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheck,
  FiChevronRight,
  FiEdit2,
  FiInfo,
} from "react-icons/fi";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import ProfileSnapshot from "@/pages/dashboard/player/components/ProfileSnapshot";
import ProfileStatusModal from "@/pages/dashboard/player/components/ProfileStatusModal";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import {
  CURRENT_STATUS,
  completedSections,
  profileSections,
} from "@/pages/dashboard/player/playerData";
import CompletionRing from "./components/CompletionRing";
import StatusStepper from "./components/StatusStepper";
import PlayerWelcomeBanner from "./components/PlayerWelcomeBanner";

const base = "playerDashboard";
const playerPath = (path) => `/dashboard/player/${path}`;

const Overview = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const totalSections = profileSections.length;
  const percent = Math.round((completedSections / totalSections) * 100);
  const nextSteps = [...profileSections].sort((a, b) => a.complete - b.complete);

  return (
    <div className="mx-auto flex flex-col gap-5">
      {/* Welcome Banner */}
      <PlayerWelcomeBanner onOpenStatusModal={openModal} />

      <div className="grid gap-5 lg:grid-cols-3">
        <section className={`${cardClass} lg:col-span-2`}>
          <div className="flex items-start justify-between gap-4">
            <CardHeading eyebrow={t(`${base}.completion.eyebrow`)} title={t(`${base}.completion.title`)} />
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[9px] uppercase tracking-wide text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {t(`${base}.completion.live`)}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <CompletionRing percent={percent} />
            <div className="flex-1">
              <p className="text-sm">
                {t(`${base}.completion.count`, { done: completedSections, total: totalSections })}
              </p>
              <p className="mt-1 text-[11px] text-white/50">{t(`${base}.completion.hint`)}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
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

        <section className={cardClass}>
          <div className="flex items-start justify-between gap-4">
            <CardHeading eyebrow={t(`${base}.status.eyebrow`)} title={t(`${base}.status.title`)} />
            <button
              type="button"
              onClick={openModal}
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
              <p className="mt-1 text-[10px] leading-relaxed text-white/60">{t(`${base}.status.alertText`)}</p>
            </div>
          </div>

          <StatusStepper />

          <p className="mt-5 flex items-center gap-1.5 text-[10px] text-white/40">
            <FiInfo className="shrink-0" /> {t(`${base}.status.footnote`)}
          </p>
        </section>
      </div>

      <section className={cardClass}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <CardHeading eyebrow={t(`${base}.overview.eyebrow`)} title={t(`${base}.overview.title`)} />
          <div className="flex gap-2">
            <Link
              to={playerPath("my-profile")}
              className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs transition hover:border-white/30"
            >
              {t(`${base}.overview.viewFull`)}
            </Link>
            <Link
              to={playerPath("personal-physical")}
              className="flex items-center gap-2 rounded-sm bg-btn-primary px-4 py-2 text-xs text-primary transition hover:bg-btn-primary/90"
            >
              <FiEdit2 /> {t(`${base}.overview.edit`)}
            </Link>
          </div>
        </div>
        <ProfileSnapshot />
      </section>

      <section className={cardClass}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <CardHeading eyebrow={t(`${base}.nextSteps.eyebrow`)} title={t(`${base}.nextSteps.title`)} />
          <p className="text-[10px] text-white/40">{t(`${base}.nextSteps.hint`)}</p>
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
                      complete ? "bg-accent/15 text-accent" : "bg-btn-primary/15 text-btn-primary"
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
                      complete ? "bg-accent/10 text-accent" : "bg-btn-primary/10 text-btn-primary"
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

      <ProfileStatusModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Overview;
