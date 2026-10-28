import { getInitials } from "@/utils/getInitials";

const PersonalPhysicalTab = ({ player }) => {
  return (
    <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-ethnocentric text-xs tracking-wider text-white">
          Personal & Physical Information
        </h2>
        <p className="mt-1 text-[11px] text-white/50">
          Player-submitted identity and physical information.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
        {/* Profile Avatar Frame */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white/15 bg-white/5 sm:h-24 sm:w-24">
          {player.photo ? (
            <img src={player.photo} alt={player.name} className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-ethnocentric text-xl text-accent">
              {getInitials(player.name)}
            </span>
          )}
        </div>

        {/* 2 Columns Data Grid */}
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Full legal name</p>
              <p className="mt-1 font-semibold uppercase text-white">{player.name}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Age</p>
              <p className="mt-1 font-semibold uppercase text-white">{player.age} YEARS</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Residence/Country</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.residence || `${player.city}, ${player.country}`}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Weight</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.weight || "158 LB · DEMO DATA"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Primary position</p>
              <p className="mt-1 font-semibold uppercase text-white">{player.mainPosition}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Date of birth</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.dob || "22 MARCH 2008"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Nationality</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.nationality || player.country}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Height</p>
              <p className="mt-1 font-semibold uppercase text-white">{player.height || "5'11\""}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Preferred foot</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.preferredFoot || "LEFT"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Secondary position</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {player.subPosition || "FORWARD"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPhysicalTab;

