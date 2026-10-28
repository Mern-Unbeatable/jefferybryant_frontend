import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const RecordStatusCard = ({ player }) => {
  return (
    <div className="rounded-lg border border-white/10 bg-[#12171b] p-4 text-xs">
      <h2 className="font-ethnocentric text-xs tracking-wider text-white">
        Record Status
      </h2>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white/50">Profile completion</span>
          <span className="font-bold text-white">{player.profileCompletion}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white/50">Verification</span>
          <AdminStatusBadge status={player.verification} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white/50">Intelligence</span>
          <AdminStatusBadge status={player.intelligence} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white/50">Scout visibility</span>
          <span className="rounded-sm border border-white/20 bg-white/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/50">
            {player.scoutVisibility || "DISABLED"}
          </span>
        </div>
      </div>

      <p className="mt-5 border-t border-white/10 pt-3 text-[9px] leading-relaxed text-white/30">
        These statuses are independent and do not update one another.
      </p>
    </div>
  );
};

export default RecordStatusCard;

