import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiFilter } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import PageHeader from "@/components/dashboard/PageHeader";
import SelectField from "@/components/dashboard/form/SelectField";
import { secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import CountBadge from "@/pages/dashboard/scout/components/CountBadge";
import PlayerCard from "@/pages/dashboard/scout/components/PlayerCard";
import SearchInput from "@/pages/dashboard/scout/components/SearchInput";
import { SCOUT_PLAYERS } from "@/pages/dashboard/scout/scoutData";

const base = "scoutDashboard.players";
const PAGE_SIZE = 4;
const unique = (values) => [...new Set(values)].sort();

const FILTERS = {
  country: unique(SCOUT_PLAYERS.map((player) => player.country)),
  position: unique(SCOUT_PLAYERS.map((player) => player.positions[0])),
  video: ["available", "unavailable"],
  status: ["reviewReady", "inReview"],
  age: ["under18", "18plus"],
  club: unique(SCOUT_PLAYERS.map((player) => player.club)),
};
const initialFilters = Object.fromEntries(Object.keys(FILTERS).map((key) => [key, "all"]));

const matches = (player, filters) =>
  (filters.country === "all" || player.country === filters.country) &&
  (filters.position === "all" || player.positions[0] === filters.position) &&
  (filters.video === "all" || player.video === (filters.video === "available")) &&
  (filters.status === "all" || player.reviewReady === (filters.status === "reviewReady")) &&
  (filters.age === "all" || (filters.age === "under18" ? player.age < 18 : player.age >= 18)) &&
  (filters.club === "all" || player.club === filters.club);

const Players = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return SCOUT_PLAYERS.filter(
      (player) =>
        matches(player, filters) &&
        (!search || [player.name, player.club, player.country].some((value) => value.toLowerCase().includes(search)))
    );
  }, [query, filters]);

  const optionLabel = (key, value) => {
    if (key === "position") return t(`playerForms.positions.${value}`);
    if (key === "country" || key === "club") return value;
    return t(`${base}.options.${value}`);
  };

  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <PageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
        action={<CountBadge value={SCOUT_PLAYERS.length} label={t(`${base}.accessible`)} />}
      />

      <section className="flex flex-col gap-4">
        <SearchInput value={query} onChange={setQuery} placeholder={t(`${base}.search`)} />

        <div className="rounded-lg border border-white/10 bg-white/3 p-4">
          <p className="flex flex-wrap items-center gap-2 text-[11px]">
            <FiFilter className="text-accent" /> {t(`${base}.filterTitle`)}
            <span className="text-[10px] text-white/40">{t(`${base}.filterText`)}</span>
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {Object.entries(FILTERS).map(([key, values]) => (
              <div key={key}>
                <p className="mb-1.5 text-[9px] uppercase tracking-wider text-white/45">{t(`${base}.filters.${key}`)}</p>
                <SelectField
                  id={`filter-${key}`}
                  name={key}
                  value={filters[key]}
                  onChange={updateFilter}
                  options={[
                    { value: "all", label: t(`${base}.all.${key}`) },
                    ...values.map((value) => ({ value, label: optionLabel(key, value) })),
                  ]}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-white/50">
          <span>{t(`${base}.matchCount`, { count: filtered.length })}</span>
          <span className="flex items-center gap-1.5">
            <LuShieldCheck className="text-accent" /> {t(`${base}.permission`)}
          </span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.slice(0, visible).map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-lg border border-dashed border-white/10 p-10 text-center text-xs text-white/45">
            {t(`${base}.empty`)}
          </p>
        )}
      </section>

      {visible < filtered.length && (
        <div className="flex justify-center">
          <button type="button" onClick={() => setVisible((count) => count + PAGE_SIZE)} className={secondaryButtonClass}>
            {t(`${base}.loadMore`)}
          </button>
        </div>
      )}
    </div>
  );
};

export default Players;
