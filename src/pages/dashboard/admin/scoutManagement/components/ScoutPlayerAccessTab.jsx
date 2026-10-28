import { useState } from "react";
import { FiPlus, FiShield } from "react-icons/fi";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const INITIAL_PLAYERS = [
  {
    id: 1,
    name: "Malik Thompson",
    cfitId: "CF-2048",
    age: 17,
    position: "Right Wing",
    country: "Jamaica",
    club: "Harbour View Academy",
    intelligence: "Priority",
    readiness: "Review Ready",
    accessStatus: "Shared / Accessible",
    sharedDate: "18 Jun 2025 · 10:14",
    shared: true,
  },
  {
    id: 2,
    name: "Noah Clarke",
    cfitId: "CF-2051",
    age: 18,
    position: "Centre Back",
    country: "Barbados",
    club: "Weymouth Wales FC",
    intelligence: "Review",
    readiness: "Review Ready",
    accessStatus: "Not Shared",
    sharedDate: "—",
    shared: false,
  },
  {
    id: 3,
    name: "Kareem Rolle",
    cfitId: "CF-2053",
    age: 17,
    position: "Left Back",
    country: "Bahamas",
    club: "Dynamos FC",
    intelligence: "Watch",
    readiness: "Review Ready",
    accessStatus: "Shared / Accessible",
    sharedDate: "17 Jun 2025 · 14:06",
    shared: true,
  },
  {
    id: 4,
    name: "Elijah Joseph",
    cfitId: "CF-2055",
    age: 16,
    position: "Goalkeeper",
    country: "Saint Lucia",
    club: "Northern United",
    intelligence: "Verification",
    readiness: "Not Ready",
    accessStatus: "Not Shared",
    sharedDate: "—",
    shared: false,
  },
];

const INITIAL_NOTES = [
  {
    id: 1,
    type: "Scout-visible note",
    target: "Malik Thompson: CF-2048",
    text: "Player is cleared for review of recent match footage.",
    visible: true,
  },
  {
    id: 2,
    type: "Internal Admin note",
    target: "Malik Thompson: CF-2048",
    text: "Internal relationship context - do not share.",
    visible: false,
  },
];

const ScoutPlayerAccessTab = ({
  onOpenShareModal,
  onOpenAddNoteModal,
}) => {
  const [targetType, setTargetType] = useState("individual");
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [notes, setNotes] = useState(INITIAL_NOTES);

  const toggleShare = (id) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const willShare = !p.shared;
        return {
          ...p,
          shared: willShare,
          accessStatus: willShare ? "Shared / Accessible" : "Not Shared",
          sharedDate: willShare ? "Just now" : "—",
        };
      })
    );
  };

  const toggleNoteVisibility = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, visible: !n.visible } : n))
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1 - SELECT SCOUT OR ORGANIZATION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Selector */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 lg:col-span-7">
          <h2 className="font-ethnocentric text-xs tracking-wider text-white">
            1 — Select Scout or Organization
          </h2>
          <p className="mt-0.5 text-[10px] text-white/40">
            Access is explicit and never inherited from the full player database.
          </p>

          {/* Toggle Type */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setTargetType("individual")}
              className={`rounded px-3 py-1.5 text-xs transition ${
                targetType === "individual"
                  ? "bg-white/15 font-semibold text-white"
                  : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              Individual Scout
            </button>
            <button
              type="button"
              onClick={() => setTargetType("organization")}
              className={`rounded px-3 py-1.5 text-xs transition ${
                targetType === "organization"
                  ? "bg-white/15 font-semibold text-white"
                  : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              Organization / Team
            </button>
          </div>

          {/* Select Dropdown */}
          <div className="mt-4">
            <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/40">
              Search and select scout
            </label>
            <select className="w-full rounded border border-white/15 bg-white/5 p-2.5 text-xs text-white focus:outline-none">
              <option>James Mitchell — Nashville SC</option>
              <option>Christopher Brown — Toronto FC</option>
              <option>Daniel Roberts — Inter Miami CF</option>
              <option>Michael Campbell — Harbour View FC</option>
            </select>
          </div>

          {/* Scout Card Preview */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-white/5 bg-white/2 p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-semibold text-cyan-300">
                JM
              </span>
              <div>
                <p className="font-semibold text-white">James Mitchell</p>
                <p className="text-[10px] text-white/40">Professional Scout · Active</p>
              </div>
            </div>
            <span className="rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
              Eligible
            </span>
          </div>
        </div>

        {/* Right: Scout-visible information preview */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 text-xs lg:col-span-5">
          <div className="flex items-center gap-2 text-cyan-400">
            <FiShield className="text-sm" />
            <h3 className="font-semibold uppercase tracking-wider text-white">
              Scout-visible information
            </h3>
          </div>
          <p className="mt-0.5 text-[10px] text-white/40">Preview of approved profile fields</p>

          <div className="mt-4 space-y-4">
            <div className="rounded border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                Approved for Scout View
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/70">
                Biography and approved football information: Playing history, relevant statistics, and highlights. Only notes explicitly marked scout-visible.
              </p>
            </div>

            <div className="rounded border border-white/10 bg-white/2 p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                Private — Admin Only
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                Internal intelligence and relationship notes. Operational information and unapproved evaluations. Guardian or private contact details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2 — PLAYER PROFILE ACCESS */}
      <div className="rounded-lg border border-white/10 bg-[#12171b]">
        {/* Subtitle & Filter Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-ethnocentric text-xs tracking-wider text-white">
              2 — Player Profile Access
            </h2>
            <p className="mt-0.5 text-[10px] text-white/40">
              James Mitchell · {players.filter((p) => p.shared).length} currently accessible
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="rounded border border-white/10 bg-white/5 p-2 text-[10px] text-white/70 focus:outline-none">
              <option>All countries</option>
            </select>
            <select className="rounded border border-white/10 bg-white/5 p-2 text-[10px] text-white/70 focus:outline-none">
              <option>All positions</option>
            </select>
            <select className="rounded border border-white/10 bg-white/5 p-2 text-[10px] text-white/70 focus:outline-none">
              <option>All clubs</option>
            </select>
            <select className="rounded border border-white/10 bg-white/5 p-2 text-[10px] text-white/70 focus:outline-none">
              <option>All stages</option>
            </select>
            <button
              type="button"
              className="rounded border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] text-white/60 hover:text-white"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onOpenShareModal}
              className="flex items-center gap-1.5 rounded bg-btn-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
            >
              <FiPlus /> Share Player Profiles
            </button>
          </div>
        </div>

        {/* Players Access Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-220 whitespace-nowrap text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.15em] text-white/45">
                <th className="px-4 py-3 font-normal">Player</th>
                <th className="px-4 py-3 font-normal">Player ID</th>
                <th className="px-4 py-3 font-normal">Age</th>
                <th className="px-4 py-3 font-normal">Position</th>
                <th className="px-4 py-3 font-normal">Country</th>
                <th className="px-4 py-3 font-normal">Club / Academy</th>
                <th className="px-4 py-3 font-normal">Intelligence</th>
                <th className="px-4 py-3 font-normal">Profile Readiness</th>
                <th className="px-4 py-3 font-normal">Access Status</th>
                <th className="px-4 py-3 font-normal">Shared Date</th>
                <th className="px-4 py-3 text-right font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {players.map((player) => (
                <tr key={player.id} className="transition hover:bg-white/2">
                  <td className="px-4 py-3 font-semibold text-white">{player.name}</td>
                  <td className="px-4 py-3 text-white/50">{player.cfitId}</td>
                  <td className="px-4 py-3 text-white/70">{player.age}</td>
                  <td className="px-4 py-3 text-white/70">{player.position}</td>
                  <td className="px-4 py-3 text-white/70">{player.country}</td>
                  <td className="px-4 py-3 text-white/70">{player.club}</td>
                  <td className="px-4 py-3">
                    <AdminStatusBadge status={player.intelligence} />
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        player.readiness === "Review Ready"
                          ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border border-white/20 bg-white/5 text-white/40"
                      }`}
                    >
                      {player.readiness}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        player.shared
                          ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border border-white/20 bg-white/5 text-white/40"
                      }`}
                    >
                      {player.accessStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-white/50">{player.sharedDate}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleShare(player.id)}
                      className={`text-[11px] font-semibold transition ${
                        player.shared
                          ? "text-red-400 hover:text-red-300 hover:underline"
                          : "text-btn-primary hover:underline"
                      }`}
                    >
                      {player.shared ? "Revoke" : "Share"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 — APPROVED SCOUT NOTES & ACCESS SAFEGUARDS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Approved Scout Notes */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 lg:col-span-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-ethnocentric text-xs tracking-wider text-white">
                Approved Scout Notes
              </h2>
              <p className="mt-0.5 text-[10px] text-white/40">
                Notes remain private unless explicitly approved.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenAddNoteModal}
              className="flex items-center gap-1 rounded bg-btn-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
            >
              <FiPlus /> Add scout-visible note
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border border-white/5 bg-white/2 p-4 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-[10px] font-bold text-amber-300">
                      AM
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{note.type}</span>
                        <span className="text-[10px] text-white/40">{note.target}</span>
                      </div>
                      <p className="mt-1.5 leading-relaxed text-white/80">{note.text}</p>
                    </div>
                  </div>

                  <span
                    className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                      note.visible
                        ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : "border border-white/20 bg-white/5 text-white/40"
                    }`}
                  >
                    {note.visible ? "VISIBLE" : "PRIVATE"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-end gap-3 border-t border-white/5 pt-2 text-[10px]">
                  <button
                    type="button"
                    onClick={() => toggleNoteVisibility(note.id)}
                    className="text-white/60 hover:text-white hover:underline"
                  >
                    {note.visible ? "Remove from scout visibility" : "Approve for scout viewing"}
                  </button>
                  <button
                    type="button"
                    className="text-btn-primary hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Safeguards */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 text-xs lg:col-span-4">
          <h3 className="font-ethnocentric text-xs tracking-wider text-white">
            Access Safeguards
          </h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-2.5 rounded border border-cyan-400/20 bg-cyan-400/5 p-3 text-cyan-300">
              <FiShield className="mt-0.5 shrink-0 text-sm" />
              <div className="text-[10px]">
                <p className="font-bold uppercase tracking-wider">Explicit approval required</p>
                <p className="mt-1 leading-relaxed text-cyan-300/80">
                  Priority status does not mean review-ready, and review-ready does not automatically grant scout access.
                </p>
              </div>
            </div>

            <p className="text-[10px] leading-relaxed text-white/50">
              Suspended and removed scouts cannot access previously shared profiles. Historical sharing records remain available to Admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutPlayerAccessTab;

