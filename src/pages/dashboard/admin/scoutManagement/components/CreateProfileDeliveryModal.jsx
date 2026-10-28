import { useState } from "react";
import { FiDownload, FiSearch, FiShield, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";

const PLAYERS_TO_DELIVER = [
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
    statusNote: "Review Ready",
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

const CreateProfileDeliveryModal = ({ open, onClose, onConfirm }) => {
  const [deliveryName, setDeliveryName] = useState("Caribbean Review Batch — October 2026");
  const [deliveryDate, setDeliveryDate] = useState("October 2026");
  const [adminNote, setAdminNote] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm?.({
      name: deliveryName,
      date: deliveryDate,
      count: selectedIds.length,
      note: adminNote,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="delivery-modal-title" className="max-w-2xl">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-btn-primary/20 text-btn-primary">
              <FiDownload className="text-base" />
            </span>
            <div>
              <h3 id="delivery-modal-title" className="font-ethnocentric text-xs uppercase tracking-wider text-white sm:text-sm">
                Create Profile Delivery
              </h3>
              <p className="mt-0.5 text-[10px] text-white/50">Recipient: James Mitchell</p>
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

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/50">
                Delivery Name / Reference *
              </label>
              <input
                type="text"
                required
                value={deliveryName}
                onChange={(e) => setDeliveryName(e.target.value)}
                className="w-full rounded border border-white/15 bg-[#12171b] p-2.5 text-xs text-white focus:border-btn-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/50">
                Delivery Date *
              </label>
              <input
                type="text"
                required
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full rounded border border-white/15 bg-[#12171b] p-2.5 text-xs text-white focus:border-btn-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-white/50">
              Optional Admin delivery note
            </label>
            <textarea
              rows={2}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Add contextual delivery information..."
              className="w-full rounded border border-white/15 bg-[#12171b] p-2.5 text-xs text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
            />
          </div>

          {/* Summary Row */}
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-white/5 bg-[#12171b] p-3">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-white/40">Recipient</p>
              <p className="mt-0.5 font-semibold text-white">James Mitchell</p>
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

          {/* Filter dropdowns */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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

          {/* 2x2 Players Checklist */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PLAYERS_TO_DELIVER.map((player) => {
              const isChecked = selectedIds.includes(player.id);
              return (
                <label
                  key={player.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
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

          {/* Notice */}
          <div className="flex items-start gap-2.5 rounded border border-cyan-400/20 bg-cyan-400/5 p-3 text-cyan-300">
            <FiShield className="mt-0.5 shrink-0 text-sm" />
            <div className="text-[10px]">
              <p className="font-bold uppercase tracking-wider">Approved Information only</p>
              <p className="mt-0.5 text-cyan-300/70 leading-relaxed">
                Biography, football background, playing history, statistics, highlights, and selected scout-visible notes. Private Admin data remains hidden.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
            >
              Confirm Delivery
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProfileDeliveryModal;

