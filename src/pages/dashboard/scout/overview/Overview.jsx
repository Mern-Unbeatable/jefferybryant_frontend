import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiChevronRight, FiClock, FiEye, FiInfo, FiLock, FiStar, FiUsers } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import { useAuth } from "@/hooks/useAuth";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import PlayerCard from "@/pages/dashboard/scout/components/PlayerCard";
import PlayerPhoto from "@/pages/dashboard/scout/components/PlayerPhoto";
import { SCOUT_PLAYERS, SCOUT_PROFILE, getScoutPlayer } from "@/pages/dashboard/scout/scoutData";
import { useScoutStore } from "@/pages/dashboard/scout/scoutStore";
import { formatDate } from "@/utils/formatDate";

const base = "scoutDashboard.overview";
const scoutPath = (path) => `/dashboard/scout/${path}`;

const activityIcons = {
  continueMonitoring: FiStar,
  requestInformation: FiInfo,
  requestFilm: FiInfo,
  furtherEvaluation: FiEye,
  passOnPlayer: FiClock,
};

const ViewAll = ({ to, children }) => (
  <Link to={to} className="flex shrink-0 items-center gap-1.5 text-[10px] text-btn-primary hover:underline">
    {children} <FiArrowRight />
  </Link>
);

const PlayerRow = ({ player, meta }) => {
  const { t } = useTranslation();
  return (
    <li className="border-b border-white/5 last:border-b-0">
      <Link to={scoutPath(`players/${player.id}`)} className="group flex items-center gap-3 py-3">
        <PlayerPhoto player={player} className="h-9 w-9 shrink-0 rounded-sm" textClass="text-[10px]" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs">{player.name}</span>
          <span className="block truncate text-[10px] text-white/45">
            {t(`playerForms.positions.${player.positions[0]}`)} · {meta ?? player.country}
          </span>
        </span>
        <FiChevronRight className="shrink-0 text-white/30 transition group-hover:text-white" />
      </Link>
    </li>
  );
};

const Overview = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { watchlist, reviews } = useScoutStore();
  const firstName = user?.name?.split(" ")[0] ?? "";
  const priorityPlayers = SCOUT_PLAYERS.filter((player) => player.priority);
  const watchedPlayers = watchlist.map(getScoutPlayer).filter(Boolean);

  const stats = [
    { key: "available", value: SCOUT_PLAYERS.length, icon: FiUsers, to: "players" },
    { key: "priority", value: priorityPlayers.length, icon: FiStar, to: "players" },
    { key: "watchlist", value: watchlist.length, icon: FiEye, to: "watchlist" },
    { key: "pending", value: reviews.filter((review) => review.status === "underReview").length, icon: FiClock, to: "reviews" },
  ];

  return (
    <div className="mx-auto flex flex-col gap-5">
      <section className={`${cardClass} flex flex-col gap-5 lg:flex-row lg:items-center`}>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-btn-primary/80">
            {formatDate(new Date().toISOString().split("T")[0], i18n.language, { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="mt-2 font-ethnocentric text-xl uppercase sm:text-2xl">
            {t(`${base}.welcome`)} <span className="text-accent">{firstName}.</span>
          </h1>
          <p className="mt-2 max-w-xl text-xs text-white/60">{t(`${base}.subtitle`)}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-white/60">
            <span>{SCOUT_PROFILE.organization}</span>
            <span className="text-white/20">|</span>
            <span>{t(`${base}.role`)}</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1 text-accent">
              <LuShieldCheck /> {t(`${base}.verifiedAccess`)}
            </span>
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-md border border-accent/20 bg-accent/5 p-4 lg:max-w-xs">
          <FiLock className="mt-0.5 shrink-0 text-accent" />
          <div>
            <p className="text-[11px]">{t(`${base}.secureTitle`)}</p>
            <p className="mt-1 text-[10px] text-white/50">{t(`${base}.secureText`)}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ key, value, icon, to }) => {
          const Icon = icon;
          return (
            <Link key={key} to={scoutPath(to)} className={`${cardClass} group flex items-start gap-3 transition hover:border-white/25`}>
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

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <CardHeading eyebrow={t(`${base}.playersEyebrow`)} title={t(`${base}.playersTitle`)} />
          <ViewAll to={scoutPath("players")}>{t(`${base}.viewAll`)}</ViewAll>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SCOUT_PLAYERS.slice(0, 4).map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-3">
        <section className={cardClass}>
          <div className="flex items-start justify-between gap-3">
            <CardHeading eyebrow={t(`${base}.priorityEyebrow`)} title={t(`${base}.priorityTitle`)} />
            <ViewAll to={scoutPath("players")}>{t(`${base}.viewAll`)}</ViewAll>
          </div>
          <ul className="mt-4 flex flex-col">
            {priorityPlayers.map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
          </ul>
        </section>

        <section className={cardClass}>
          <div className="flex items-start justify-between gap-3">
            <CardHeading eyebrow={t(`${base}.activityEyebrow`)} title={t(`${base}.activityTitle`)} />
            <ViewAll to={scoutPath("reviews")}>{t(`${base}.viewAll`)}</ViewAll>
          </div>
          <ul className="mt-4 flex flex-col">
            {reviews.slice(0, 4).map((review) => {
              const player = getScoutPlayer(review.playerId);
              const Icon = activityIcons[review.action] ?? FiInfo;
              return (
                <li key={review.id} className="flex items-center gap-3 border-b border-white/5 py-3 last:border-b-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm text-accent">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs">{t(`scoutDashboard.reviews.actionTypes.${review.action}`)}</span>
                    <span className="block truncate text-[10px] text-white/45">{player?.name}</span>
                  </span>
                  <span className="shrink-0 text-[10px] text-white/40">
                    {formatDate(review.updated, i18n.language, { month: "short", day: "numeric" })}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={cardClass}>
          <div className="flex items-start justify-between gap-3">
            <CardHeading eyebrow={t(`${base}.watchlistEyebrow`)} title={t(`${base}.watchlistTitle`)} />
            <ViewAll to={scoutPath("watchlist")}>{t(`${base}.viewAll`)}</ViewAll>
          </div>
          {watchedPlayers.length ? (
            <ul className="mt-4 flex flex-col">
              {watchedPlayers.map((player) => (
                <PlayerRow key={player.id} player={player} meta={player.club} />
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-center text-[11px] text-white/45">{t(`${base}.watchlistEmpty`)}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Overview;
