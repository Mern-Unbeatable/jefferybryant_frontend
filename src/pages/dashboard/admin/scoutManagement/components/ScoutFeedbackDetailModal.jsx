import { useState } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";

const ScoutFeedbackDetailModal = ({ feedback, open, onClose, onUpdateStatus }) => {
  if (!feedback) return null;

  const [adminNote, setAdminNote] = useState("");
  const [currentStatus, setCurrentStatus] = useState(feedback.followUp || "In Progress");

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
    onUpdateStatus?.(feedback.id, status, adminNote);
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="feedback-detail-title" className="max-w-4xl">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Scout Feedback
            </p>
            <h2 id="feedback-detail-title" className="mt-1 font-ethnocentric text-xl uppercase tracking-wider text-white">
              {feedback.actionType}
            </h2>
            <p className="mt-0.5 text-xs text-white/50">{feedback.date}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {/* Scout Information */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 text-xs">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Scout Information
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Name</p>
                <p className="mt-1 font-semibold uppercase text-white">{feedback.scout}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Organization</p>
                <p className="mt-1 font-semibold uppercase text-white">{feedback.organization}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Position / Title</p>
                <p className="mt-1 font-semibold uppercase text-white">TALENT SCOUT</p>
              </div>
            </div>
          </div>

          {/* Player Information */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 text-xs">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Player Information
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Player</p>
                <p className="mt-1 font-semibold text-white">{feedback.player}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Player ID</p>
                <p className="mt-1 font-semibold text-white">{feedback.playerId}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Position</p>
                <p className="mt-1 font-semibold text-white">Centre Back</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Country</p>
                <p className="mt-1 font-semibold text-white">Barbados</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/40">Intelligence Stage</p>
                <p className="mt-1 font-semibold text-amber-300">Review</p>
              </div>
            </div>
          </div>

          {/* Scout Action */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 text-xs">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Scout Action
            </h3>
            <div className="mt-3">
              <span className="rounded-sm border border-cyan-400/40 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300">
                {feedback.actionType}
              </span>
              <p className="mt-3 text-xs leading-relaxed text-white/80">{feedback.feedback}</p>
            </div>
          </div>

          {/* Admin Follow-Up */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-ethnocentric text-xs tracking-wider text-white">
                Admin Follow-Up
              </h3>
              <span
                className={`rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  currentStatus === "Resolved" || currentStatus === "Recorded"
                    ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border border-amber-400/40 bg-amber-400/10 text-amber-300"
                }`}
              >
                {currentStatus}
              </span>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/40">
                Internal Admin note
              </label>
              <textarea
                rows={3}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Add private follow-up context..."
                className="w-full rounded border border-white/15 bg-white/5 p-3 text-xs text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange("Recorded")}
                  className={`rounded border px-3 py-1.5 text-xs font-medium transition ${
                    currentStatus === "Recorded"
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                      : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  Recorded
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange("In Progress")}
                  className={`rounded border px-3 py-1.5 text-xs font-medium transition ${
                    currentStatus === "In Progress"
                      ? "border-amber-400 bg-amber-400/20 text-amber-300"
                      : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  Mark as In Progress
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange("Resolved")}
                  className="rounded bg-btn-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
                >
                  Mark as Resolved
                </button>
              </div>

              <Link
                to={`/dashboard/admin/player-management/1`}
                className="text-xs font-medium text-cyan-400 hover:underline"
              >
                Open Player Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ScoutFeedbackDetailModal;

