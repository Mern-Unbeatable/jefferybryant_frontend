import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const OverviewTab = ({ player, onEditClick }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[9px] uppercase tracking-wider text-white/40">Profile Completion</p>
          <p className="mt-2 text-xl font-bold text-white">{player.profileCompletion}%</p>
          <span className="mt-3 inline-block rounded-sm bg-cyan-400/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-cyan-300">
            Profile Data
          </span>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[9px] uppercase tracking-wider text-white/40">Verification</p>
          <p className="mt-2 text-xl font-bold uppercase text-white">{player.verification}</p>
          <span className="mt-3 inline-block rounded-sm bg-cyan-400/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-cyan-300">
            Accuracy Check
          </span>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[9px] uppercase tracking-wider text-white/40">Intelligence</p>
          <p className="mt-2 text-xl font-bold uppercase text-amber-300">{player.intelligence}</p>
          <span className="mt-3 inline-block rounded-sm bg-amber-400/10 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-amber-300">
            Recruitment Stage
          </span>
        </div>

        {/* Card 4 */}
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <p className="text-[9px] uppercase tracking-wider text-white/40">Scout Visibility</p>
          <p className="mt-2 text-xl font-bold uppercase text-white/70">{player.scoutVisibility || "DISABLED"}</p>
          <span className="mt-3 inline-block rounded-sm bg-white/5 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-white/40">
            Access Control
          </span>
        </div>
      </div>

      {/* Player Summary Card */}
      <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="font-ethnocentric text-xs tracking-wider text-white">
            Player Summary
          </h2>
          <button
            type="button"
            onClick={onEditClick}
            className="text-[10px] font-semibold uppercase tracking-wider text-btn-primary hover:underline"
          >
            Edit Information
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Full legal name</p>
              <p className="mt-1 font-semibold uppercase text-white">{player.name}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Date of birth / age</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.dob || "22 MARCH 2008"} · {player.age} YEARS
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Primary / secondary position</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.mainPosition} · {player.subPosition || "FORWARD"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Email Address</p>
              <p className="mt-1 font-semibold uppercase text-white">{player.email}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Player ID</p>
              <p className="mt-1 font-semibold uppercase text-white">{player.cfitId}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Residence</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.residence || `${player.city}, ${player.country}`}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Current academy</p>
              <p className="mt-1 font-semibold uppercase text-white">{player.club}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 status summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <AdminStatusBadge status={player.verification} />
          <p className="mt-2 text-xs font-semibold text-white">Verification status</p>
          <p className="mt-0.5 text-[10px] text-white/40">Submitted information accuracy</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <AdminStatusBadge status={player.intelligence} />
          <p className="mt-2 text-xs font-semibold text-white">Intelligence stage</p>
          <p className="mt-0.5 text-[10px] text-white/40">Internal recruitment progress</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#12171b] p-4">
          <span className="rounded-sm border border-white/20 bg-white/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/50">
            {player.scoutVisibility || "DISABLED"}
          </span>
          <p className="mt-2 text-xs font-semibold text-white">Scout visibility</p>
          <p className="mt-0.5 text-[10px] text-white/40">Professional portal access</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;

