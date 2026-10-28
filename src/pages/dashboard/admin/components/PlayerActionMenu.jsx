import { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const VERIFICATION_OPTIONS = ["Verified", "Pending"];
const INTELLIGENCE_OPTIONS = [
  "Submitted",
  "Verification",
  "Watch",
  "Review",
  "Priority",
  "Pass",
  "Archived",
];

const PlayerActionMenu = ({
  player,
  onSeeDetails,
  onUpdateVerification,
  onUpdateIntelligence,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Player actions"
        className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-white/5 text-white/60 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
      >
        <FiMoreHorizontal />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1.5 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white p-2 text-gray-800 shadow-2xl">
          {/* See Details button */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onSeeDetails?.(player);
            }}
            className="w-full rounded bg-btn-primary px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
          >
            See Details
          </button>

          {/* Verification section */}
          <div className="mt-2.5 border-t border-gray-100 pt-2">
            <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-900">
              Verification
            </p>
            <div className="space-y-0.5">
              {VERIFICATION_OPTIONS.map((status) => {
                const isSelected = player.verification === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onUpdateVerification?.(player, status);
                    }}
                    className={`flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs transition ${
                      isSelected
                        ? "bg-gray-100 font-semibold text-emerald-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span>{status}</span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intelligence section */}
          <div className="mt-2.5 border-t border-gray-100 pt-2">
            <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-900">
              Intelligence
            </p>
            <div className="space-y-0.5">
              {INTELLIGENCE_OPTIONS.map((stage) => {
                const isSelected = player.intelligence === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onUpdateIntelligence?.(player, stage);
                    }}
                    className={`flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs transition ${
                      isSelected
                        ? "bg-amber-50 font-semibold text-amber-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span>{stage}</span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerActionMenu;

