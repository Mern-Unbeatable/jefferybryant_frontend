import { useState } from "react";
import { FiChevronRight, FiDownload, FiPlus } from "react-icons/fi";
import Pagination from "@/components/dashboard/Pagination";

const SHARED_RECORDS = [
  {
    id: 1,
    player: "Malik Thompson",
    playerId: "CF-2048",
    scout: "James Mitchell",
    accessType: "Individual access",
    readiness: "Review Ready",
    sharedDateTime: "18 Jun 2025 · 10:14",
    currentAccess: "Shared / Accessible",
    reviewActivity: "Continue Monitoring",
  },
  {
    id: 2,
    player: "Kareem Rolle",
    playerId: "CF-2053",
    scout: "James Mitchell",
    accessType: "Individual access",
    readiness: "Review Ready",
    sharedDateTime: "17 Jun 2025 · 14:06",
    currentAccess: "Shared / Accessible",
    reviewActivity: "Request Further Evaluation",
  },
  {
    id: 3,
    player: "Noah Clarke",
    playerId: "CF-2051",
    scout: "Michael Campbell",
    accessType: "Individual access",
    readiness: "Review Ready",
    sharedDateTime: "16 Jun 2025 · 11:32",
    currentAccess: "Shared / Accessible",
    reviewActivity: "Request Additional Information",
  },
  {
    id: 4,
    player: "Elijah Joseph",
    playerId: "CF-2055",
    scout: "Michael Campbell",
    accessType: "Individual access",
    readiness: "Not Ready",
    sharedDateTime: "12 Jun 2025 · 09:04",
    currentAccess: "Access Revoked",
    reviewActivity: "Pass on Player",
  },
];

const ScoutActivityTab = ({ onViewHistory, onOpenCreateDelivery }) => {
  const [records, setRecords] = useState(SHARED_RECORDS);
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-6 text-xs">
      {/* Shared Player Profiles Box */}
      <div className="rounded-lg border border-white/10 bg-[#12171b]">
        {/* Header & Filters */}
        <div className="border-b border-white/10 p-5">
          <h2 className="font-ethnocentric text-xs tracking-wider text-white">
            Shared Player Profiles
          </h2>
          <p className="mt-0.5 text-[10px] text-white/40">
            Read-only first-share and review history
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            <select className="rounded border border-white/10 bg-[#161b1f] p-2 text-white/70 focus:outline-none">
              <option>All Scout</option>
            </select>
            <select className="rounded border border-white/10 bg-[#161b1f] p-2 text-white/70 focus:outline-none">
              <option>All organizations</option>
            </select>
            <select className="rounded border border-white/10 bg-[#161b1f] p-2 text-white/70 focus:outline-none">
              <option>Profile Readiness</option>
            </select>
            <select className="rounded border border-white/10 bg-[#161b1f] p-2 text-white/70 focus:outline-none">
              <option>Access Status</option>
            </select>
            <button
              type="button"
              className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white/60 hover:text-white"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-220 whitespace-nowrap text-left">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                <th className="px-4 py-3.5 font-normal">Player</th>
                <th className="px-4 py-3.5 font-normal">Player ID</th>
                <th className="px-4 py-3.5 font-normal">Scout / Organization</th>
                <th className="px-4 py-3.5 font-normal">Profile Readiness</th>
                <th className="px-4 py-3.5 font-normal">Shared Date & Time</th>
                <th className="px-4 py-3.5 font-normal">Current Access</th>
                <th className="px-4 py-3.5 font-normal">Scout Review Activity</th>
                <th className="px-4 py-3.5 text-right font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {records.map((rec) => (
                <tr key={rec.id} className="transition hover:bg-white/2">
                  <td className="px-4 py-3.5 font-semibold text-white">{rec.player}</td>
                  <td className="px-4 py-3.5 text-white/50">{rec.playerId}</td>
                  <td className="px-4 py-3.5">
                    <p className="text-white/80">{rec.scout}</p>
                    <p className="text-[10px] text-white/40">{rec.accessType}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        rec.readiness === "Review Ready"
                          ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border border-white/20 bg-white/5 text-white/40"
                      }`}
                    >
                      {rec.readiness}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-white/50">{rec.sharedDateTime}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        rec.currentAccess === "Shared / Accessible"
                          ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border border-white/20 bg-white/5 text-white/40"
                      }`}
                    >
                      {rec.currentAccess}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-white/70">{rec.reviewActivity}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => onViewHistory(rec)}
                      className="text-[11px] font-medium text-cyan-400 hover:underline"
                    >
                      View history
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          totalPages={1}
          totalItems={records.length}
          onChange={setPage}
        />
      </div>

      {/* Review-Ready Profile Deliveries Box */}
      <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-ethnocentric text-xs tracking-wider text-white">
              Review-Ready Profile Deliveries
            </h2>
            <p className="mt-0.5 text-[10px] text-white/40">
              Historical delivery records remain available after access changes.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCreateDelivery}
            className="flex items-center gap-1.5 rounded bg-btn-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
          >
            <FiPlus /> Create Profile Delivery
          </button>
        </div>

        {/* Deliveries Batch Card */}
        <div className="mt-5">
          <div
            onClick={onOpenCreateDelivery}
            className="group flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-white/2 p-4 transition hover:border-white/20 hover:bg-white/5"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-btn-primary/20 text-btn-primary">
                <FiDownload className="text-base" />
              </span>
              <div>
                <p className="font-semibold text-white transition group-hover:text-accent">
                  Caribbean Review Batch — October 2026
                </p>
                <p className="mt-0.5 text-[10px] text-white/40">
                  Nashville SC · 3 profiles · 18 Oct 2026 · 09:00
                </p>
              </div>
            </div>
            <FiChevronRight className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutActivityTab;
