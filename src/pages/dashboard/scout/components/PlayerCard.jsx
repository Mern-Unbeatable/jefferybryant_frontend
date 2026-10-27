import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiCheck, FiChevronRight, FiStar, FiVideo } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import PlayerPhoto from "@/pages/dashboard/scout/components/PlayerPhoto";
import { toggleWatchlist, useScoutStore } from "@/pages/dashboard/scout/scoutStore";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";

const base = "scoutDashboard.card";

const Tag = ({ tone, icon, children }) => {
  const Icon = icon;
  return (
    <span
      className={`flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[9px] ${
        tone === "yellow" ? "border-btn-primary/40 text-btn-primary" : "border-accent/40 text-accent"
      }`}
    >
      {Icon && <Icon />}
      {children}
    </span>
  );
};

const PlayerCard = ({ player }) => {
  const { t, i18n } = useTranslation();
  const { watchlist } = useScoutStore();
  const isWatched = watchlist.includes(player.id);
  const positions = player.positions.map((key) => t(`playerForms.positions.${key}`)).join(" · ");

  const stats = [
    ["age", player.age],
    ["height", player.height],
    ["foot", t(`playerForms.feet.${player.foot}`)],
  ];

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/3">
      <div className="relative h-40">
        <PlayerPhoto player={player} className="h-full w-full" />
        {player.priority && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-sm bg-btn-primary px-1.5 py-0.5 text-[9px] uppercase text-primary">
            <FiStar className="fill-current" /> {t(`${base}.priority`)}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-sm bg-black/70 px-1.5 py-0.5 text-[9px] text-white/80">
          {player.country}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-sm">{player.name}</h3>
            <p className="mt-0.5 truncate text-[10px] text-white/45">{positions}</p>
          </div>
          <LuShieldCheck className="shrink-0 text-accent" aria-label={t(`${base}.verified`)} />
        </div>

        <dl className="grid grid-cols-3 border-y border-white/10 py-2.5">
          {stats.map(([key, value]) => (
            <div key={key} className="flex flex-col-reverse border-white/10 px-2 first:pl-0 not-last:border-r">
              <dt className="text-[8px] uppercase tracking-wider text-white/40">{t(`${base}.${key}`)}</dt>
              <dd className="text-[11px]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-white/10 text-[9px] text-white/70">
            {getInitials(player.club)}
          </span>
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-wider text-white/40">{t(`${base}.club`)}</p>
            <p className="truncate text-[10px]">{player.club}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {player.video && <Tag icon={FiVideo}>{t(`${base}.video`)}</Tag>}
          {player.priority && <Tag tone="yellow">{t(`${base}.priority`)}</Tag>}
          {player.reviewReady && <Tag icon={FiCheck}>{t(`${base}.reviewReady`)}</Tag>}
        </div>

        <p className="text-[9px] text-white/35">{t(`${base}.shared`, { date: formatDate(player.shared, i18n.language) })}</p>

        <div className="mt-auto flex gap-2">
          <Link
            to={`/dashboard/scout/players/${player.id}`}
            className="flex flex-1 items-center justify-center gap-1 rounded-sm bg-accent/80 py-2 text-[11px] text-white transition hover:bg-accent"
          >
            {t(`${base}.viewProfile`)} <FiChevronRight />
          </Link>
          <button
            type="button"
            onClick={() => toggleWatchlist(player.id)}
            aria-pressed={isWatched}
            aria-label={t(`${base}.${isWatched ? "removeWatchlist" : "addWatchlist"}`)}
            className={`flex w-9 items-center justify-center rounded-sm border transition ${
              isWatched ? "border-btn-primary bg-btn-primary text-primary" : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            <FiStar className={isWatched ? "fill-current" : ""} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PlayerCard;
