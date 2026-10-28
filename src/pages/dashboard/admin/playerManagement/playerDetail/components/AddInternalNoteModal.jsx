import { useState } from "react";
import { FiEdit3, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import { primaryButtonClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";

const AddInternalNoteModal = ({ open, onClose, onSaveNote }) => {
  const [noteText, setNoteText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onSaveNote(noteText.trim());
    setNoteText("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="note-modal-title" className="max-w-md">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FiEdit3 className="text-accent" />
            <h3 id="note-modal-title" className="text-sm font-semibold uppercase tracking-wider">
              Add Internal Note
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <p className="text-[11px] text-white/50">
            Internal notes are only visible to CFit administrators and assigned technical scouts.
          </p>

          <textarea
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter administrative observation, verification update, or scout feedback..."
            className="w-full rounded border border-white/15 bg-white/5 p-3 text-xs text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
            required
          />

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className={secondaryButtonClass}>
              Cancel
            </button>
            <button type="submit" className={primaryButtonClass}>
              Save Note
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddInternalNoteModal;

