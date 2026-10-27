import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCopy,
  FiEdit2,
  FiNavigation,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { LuQrCode } from "react-icons/lu";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import StatusBadge from "@/pages/dashboard/coach/components/StatusBadge";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";
import {
  COACH_STATS,
  ORGANIZATION,
  PLAYER_SUMMARY,
  RECENT_ACTIVITY,
  REGISTRATION_PROGRESS,
} from "@/pages/dashboard/coach/coachData";

const base = "coachDashboard.overview";
const coachPath = (path) => `/dashboard/coach/${path}`;

const activityIcons = {
  verified: FiCheck,
  complete: FiCheckCircle,
  submitted: FiClock,
  registered: FiUser,
};

const quickActionClass = `${cardClass} group flex items-center gap-4 text-left transition hover:border-white/25`;

const QuickActionContent = ({ icon, title, text }) => {
  const Icon = icon;
  return (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-white">{title}</span>
        <span className="mt-1 block text-[10px] text-white/45">{text}</span>
      </span>
      <FiChevronRight className="shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white" />
    </>
  );
};

const Overview = () => {
  const { t, i18n } = useTranslation();
  const [copied, copy] = useCopyToClipboard();
  const maxProgress = Math.max(...REGISTRATION_PROGRESS.map((item) => item.value));
  const completionRate = Math.round((PLAYER_SUMMARY.complete / PLAYER_SUMMARY.registered) * 100);

  return (
    <div className="mx-auto flex flex-col gap-5">
      <section className={`${cardClass} flex flex-col gap-5 sm:flex-row sm:items-center`}>
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-btn-primary font-ethnocentric text-xl text-primary">
          {getInitials(ORGANIZATION.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-white/50">{t(`${base}.eyebrow`)}</p>
          <h1 className="mt-1 font-ethnocentric text-xl uppercase sm:text-2xl">
            {t(`${base}.welcome`)} <span className="text-accent">{ORGANIZATION.shortName}</span>
          </h1>
          <p className="mt-2 text-xs text-white/60">{t(`${base}.subtitle`)}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-white/60">
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {COACH_STATS.map(({ key, value, icon }) => {
          const Icon = icon;
          return (
            <Link key={key} to={coachPath("my-players")} className={`${cardClass} group flex items-start gap-3 transition hover:border-white/25`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-btn-primary/10 text-btn-primary">
                <Icon />
              </span>
              <span className="flex-1">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-white/50">{t(`${base}.stats.${key}`)}</span>
                <span className="mt-1 block font-ethnocentric text-2xl">{value}</span>
              </span>
              <FiChevronRight className="text-white/30 transition group-hover:text-white" />
            </Link>
          );
        })}
      </section>

      <div className="grid gap-5 xl:grid-cols-3">
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

        <section className={cardClass}>
          <div className="flex items-start justify-between gap-3">
            <CardHeading eyebrow={t(`${base}.activityEyebrow`)} title={t(`${base}.activityTitle`)} />
            <Link to={coachPath("notifications")} className="text-[10px] text-btn-primary hover:underline">
              {t(`${base}.viewAll`)}
            </Link>
          </div>
          <ul className="mt-5 flex flex-col">
            {RECENT_ACTIVITY.map(({ id, name, type, time, date }) => {
              const Icon = activityIcons[type];
              return (
                <li key={id} className="flex items-center gap-3 border-b border-white/5 py-3 last:border-b-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm text-accent">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs">{name}</span>
                    <span className="block text-[10px] text-white/45">{t(`${base}.activity.${type}`)}</span>
                  </span>
                  <span className="shrink-0 text-[10px] text-white/40">
                    {date ? formatDate(date, i18n.language, { month: "short", day: "numeric" }) : t(`dashboardTime.${time}`)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section>
        <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{t(`${base}.shortcuts`)}</p>
        <h2 className="mt-1.5 font-ethnocentric text-base uppercase">{t(`${base}.quickActions`)}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link to={coachPath("invite-players")} className={quickActionClass}>
            <QuickActionContent icon={FiNavigation} title={t(`${base}.actions.invite`)} text={t(`${base}.actions.inviteText`)} />
          </Link>
          <button type="button" onClick={() => copy(ORGANIZATION.inviteLink)} className={quickActionClass}>
            <QuickActionContent
              icon={FiCopy}
              title={t(`${base}.actions.${copied ? "copied" : "copyLink"}`)}
              text={t(`${base}.actions.copyLinkText`)}
            />
          </button>
          <Link to={coachPath("invite-players")} className={quickActionClass}>
            <QuickActionContent icon={LuQrCode} title={t(`${base}.actions.qr`)} text={t(`${base}.actions.qrText`)} />
          </Link>
          <Link to={coachPath("recommend-player")} className={quickActionClass}>
            <QuickActionContent icon={FiStar} title={t(`${base}.actions.recommend`)} text={t(`${base}.actions.recommendText`)} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Overview;
