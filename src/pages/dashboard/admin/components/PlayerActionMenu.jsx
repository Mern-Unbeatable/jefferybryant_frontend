import { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const VERIFICATION_OPTIONS = ["Verified", "Pending", "Ready To Review"];
const INTELLIGENCE_OPTIONS = [
  "Submitted",
  "Verification",
  "Watch",
  "Review",
  "Priority",
  "Pass",
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
        <div className="absolute right-0 z-50 mt-1.5 w-44 rounded-md border border-white/15 bg-[#161b1f] p-1.5 shadow-2xl backdrop-blur-md">
          {/* See Details button */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onSeeDetails?.(player);
            }}
            className="w-full rounded bg-btn-primary px-3 py-1.5 text-left text-xs font-semibold text-primary transition hover:bg-btn-primary/90"
          >
            See Details
          </button>

          {/* Verification section */}
          <div className="mt-2 border-t border-white/10 pt-2">
            <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-wider text-white/40">
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
                        ? "bg-white/10 font-medium text-accent"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{status}</span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intelligence section */}
          <div className="mt-2 border-t border-white/10 pt-2">
            <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-wider text-white/40">
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
                        ? "bg-white/10 font-medium text-amber-300"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{stage}</span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
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

