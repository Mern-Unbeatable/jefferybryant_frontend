import { FiMail, FiMapPin, FiPhone, FiUser, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";
import { getInitials } from "@/utils/getInitials";

const PlayerDetailModal = ({ player, open, onClose }) => {
  if (!player) return null;

  return (
    <Modal open={open} onClose={onClose} labelledBy="player-detail-title" className="max-w-lg">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 font-ethnocentric text-sm text-accent">
              {getInitials(player.name)}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="player-detail-title" className="font-ethnocentric text-base uppercase text-white">
                  {player.name}
                </h2>
                <AdminStatusBadge status={player.verification} />
              </div>
              <p className="mt-1 text-xs text-white/50">
                {player.cfitId} · Age {player.age} · {player.club}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded border border-white/10 bg-white/3 p-3">
            <p className="text-[9px] uppercase tracking-wider text-white/40">Position</p>
            <p className="mt-1 text-xs font-semibold text-white">{player.mainPosition}</p>
          </div>
          <div className="rounded border border-white/10 bg-white/3 p-3">
            <p className="text-[9px] uppercase tracking-wider text-white/40">Secondary</p>
            <p className="mt-1 text-xs font-semibold text-white">{player.subPosition || "—"}</p>
          </div>
          <div className="rounded border border-white/10 bg-white/3 p-3">
            <p className="text-[9px] uppercase tracking-wider text-white/40">Intelligence</p>
            <p className="mt-1 text-xs font-semibold text-amber-300">{player.intelligence}</p>
          </div>
          <div className="rounded border border-white/10 bg-white/3 p-3">
            <p className="text-[9px] uppercase tracking-wider text-white/40">Profile</p>
            <p className="mt-1 text-xs font-semibold text-cyan-300">{player.profileCompletion}%</p>
          </div>
        </div>

        {/* Details List */}
        <div className="mt-5 space-y-3 rounded-md border border-white/10 bg-white/2 p-4 text-xs">
          <div className="flex items-center gap-2 text-white/70">
            <FiMapPin className="shrink-0 text-accent" />
            <span>
              {player.city}, {player.country}
            </span>
          </div>
          {player.email && (
            <div className="flex items-center gap-2 text-white/70">
              <FiMail className="shrink-0 text-accent" />
              <span>{player.email}</span>
            </div>
          )}
          {player.phone && (
            <div className="flex items-center gap-2 text-white/70">
              <FiPhone className="shrink-0 text-accent" />
              <span>{player.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-white/70">
            <FiUser className="shrink-0 text-accent" />
            <span>Submitted on {player.submitted}</span>
          </div>
        </div>

        {/* Scout Notes */}
        {player.notes && (
          <div className="mt-4 rounded-md border border-white/10 bg-white/3 p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
              Admin & Scout Notes
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/80">{player.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/15"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PlayerDetailModal;

