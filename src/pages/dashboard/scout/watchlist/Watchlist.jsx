import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiStar } from "react-icons/fi";
import PageHeader from "@/components/dashboard/PageHeader";
import CountBadge from "@/pages/dashboard/scout/components/CountBadge";
import PlayerCard from "@/pages/dashboard/scout/components/PlayerCard";
import SearchInput from "@/pages/dashboard/scout/components/SearchInput";
import { getScoutPlayer } from "@/pages/dashboard/scout/scoutData";
import { useScoutStore } from "@/pages/dashboard/scout/scoutStore";

const base = "scoutDashboard.watchlist";

const Watchlist = () => {
  const { t } = useTranslation();
  const { watchlist } = useScoutStore();
  const [query, setQuery] = useState("");
  const players = watchlist.map(getScoutPlayer).filter(Boolean);
  const search = query.trim().toLowerCase();
  const filtered = players.filter(
    (player) => !search || [player.name, player.club, player.country].some((value) => value.toLowerCase().includes(search))
  );

  return (
    <div className="mx-auto flex flex-col gap-5">
      <PageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
        action={<CountBadge value={players.length} label={t(`${base}.count`)} />}
      />

      <SearchInput value={query} onChange={setQuery} placeholder={t(`${base}.search`)} />

      {players.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-white/10 p-10 text-center">
          <FiStar className="text-2xl text-btn-primary" />
          <p className="text-xs text-white/60">{t(`${base}.empty`)}</p>
          <Link to="/dashboard/scout/players" className="text-[11px] text-btn-primary hover:underline">
            {t(`${base}.browse`)}
          </Link>
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full rounded-lg border border-dashed border-white/10 p-10 text-center text-xs text-white/45">
              {t("scoutDashboard.players.empty")}
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default Watchlist;
