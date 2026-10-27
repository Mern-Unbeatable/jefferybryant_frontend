import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronRight, FiSend } from "react-icons/fi";
import PageHeader from "@/components/dashboard/PageHeader";
import Pagination from "@/components/dashboard/Pagination";
import SelectField from "@/components/dashboard/form/SelectField";
import { primaryButtonClass } from "@/components/dashboard/form/formStyles";
import StatusBadge from "@/pages/dashboard/coach/components/StatusBadge";
import PlayerDetailsModal from "@/pages/dashboard/coach/myPlayers/PlayerDetailsModal";
import {
  AGE_GROUPS,
  COACH_PLAYERS,
  ORGANIZATION,
  PLAYER_POSITIONS,
  PLAYER_SUMMARY,
} from "@/pages/dashboard/coach/coachData";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";

const base = "coachDashboard.players";
const PAGE_SIZE = 6;
const STATUSES = ["verified", "complete", "incomplete"];
const initialFilters = { status: "all", position: "all", ageGroup: "all" };

const matchesAgeGroup = (age, group) => group === "all" || age <= Number(group.slice(1));

const MyPlayers = () => {
  const { t, i18n } = useTranslation();
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const closeModal = useCallback(() => setSelectedId(null), []);

  const filtered = useMemo(
    () =>
      COACH_PLAYERS.filter(
        (player) =>
          (filters.status === "all" || player.status === filters.status) &&
          (filters.position === "all" || player.position === filters.position) &&
          matchesAgeGroup(player.age, filters.ageGroup)
      ),
    [filters]
  );

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const selectedPlayer = COACH_PLAYERS.find((player) => player.id === selectedId);

  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const options = (keys, allKey, labelPath) => [
    { value: "all", label: t(`${base}.filters.${allKey}`) },
    ...keys.map((key) => ({ value: key, label: t(`${labelPath}.${key}`) })),
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <PageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`, { organization: ORGANIZATION.name })}
        action={
          <Link to="/dashboard/coach/invite-players" className={`${primaryButtonClass} flex items-center gap-2`}>
            <FiSend /> {t("coachDashboard.invitePlayers")}
          </Link>
        }
      />

      <section className="grid grid-cols-2 rounded-lg border border-white/10 bg-white/3 lg:grid-cols-4">
        {Object.entries(PLAYER_SUMMARY).map(([key, value]) => (
          <p key={key} className="flex items-baseline gap-2 border-white/10 px-5 py-4 not-last:border-r">
            <span className="font-ethnocentric text-lg text-accent">{value}</span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/50">{t(`${base}.summary.${key}`)}</span>
          </p>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-white/3">
        <div className="grid gap-3 border-b border-white/10 p-4 md:grid-cols-3">
          <SelectField id="status" name="status" value={filters.status} onChange={updateFilter} options={options(STATUSES, "allStatuses", "coachDashboard.statuses")} />
          <SelectField id="position" name="position" value={filters.position} onChange={updateFilter} options={options(PLAYER_POSITIONS, "allPositions", `${base}.positions`)} />
          <SelectField id="ageGroup" name="ageGroup" value={filters.ageGroup} onChange={updateFilter} options={options(AGE_GROUPS, "allAgeGroups", `${base}.ageGroups`)} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 whitespace-nowrap text-left text-[11px]">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                {["player", "age", "position", "country", "registered", "profile", "status"].map((key) => (
                  <th key={key} scope="col" className="px-4 py-3 font-normal">
                    {t(`${base}.columns.${key}`)}
                  </th>
                ))}
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">{t(`${base}.columns.actions`)}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((player) => (
                <tr key={player.id} className="border-b border-white/5 transition hover:bg-white/3">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[9px] text-white/70">
                        {getInitials(player.name)}
                      </span>
                      {player.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/70">{player.age}</td>
                  <td className="px-4 py-3 text-white/70">{t(`${base}.positions.${player.position}`)}</td>
                  <td className="px-4 py-3 text-white/70">{player.country}</td>
                  <td className="px-4 py-3 text-white/70">{formatDate(player.registered, i18n.language)}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className="h-1 w-16 rounded-full bg-white/10">
                        <span className="block h-full rounded-full bg-accent" style={{ width: `${player.profile}%` }} />
                      </span>
                      <span className="text-[9px] text-white/45">{player.profile}%</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={player.status}>{t(`coachDashboard.statuses.${player.status}`)}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedId(player.id)}
                      aria-label={t(`${base}.viewDetails`, { name: player.name })}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
                    >
                      <FiChevronRight />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-white/45">
                    {t(`${base}.empty`)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={currentPage} totalPages={totalPages} totalItems={filtered.length} onChange={setPage} />
      </section>

      <PlayerDetailsModal player={selectedPlayer} onClose={closeModal} />
    </div>
  );
};

export default MyPlayers;
