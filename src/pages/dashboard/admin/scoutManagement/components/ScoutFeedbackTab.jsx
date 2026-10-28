import { useState } from "react";
import Pagination from "@/components/dashboard/Pagination";
import ScoutFeedbackDetailModal from "./ScoutFeedbackDetailModal";

const FEEDBACK_METRICS = [
  { id: "monitor", value: 1, label: "Continue Monitoring" },
  { id: "info", value: 1, label: "Information Requests" },
  { id: "eval", value: 1, label: "Further Evaluation Requests" },
  { id: "pass", value: 1, label: "Passed Players" },
  { id: "followup", value: 2, label: "Pending Admin Follow-up" },
];

const INITIAL_FEEDBACK_ROWS = [
  {
    id: 1,
    scout: "Michael Campbell",
    organization: "Harbour View FC",
    player: "Elijah Joseph",
    playerId: "CF-2055",
    actionType: "Pass on Player",
    feedback: "Not progressing at this stage",
    date: "15 Jun 2025 · 13:10",
    followUp: "Recorded",
  },
  {
    id: 2,
    scout: "James Mitchell",
    organization: "Nashville SC",
    player: "Kareem Rolle",
    playerId: "CF-2053",
    actionType: "Request Further Evaluation",
    feedback: "Additional evaluation information requested",
    date: "17 Jun 2025 · 15:42",
    followUp: "In Progress",
  },
  {
    id: 3,
    scout: "Michael Campbell",
    organization: "Harbour View FC",
    player: "Noah Clarke",
    playerId: "CF-2051",
    actionType: "Request Additional Information",
    feedback: "Please provide additional playing history.",
    date: "18 Jun 2025 · 09:18",
    followUp: "In Progress",
  },
  {
    id: 4,
    scout: "James Mitchell",
    organization: "Nashville SC",
    player: "Malik Thompson",
    playerId: "CF-2048",
    actionType: "Continue Monitoring",
    feedback: "Interested in tracking the player's development.",
    date: "18 Jun 2025 · 11:24",
    followUp: "Resolved",
  },
];

const ScoutFeedbackTab = () => {
  const [rows, setRows] = useState(INITIAL_FEEDBACK_ROWS);
  const [page, setPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleUpdateStatus = (id, newStatus) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, followUp: newStatus } : r))
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top 5 Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {FEEDBACK_METRICS.map((metric) => (
          <div
            key={metric.id}
            className="rounded-lg border border-white/10 bg-[#12171b] p-4 text-xs"
          >
            <p className="text-xl font-bold text-white">{metric.value}</p>
            <p className="mt-1 text-[10px] text-white/50">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Main Table Box */}
      <div className="rounded-lg border border-white/10 bg-[#12171b]">
        {/* Filters */}
        <div className="grid grid-cols-2 gap-2 border-b border-white/10 p-4 sm:grid-cols-5">
          <select className="rounded border border-white/10 bg-[#161b1f] p-2 text-xs text-white/70 focus:outline-none">
            <option>All feedback</option>
          </select>
          <select className="rounded border border-white/10 bg-[#161b1f] p-2 text-xs text-white/70 focus:outline-none">
            <option>All organizations</option>
          </select>
          <select className="rounded border border-white/10 bg-[#161b1f] p-2 text-xs text-white/70 focus:outline-none">
            <option>All dates</option>
          </select>
          <select className="rounded border border-white/10 bg-[#161b1f] p-2 text-xs text-white/70 focus:outline-none">
            <option>All follow-up</option>
          </select>
          <button
            type="button"
            className="rounded border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/60 hover:text-white"
          >
            Clear filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-220 whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                <th className="px-4 py-3.5 font-normal">Scout</th>
                <th className="px-4 py-3.5 font-normal">Organization / Team</th>
                <th className="px-4 py-3.5 font-normal">Player</th>
                <th className="px-4 py-3.5 font-normal">Player ID</th>
                <th className="px-4 py-3.5 font-normal">Action Type</th>
                <th className="px-4 py-3.5 font-normal">Scout Feedback / Message</th>
                <th className="px-4 py-3.5 font-normal">Submitted Date</th>
                <th className="px-4 py-3.5 font-normal">Follow-up</th>
                <th className="px-4 py-3.5 text-right font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row) => (
                <tr key={row.id} className="transition hover:bg-white/2">
                  <td className="px-4 py-3.5 font-semibold text-white">{row.scout}</td>
                  <td className="px-4 py-3.5 text-white/70">{row.organization}</td>
                  <td className="px-4 py-3.5 text-white/90">{row.player}</td>
                  <td className="px-4 py-3.5 text-white/50">{row.playerId}</td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-sm border border-cyan-400/40 bg-cyan-400/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-cyan-300">
                      {row.actionType}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-white/80">{row.feedback}</td>
                  <td className="px-4 py-3.5 text-[11px] text-white/50">{row.date}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        row.followUp === "Recorded" || row.followUp === "Resolved"
                          ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border border-amber-400/40 bg-amber-400/10 text-amber-300"
                      }`}
                    >
                      {row.followUp}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedFeedback(row)}
                      className="text-[11px] font-medium text-btn-primary hover:underline"
                    >
                      Review
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
          totalItems={rows.length}
          onChange={setPage}
        />
      </div>

      {/* Scout Feedback Detail Modal */}
      <ScoutFeedbackDetailModal
        feedback={selectedFeedback}
        open={Boolean(selectedFeedback)}
        onClose={() => setSelectedFeedback(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default ScoutFeedbackTab;

