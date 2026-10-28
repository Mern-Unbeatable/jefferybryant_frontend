import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";
import { getInitials } from "@/utils/getInitials";

const PlayerDetailHeader = ({ player, onChangeStageClick }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Back button */}
      <div>
        <Link
          to="/dashboard/admin/player-management"
          className="inline-flex items-center gap-1.5 text-xs text-white/50 transition hover:text-white"
        >
          <FiArrowLeft className="text-sm" />
          <span>Back to player directory</span>
        </Link>
      </div>

      {/* Main Player Profile Banner */}
      <div className="rounded-lg border border-white/10 bg-[#12171b] p-5">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/15 bg-white/5 sm:h-20 sm:w-20">
              {player.photo ? (
                <img
                  src={player.photo}
                  alt={player.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-ethnocentric text-lg text-accent">
                  {getInitials(player.name)}
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <AdminStatusBadge status={player.verification} />
                <AdminStatusBadge status={player.intelligence} />
                <span className="rounded-sm border border-white/20 bg-white/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/50">
                  {player.scoutVisibility === "Enabled" ? "Scout Access On" : "Scout Access Off"}
                </span>
              </div>

              <h1 className="mt-2 font-ethnocentric text-xl uppercase tracking-wider text-white sm:text-2xl">
                {player.name}
              </h1>

              <p className="mt-1 text-xs text-white/60">
                {player.cfitId} · {player.age} years · {player.mainPosition} · {player.residence || `${player.city}, ${player.country}`}
              </p>
            </div>
          </div>

          {/* Change Stage Button */}
          <button
            type="button"
            onClick={onChangeStageClick}
            className="self-start rounded bg-btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90 sm:self-center"
          >
            Change stage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailHeader;

