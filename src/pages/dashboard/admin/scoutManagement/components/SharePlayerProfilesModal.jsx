import { useState } from "react";
import { FiSearch, FiShield, FiUsers, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import SelectField from "@/components/dashboard/form/SelectField";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const PLAYERS_TO_SHARE = [
  {
    id: 1,
    name: "Malik Thompson",
    cfitId: "CF-2048",
    position: "Right Wing",
    country: "Jamaica",
    statusNote: "Already shared",
    readiness: "Review Ready",
    eligible: true,
  },
  {
    id: 2,
    name: "Noah Clarke",
    cfitId: "CF-2051",
    position: "Centre Back",
    country: "Barbados",
    statusNote: "Ready for share",
    readiness: "Review Ready",
    eligible: true,
  },
  {
    id: 3,
    name: "Kareem Rolle",
    cfitId: "CF-2053",
    position: "Left Back",
    country: "Bahamas",
    statusNote: "Already shared",
    readiness: "Review Ready",
    eligible: true,
  },
  {
    id: 4,
    name: "Elijah Joseph",
    cfitId: "CF-2055",
    position: "Goalkeeper",
    country: "Saint Lucia",
    statusNote: "Not eligible for scout sharing",
    readiness: "Not Ready",
    eligible: false,
  },
];

const SharePlayerProfilesModal = ({ open, onClose, scoutName = "James Mitchell", onConfirmShare }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onConfirmShare?.(selectedIds.length);
    setSelectedIds([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="share-player-profiles-title" className="max-w-2xl">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-btn-primary/20 text-btn-primary">
              <FiUsers className="text-base" />
            </span>
            <div>
              <h3 id="share-player-profiles-title" className="font-ethnocentric text-xs uppercase tracking-wider text-white sm:text-sm">
                Share Player Profiles
              </h3>
              <p className="mt-0.5 text-[10px] text-white/50">
                Recipient: {scoutName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Top Summary Row */}
        <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg border border-white/5 bg-[#12171b] p-3 text-xs">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-white/40">Recipient</p>
            <p className="mt-0.5 font-semibold text-white">{scoutName}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-white/40">Selected profiles</p>
            <p className="mt-0.5 font-semibold text-amber-300">{selectedIds.length}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-white/40">Eligible recipients</p>
            <p className="mt-0.5 font-semibold text-white">1</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search eligible profiles..."
            className="w-full rounded border border-white/15 bg-[#12171b] py-2 pl-3 pr-8 text-xs text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
          />
          <FiSearch className="absolute right-3 top-2.5 text-white/40" />
        </div>

        {/* Filters */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <select className="rounded border border-white/10 bg-[#12171b] p-2 text-[11px] text-white/70 focus:outline-none">
            <option>All countries</option>
          </select>
          <select className="rounded border border-white/10 bg-[#12171b] p-2 text-[11px] text-white/70 focus:outline-none">
            <option>All positions</option>
          </select>
          <select className="rounded border border-white/10 bg-[#12171b] p-2 text-[11px] text-white/70 focus:outline-none">
            <option>All clubs</option>
          </select>
          <select className="rounded border border-white/10 bg-[#12171b] p-2 text-[11px] text-white/70 focus:outline-none">
            <option>All stages</option>
          </select>
        </div>

        {/* 2x2 Player Selection Cards */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PLAYERS_TO_SHARE.map((player) => {
            const isChecked = selectedIds.includes(player.id);
            return (
              <label
                key={player.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-xs transition ${
                  isChecked
                    ? "border-amber-400/50 bg-amber-400/5"
                    : "border-white/10 bg-[#12171b] hover:border-white/20"
                } ${!player.eligible ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <input
                  type="checkbox"
                  disabled={!player.eligible}
                  checked={isChecked}
                  onChange={() => toggleSelect(player.id)}
                  className="mt-1 h-3.5 w-3.5 rounded border-white/20 accent-[#D4AF37]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{player.name}</p>
                    <span
                      className={`rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        player.readiness === "Review Ready"
                          ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : "border border-white/20 bg-white/5 text-white/40"
                      }`}
                    >
                      {player.readiness}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-white/40">
                    {player.cfitId} · {player.position}
                  </p>
                  <p className="text-[10px] text-white/40">{player.country}</p>
                  <p className="mt-1 text-[9px] text-amber-300/80">{player.statusNote}</p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Approved Information Notice Box */}
        <div className="mt-4 flex items-start gap-2.5 rounded border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs text-cyan-300">
          <FiShield className="mt-0.5 shrink-0 text-sm" />
          <div className="text-[10px]">
            <p className="font-bold uppercase tracking-wider">Approved information only</p>
            <p className="mt-0.5 text-cyan-300/70 leading-relaxed">
              Biography, football background, playing history, statistics, highlights, and selected scout-visible notes. Private Admin data remains hidden.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded bg-btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
          >
            Confirm & Share Profiles
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SharePlayerProfilesModal;

