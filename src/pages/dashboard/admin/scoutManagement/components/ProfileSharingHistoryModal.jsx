import { FiCheck, FiChevronRight, FiEye, FiLock, FiShield, FiTrendingUp, FiUser, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";

const ProfileSharingHistoryModal = ({ record, open, onClose }) => {
  if (!record) return null;

  return (
    <Modal open={open} onClose={onClose} labelledBy="history-title" className="max-w-4xl">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Read-Only Access Record
            </p>
            <h2 id="history-title" className="mt-1 font-ethnocentric text-xl uppercase tracking-wider text-white">
              Profile Sharing History
            </h2>
            <p className="mt-0.5 text-xs text-white/50">
              {record.player || "Malik Thompson"} · {record.playerId || "CF-2048"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-6 text-xs">
          {/* Current Access Status Card */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  <FiEye className="text-lg" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Current Access Status</p>
                  <p className="font-semibold text-white">
                    {record.player || "Malik Thompson"} shared with {record.scout || "James Mitchell"}
                  </p>
                  <p className="text-[10px] text-white/40">Individual access · Record AC-1</p>
                </div>
              </div>
              <span className="rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                {record.currentAccess || "Shared / Accessible"}
              </span>
            </div>

            {/* 3 Stats Grid */}
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">Recipient type</p>
                <p className="mt-1 font-semibold text-white">Scout</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">First shared</p>
                <p className="mt-1 font-semibold text-white">18 Jun 2025</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">Review actions</p>
                <p className="mt-1 font-semibold text-white">1</p>
              </div>
            </div>
          </div>

          {/* Player & Recipient Details */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Player & Recipient Details
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/2 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-300">
                    MT
                  </span>
                  <div>
                    <p className="font-semibold text-white">{record.player || "Malik Thompson"}</p>
                    <p className="text-[10px] text-white/40">CF-2048 · Right Wing · Jamaica</p>
                  </div>
                </div>
                <FiChevronRight className="text-white/30" />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/2 p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-300">
                    <FiUser />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{record.scout || "James Mitchell"}</p>
                    <p className="text-[10px] text-white/40">Professional Scout · Nashville SC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/5 pt-4 sm:grid-cols-3">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">Profile readiness</p>
                <p className="mt-1 font-semibold text-emerald-400">Review Ready</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">Intelligence stage</p>
                <p className="mt-1 font-semibold text-amber-300">Priority</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">Access source</p>
                <p className="mt-1 font-semibold text-white">Individual access</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">Shared by</p>
                <p className="mt-1 font-semibold text-white">Alex Morgan</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">Shared date & time</p>
                <p className="mt-1 font-semibold text-white">{record.sharedDateTime || "18 Jun 2025 · 10:14"}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/40">Current state</p>
                <p className="mt-1 font-semibold text-emerald-400">Shared / Accessible</p>
              </div>
            </div>
          </div>

          {/* Approved Visibility Scope */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Approved Visibility Scope
            </h3>
            <p className="mt-0.5 text-[10px] text-white/40">Information made available through this sharing record.</p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <span className="rounded-sm bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-300">
                  Scout Visible
                </span>
                <ul className="mt-3 space-y-2 text-[11px] text-white/80">
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-emerald-400" /> Approved biography and football information
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-emerald-400" /> Playing history and relevant statistics
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-emerald-400" /> Highlight videos
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="text-emerald-400" /> Explicitly approved scout notes
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/2 p-4">
                <span className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white/50">
                  Admin Only
                </span>
                <ul className="mt-3 space-y-2 text-[11px] text-white/50">
                  <li className="flex items-center gap-2">
                    <FiLock className="text-white/40" /> Private intelligence notes
                  </li>
                  <li className="flex items-center gap-2">
                    <FiLock className="text-white/40" /> Relationship management context
                  </li>
                  <li className="flex items-center gap-2">
                    <FiLock className="text-white/40" /> Unapproved evaluations
                  </li>
                  <li className="flex items-center gap-2">
                    <FiLock className="text-white/40" /> Guardian and private contacts
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Linked Scout Review Activity */}
          <div className="rounded-lg border border-white/10 bg-[#12171b] p-5">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Linked Scout Review Activity
            </h3>
            <p className="mt-0.5 text-[10px] text-white/40">1 feedback record associated with this access.</p>

            <div className="mt-3 flex items-center justify-between rounded-lg border border-white/5 bg-white/2 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                  <FiTrendingUp className="text-sm" />
                </span>
                <div>
                  <p className="font-semibold text-white">Continue Monitoring</p>
                  <p className="text-[10px] text-white/40">Interested in tracking the player's development.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                  Recorded
                </span>
                <FiChevronRight className="text-white/40" />
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2.5 rounded border border-amber-400/20 bg-amber-400/5 p-3 text-[10px] text-amber-300">
            <FiShield className="shrink-0 text-sm" />
            <p className="leading-relaxed">
              <span className="font-bold uppercase tracking-wider">Historical record protected:</span> This audit record cannot be edited or deleted. Access changes create new timeline events.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileSharingHistoryModal;

