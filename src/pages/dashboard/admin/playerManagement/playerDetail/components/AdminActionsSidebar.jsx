const VERIFICATION_BUTTONS = ["Verified", "Pending"];
const INTELLIGENCE_BUTTONS = [
  "Submitted",
  "Verification",
  "Watch",
  "Review",
  "Priority",
  "Pass",
  "Archived",
];

const AdminActionsSidebar = ({
  player,
  onAddNoteClick,
  onUpdateVerification,
  onUpdateIntelligence,
}) => {
  return (
    <div className="rounded-lg border border-white/10 bg-[#12171b] p-4 text-xs">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
        Admin Actions
      </h2>

      {/* Add Internal Note */}
      <button
        type="button"
        onClick={onAddNoteClick}
        className="mt-3 w-full rounded border border-white/15 bg-white/5 py-2.5 text-center text-xs font-medium text-white transition hover:border-white/30 hover:bg-white/10"
      >
        Add Internal Note
      </button>

      {/* Verification section */}
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-white/40">
          Verification
        </p>
        <div className="mt-2 space-y-2">
          {VERIFICATION_BUTTONS.map((status) => {
            const isActive = player.verification?.toLowerCase() === status.toLowerCase();
            return (
              <button
                key={status}
                type="button"
                onClick={() => onUpdateVerification(status)}
                className={`w-full rounded py-2 text-center text-xs font-semibold transition ${
                  isActive
                    ? "bg-emerald-500 text-white shadow"
                    : "border border-white/10 bg-white/3 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Intelligence section */}
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-white/40">
          Intelligence
        </p>
        <div className="mt-2 space-y-1.5">
          {INTELLIGENCE_BUTTONS.map((stage) => {
            const isActive = player.intelligence?.toLowerCase() === stage.toLowerCase();
            return (
              <button
                key={stage}
                type="button"
                onClick={() => onUpdateIntelligence(stage)}
                className={`w-full rounded py-1.5 text-center text-xs font-medium transition ${
                  isActive
                    ? "bg-amber-400 font-bold text-primary shadow"
                    : "border border-white/5 bg-white/2 text-white/50 hover:border-white/15 hover:bg-white/5 hover:text-white"
                }`}
              >
                {stage}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminActionsSidebar;

