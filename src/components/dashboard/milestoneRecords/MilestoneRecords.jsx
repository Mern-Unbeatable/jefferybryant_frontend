import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiDownload, FiEye, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import Pagination from "@/components/dashboard/Pagination";
import SelectField from "@/components/dashboard/form/SelectField";
import { inputClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import RowMenu from "@/components/dashboard/milestoneRecords/RowMenu";
import StatusBadge from "@/pages/dashboard/coach/components/StatusBadge";
import { POSITION_KEYS } from "@/pages/dashboard/player/playerData";
import { exportCsv, exportExcel } from "@/utils/exportTable";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";

const base = "milestoneRecords";
const PAGE_SIZE = 5;
const DELIVERY_STATUSES = ["pending", "reviewed", "forwarded"];
const initialFilters = { country: "all", position: "all", date: "", sort: "newest" };

const MilestoneRecords = ({ records, milestones, initialDelivery }) => {
  const { t, i18n } = useTranslation();
  const withDelivery = Boolean(initialDelivery);
  const [milestone, setMilestone] = useState(milestones[0].key);
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState(null);
  const [delivery, setDelivery] = useState(initialDelivery ?? {});
  const [feedback, setFeedback] = useState("");
  const closeViewing = useCallback(() => setViewing(null), []);

  const countries = useMemo(() => [...new Set(records.map((player) => player.country))].sort(), [records]);
  const positionLabel = (key) => t(`playerForms.positions.${key}`);
  const date = (value) => formatDate(value, i18n.language);
  const deliveryOf = (player) => delivery[player.id] ?? "pending";

  const rows = useMemo(() => {
    const list = records.filter(
      (player) =>
        player.milestone === milestone &&
        (filters.country === "all" || player.country === filters.country) &&
        (filters.position === "all" || player.position === filters.position) &&
        (!filters.date || player.presented === filters.date)
    );
    return list.sort((a, b) =>
      filters.sort === "newest" ? b.presented.localeCompare(a.presented) : a.presented.localeCompare(b.presented)
    );
  }, [records, milestone, filters]);

  const totalPages = Math.max(Math.ceil(rows.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const updateDelivery = (player, status) => {
    setDelivery((prev) => ({ ...prev, [player.id]: status }));
    setFeedback(t(`${base}.deliveryUpdated`, { name: player.name, status: t(`${base}.delivery.${status}`) }));
  };

  const columns = ["player", "country", "position", "reviewReady", "presented", "milestone", ...(withDelivery ? ["delivery"] : [])];

  const handleExport = (type) => {
    const headers = columns.map((key) => t(`${base}.columns.${key}`));
    const data = rows.map((player) => [
      `${player.name} (${player.cfitId})`,
      player.country,
      positionLabel(player.position),
      date(player.reviewReady),
      date(player.presented),
      t(`${base}.milestoneBadge.${player.milestone}`),
      ...(withDelivery ? [t(`${base}.delivery.${deliveryOf(player)}`)] : []),
    ]);
    (type === "csv" ? exportCsv : exportExcel)(headers, data, `cfit-${milestone}-delivery-records`);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <section className="rounded-lg border border-white/10 bg-white/3">
        <div className="p-5 pb-0">
          <h1 className="text-lg">{t(`${base}.title`)}</h1>
          <p className="mt-1 text-[11px] text-white/50">{t(`${base}.subtitle`)}</p>
        </div>

        <div role="tablist" className="mt-4 flex gap-6 overflow-x-auto border-b border-white/10 px-5">
          {milestones.map(({ key }) => {
            const isActive = key === milestone;
            const count = records.filter((player) => player.milestone === key).length;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setMilestone(key);
                  setPage(1);
                }}
                className={`flex shrink-0 items-center gap-2 border-b-2 pb-3 text-[11px] transition ${
                  isActive ? "border-btn-primary text-white" : "border-transparent text-white/45 hover:text-white"
                }`}
              >
                {t(`${base}.tabs.${key}`)}
                <span className={`rounded-full px-1.5 text-[9px] ${isActive ? "bg-btn-primary/20 text-btn-primary" : "bg-white/10"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 border-b border-white/10 p-4 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <SelectField
            id="country"
            name="country"
            value={filters.country}
            onChange={updateFilter}
            options={[{ value: "all", label: t(`${base}.filters.allCountries`) }, ...countries.map((country) => ({ value: country, label: country }))]}
          />
          <SelectField
            id="position"
            name="position"
            value={filters.position}
            onChange={updateFilter}
            options={[{ value: "all", label: t(`${base}.filters.allPositions`) }, ...POSITION_KEYS.map((key) => ({ value: key, label: positionLabel(key) }))]}
          />
          <input
            type="date"
            aria-label={t(`${base}.filters.date`)}
            value={filters.date}
            onChange={(event) => updateFilter("date", event.target.value)}
            className={`${inputClass} scheme-dark`}
          />
          <SelectField
            id="sort"
            name="sort"
            value={filters.sort}
            onChange={updateFilter}
            options={["newest", "oldest"].map((key) => ({ value: key, label: t(`${base}.filters.${key}`) }))}
          />
          <div className="flex gap-2">
            {["csv", "excel"].map((type) => (
              <button key={type} type="button" onClick={() => handleExport(type)} className={`${secondaryButtonClass} flex items-center gap-1.5`}>
                <FiDownload /> {t(`${base}.export.${type}`)}
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <p role="status" className="border-b border-white/10 bg-accent/10 px-5 py-2.5 text-[10px] text-accent">
            {feedback}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 whitespace-nowrap text-left text-[11px]">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                {columns.map((key) => (
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
              {pageRows.map((player) => (
                <tr key={player.id} className="border-b border-white/5 transition hover:bg-white/3">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[9px] text-white/70">
                        {getInitials(player.name)}
                      </span>
                      <span>
                        <span className="block">{player.name}</span>
                        <span className="block text-[9px] text-white/40">{player.cfitId}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    <span className="mr-2 rounded-sm bg-white/10 px-1 py-0.5 text-[8px]">{player.countryCode}</span>
                    {player.country}
                  </td>
                  <td className="px-4 py-3 text-white/70">{positionLabel(player.position)}</td>
                  <td className="px-4 py-3 text-white/70">{date(player.reviewReady)}</td>
                  <td className="px-4 py-3 text-white/70">{date(player.presented)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status="milestone">{t(`${base}.milestoneBadge.${player.milestone}`)}</StatusBadge>
                  </td>
                  {withDelivery && (
                    <td className="px-4 py-3">
                      <StatusBadge status={deliveryOf(player)}>{t(`${base}.delivery.${deliveryOf(player)}`)}</StatusBadge>
                    </td>
                  )}
                  <td className="px-4 py-3 text-right">
                    {withDelivery ? (
                      <RowMenu
                        statuses={DELIVERY_STATUSES}
                        current={deliveryOf(player)}
                        onView={() => setViewing(player)}
                        onStatusChange={(status) => updateDelivery(player, status)}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setViewing(player)}
                        className="inline-flex items-center gap-1.5 text-[10px] text-btn-primary hover:underline"
                      >
                        <FiEye /> {t(`${base}.viewProfile`)}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-white/45">
                    {t(`${base}.empty`)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={currentPage} totalPages={totalPages} totalItems={rows.length} onChange={setPage} />
      </section>

      <Modal open={Boolean(viewing)} onClose={closeViewing} labelledBy="milestone-player-title" className="max-w-md">
        {viewing && (
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-xs text-accent">
                  {getInitials(viewing.name)}
                </span>
                <div>
                  <h2 id="milestone-player-title" className="font-ethnocentric text-sm uppercase">
                    {viewing.name}
                  </h2>
                  <p className="mt-0.5 text-[10px] text-white/45">{viewing.cfitId}</p>
                </div>
              </div>
              <button type="button" onClick={closeViewing} aria-label={t(`${base}.close`)} className="text-white/60 hover:text-white">
                <FiX />
              </button>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["country", viewing.country],
                ["position", positionLabel(viewing.position)],
                ["reviewReady", date(viewing.reviewReady)],
                ["presented", date(viewing.presented)],
                ...(withDelivery ? [["delivery", t(`${base}.delivery.${deliveryOf(viewing)}`)]] : []),
              ].map(([key, value]) => (
                <div key={key} className="rounded-sm border border-white/10 p-3">
                  <dt className="text-[9px] uppercase tracking-[0.15em] text-white/40">{t(`${base}.columns.${key}`)}</dt>
                  <dd className="mt-1.5 text-[11px]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MilestoneRecords;
