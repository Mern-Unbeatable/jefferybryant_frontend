import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheckCircle, FiClock, FiEye, FiFlag, FiMessageSquare, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import PageHeader from "@/components/dashboard/PageHeader";
import Pagination from "@/components/dashboard/Pagination";
import { secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import StatusBadge from "@/pages/dashboard/coach/components/StatusBadge";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import PlayerPhoto from "@/pages/dashboard/scout/components/PlayerPhoto";
import { getScoutPlayer } from "@/pages/dashboard/scout/scoutData";
import { useScoutStore } from "@/pages/dashboard/scout/scoutStore";
import { formatDate } from "@/utils/formatDate";

const base = "scoutDashboard.reviews";
const PAGE_SIZE = 6;

const Reviews = () => {
  const { t, i18n } = useTranslation();
  const { reviews } = useScoutStore();
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState(null);
  const closeViewing = useCallback(() => setViewing(null), []);
  const date = (value) => formatDate(value, i18n.language, { month: "short", day: "numeric", year: "numeric" });

  const stats = [
    { key: "total", value: reviews.length, icon: FiMessageSquare },
    { key: "pending", value: reviews.filter((review) => review.status === "underReview").length, icon: FiClock },
    { key: "responses", value: reviews.filter((review) => review.status === "responded").length, icon: FiCheckCircle },
    { key: "passed", value: reviews.filter((review) => review.action === "passOnPlayer").length, icon: FiFlag },
  ];

  const totalPages = Math.max(Math.ceil(reviews.length / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);
  const pageRows = reviews.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const viewingPlayer = viewing && getScoutPlayer(viewing.playerId);
  const columns = ["player", "action", "submitted", "status", "updated"];

  return (
    <div className="mx-auto flex flex-col gap-5">
      <PageHeader eyebrow={t(`${base}.eyebrow`)} title={t(`${base}.title`)} subtitle={t(`${base}.subtitle`)} />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ key, value, icon }) => {
          const Icon = icon;
          return (
            <div key={key} className={`${cardClass} flex items-start gap-3`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-btn-primary/10 text-btn-primary">
                <Icon />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-white/50">{t(`${base}.stats.${key}`)}</span>
                <span className="mt-1 block font-ethnocentric text-2xl">{value}</span>
              </span>
            </div>
          );
        })}
      </section>

      <section className="rounded-lg border border-white/10 bg-white/3">
        <div className="p-5">
          <h2 className="text-sm">{t(`${base}.tableTitle`)}</h2>
          <p className="mt-1 text-[10px] text-white/45">{t(`${base}.tableText`)}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 whitespace-nowrap text-left text-[11px]">
            <thead>
              <tr className="border-y border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
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
              {pageRows.map((review) => {
                const player = getScoutPlayer(review.playerId);
                return (
                  <tr key={review.id} className="border-b border-white/5 transition hover:bg-white/3">
                    <td className="px-4 py-3">
                      {player && (
                        <span className="flex items-center gap-2.5">
                          <PlayerPhoto player={player} className="h-7 w-7 shrink-0 rounded-full" textClass="text-[8px]" />
                          <span>
                            <span className="block">{player.name}</span>
                            <span className="block text-[9px] text-white/40">{t(`playerForms.positions.${player.positions[0]}`)}</span>
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white/70">{t(`${base}.actionTypes.${review.action}`)}</td>
                    <td className="px-4 py-3 text-white/70">{date(review.submitted)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={review.status}>{t(`${base}.statuses.${review.status}`)}</StatusBadge>
                    </td>
                    <td className="px-4 py-3 text-white/70">{date(review.updated)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setViewing(review)}
                        className="inline-flex items-center gap-1.5 text-[10px] text-btn-primary hover:underline"
                      >
                        <FiEye /> {t(`${base}.viewDetails`)}
                      </button>
                    </td>
                  </tr>
                );
              })}
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
        <Pagination page={currentPage} totalPages={totalPages} totalItems={reviews.length} onChange={setPage} />
      </section>

      <Modal open={Boolean(viewing)} onClose={closeViewing} labelledBy="review-details-title" className="max-w-md">
        {viewing && (
          <div>
            <div className="flex items-start justify-between gap-4 p-5 pb-0">
              <div>
                <p className="text-[10px] text-accent">{viewingPlayer?.name}</p>
                <h2 id="review-details-title" className="mt-1 font-ethnocentric text-base uppercase">
                  {t(`${base}.modal.title`)}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeViewing}
                aria-label={t(`${base}.modal.close`)}
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 text-white/60 transition hover:text-white"
              >
                <FiX />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-5">
              <dl className="grid grid-cols-2 gap-3">
                {[
                  ["action", t(`${base}.actionTypes.${viewing.action}`)],
                  ["submitted", date(viewing.submitted)],
                  ["status", <StatusBadge key="status" status={viewing.status}>{t(`${base}.statuses.${viewing.status}`)}</StatusBadge>],
                  ["updated", date(viewing.updated)],
                ].map(([key, value]) => (
                  <div key={key} className="rounded-sm border border-white/10 p-3">
                    <dt className="text-[9px] uppercase tracking-[0.15em] text-white/40">{t(`${base}.columns.${key}`)}</dt>
                    <dd className="mt-1.5 text-[11px]">{value}</dd>
                  </div>
                ))}
              </dl>

              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/45">{t(`${base}.modal.message`)}</p>
                <p className="mt-2 rounded-sm border border-white/10 bg-black/20 p-3 text-[11px] text-white/80">
                  {viewing.message || t(`${base}.modal.noMessage`)}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/45">{t(`${base}.modal.response`)}</p>
                <p
                  className={`mt-2 rounded-sm border p-3 text-[11px] ${
                    viewing.response ? "border-accent/30 bg-accent/5 text-white/80" : "border-white/10 bg-black/20 text-white/45"
                  }`}
                >
                  {viewing.response || t(`${base}.modal.noResponse`)}
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-white/10 p-5">
              <button type="button" onClick={closeViewing} className={secondaryButtonClass}>
                {t(`${base}.modal.closeDetails`)}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reviews;
