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
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import ProfileSnapshot from "@/pages/dashboard/player/components/ProfileSnapshot";
import ProfileStatusModal from "@/pages/dashboard/player/components/ProfileStatusModal";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import {
  CURRENT_STATUS,
  PLAYER_ID,
  PROFILE_STATUSES,
  completedSections,
  profileSections,
  welcomeMeta,
} from "@/pages/dashboard/player/playerData";

const base = "playerDashboard";
const playerPath = (path) => `/dashboard/player/${path}`;
const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const CompletionRing = ({ percent }) => (
  <div className="relative h-24 w-24 shrink-0">
    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
      <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
        className="text-accent transition-[stroke-dashoffset] duration-1000"
      />
    </svg>
    <span className="absolute inset-0 flex items-center justify-center font-ethnocentric text-base">
      {percent}%
    </span>
  </div>
);

const StatusStepper = () => {
  const { t } = useTranslation();
  const currentIndex = PROFILE_STATUSES.indexOf(CURRENT_STATUS);

  return (
    <ol className="relative mt-6 flex justify-between">
      <span className="absolute left-2 right-2 top-1.5 h-px bg-white/15" />
      <span
        className="absolute left-2 top-1.5 h-px bg-accent"
        style={{ width: `calc(${(currentIndex / (PROFILE_STATUSES.length - 1)) * 100}% - 1rem)` }}
      />
      {PROFILE_STATUSES.map((status, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <li key={status} className="relative flex w-12 flex-col items-center gap-2 text-center">
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                isDone
                  ? "border-accent bg-accent"
                  : isCurrent
                    ? "border-btn-primary bg-primary ring-4 ring-btn-primary/20"
                    : "border-white/20 bg-primary"
              }`}
            />
            <span
              className={`text-[9px] leading-tight ${
                isCurrent ? "text-btn-primary" : isDone ? "text-accent" : "text-white/40"
              }`}
            >
              {t(`${base}.statuses.${status}`)}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

const Overview = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const totalSections = profileSections.length;
  const percent = Math.round((completedSections / totalSections) * 100);
  const nextSteps = [...profileSections].sort((a, b) => a.complete - b.complete);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <section className={`${cardClass} flex flex-col gap-5 sm:flex-row sm:items-center`}>
        <div className="relative h-20 w-20 shrink-0">
          <span className="flex h-full w-full items-center justify-center rounded-md bg-linear-to-br from-accent/30 to-btn-primary/20 font-ethnocentric text-xl">
            {getInitials(user.name)}
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
              onClick={() => setIsModalOpen(true)}
              aria-label={t(`${base}.statusInfo`)}
              className="text-sm text-white/50 transition-colors hover:text-accent"
            >
              <FiInfo />
            </button>
          </div>
          <h1 className="mt-2 font-ethnocentric text-lg uppercase leading-tight text-accent sm:text-2xl">
            {t(`${base}.welcome`, { name: user.name })}
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
              onClick={() => setIsModalOpen(true)}
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
