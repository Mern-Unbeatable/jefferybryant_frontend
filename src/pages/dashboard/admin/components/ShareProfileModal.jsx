import { useState } from "react";
import { FiDownload, FiShare2, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import SelectField from "@/components/dashboard/form/SelectField";
import { primaryButtonClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import { CLUB_OPTIONS, SCOUT_OPTIONS } from "@/pages/dashboard/admin/adminData";

const ShareProfileModal = ({ open, onClose, players = [], onShareSuccess }) => {
  const [selectedScout, setSelectedScout] = useState(SCOUT_OPTIONS[0].name);
  const [selectedClub, setSelectedClub] = useState(CLUB_OPTIONS[0].name);
  const [selectedPlayer, setSelectedPlayer] = useState(
    players[0] ? `${players[0].name} (${players[0].cfitId})` : ""
  );
  const [submitting, setSubmitting] = useState(false);

  const scoutList = SCOUT_OPTIONS.map((s) => ({
    value: s.name,
    label: `${s.name} · ${s.organization}`,
  }));

  const clubList = CLUB_OPTIONS.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  const playerList = players.map((p) => ({
    value: `${p.name} (${p.cfitId})`,
    label: `${p.name} (${p.cfitId}) · ${p.mainPosition}`,
  }));

  const handleShare = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onShareSuccess?.({
        scout: selectedScout,
        club: selectedClub,
        player: selectedPlayer,
      });
      onClose();
    }, 400);
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="share-profile-title" className="max-w-md">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-btn-primary/20 text-btn-primary">
              <FiShare2 className="text-lg" />
            </span>
            <div>
              <h2 id="share-profile-title" className="font-ethnocentric text-sm uppercase tracking-wider text-white">
                Share Profile
              </h2>
              <p className="mt-0.5 text-[11px] text-white/50">
                Recipient: <span className="text-white/80">{selectedScout || "James Mitchell"}</span>
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

        {/* Form */}
        <form onSubmit={handleShare} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="scoutName" className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
              Scout Name
            </label>
            <SelectField
              id="scoutName"
              name="scoutName"
              value={selectedScout}
              onChange={(_, val) => setSelectedScout(val)}
              options={scoutList}
            />
          </div>

          <div>
            <label htmlFor="clubName" className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
              Club Name
            </label>
            <SelectField
              id="clubName"
              name="clubName"
              value={selectedClub}
              onChange={(_, val) => setSelectedClub(val)}
              options={clubList}
            />
          </div>

          <div>
            <label htmlFor="playerName" className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
              Player name
            </label>
            <SelectField
              id="playerName"
              name="playerName"
              value={selectedPlayer}
              onChange={(_, val) => setSelectedPlayer(val)}
              options={playerList}
            />
          </div>

          {/* Footer Actions */}
          <div className="mt-4 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`${secondaryButtonClass} text-xs`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`${primaryButtonClass} text-xs disabled:opacity-50`}
            >
              {submitting ? "Sharing..." : "Share Profile"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ShareProfileModal;

