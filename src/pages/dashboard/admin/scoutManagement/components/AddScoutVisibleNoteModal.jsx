import { useState } from "react";
import { FiUsers, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";

const AddScoutVisibleNoteModal = ({ open, onClose, onSave }) => {
  const [note, setNote] = useState("");

  const handleSavePrivate = () => {
    if (!note.trim()) return;
    onSave?.(note, false);
    setNote("");
    onClose();
  };

  const handleSaveVisible = () => {
    if (!note.trim()) return;
    onSave?.(note, true);
    setNote("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="scout-note-title" className="max-w-md">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-btn-primary/20 text-btn-primary">
              <FiUsers className="text-base" />
            </span>
            <div>
              <h3 id="scout-note-title" className="font-ethnocentric text-xs uppercase tracking-wider text-white sm:text-sm">
                Add Scout-Visible Note
              </h3>
              <p className="mt-0.5 text-[10px] text-white/50">
                Sensitive access changes are recorded in Activity History
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Textarea */}
        <div className="mt-5">
          <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
            Scout-visible note
          </label>
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add information explicitly approved for scout viewing..."
            className="w-full rounded border border-white/15 bg-[#12171b] p-3 text-xs text-white placeholder-white/30 focus:border-btn-primary focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSavePrivate}
            className="rounded border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-amber-300 transition hover:bg-amber-400/20"
          >
            Private Note
          </button>
          <button
            type="button"
            onClick={handleSaveVisible}
            className="rounded bg-btn-primary px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
          >
            Scout visible note
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddScoutVisibleNoteModal;

