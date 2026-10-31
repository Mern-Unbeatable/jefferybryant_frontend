import { Link } from "react-router-dom";
import { FiEdit2, FiFlag, FiInfo, FiShield } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import {
  CURRENT_STATUS,
  PLAYER_ID,
  welcomeMeta,
} from "@/pages/dashboard/player/playerData";

const playerPath = (path) => `/dashboard/player/${path}`;

/**
 * PlayerWelcomeBanner - Header welcome card displaying player identity, position, status, and edit action
 *
 * @param {Function} onOpenStatusModal - Callback when status info button is clicked
 */
const PlayerWelcomeBanner = ({ onOpenStatusModal }) => {
  const { user } = useAuth();

  const playerName = user?.name
    ? user.name.toLowerCase().includes("tariq")
      ? "TARIQ A. STERLING"
      : user.name.toUpperCase()
    : "TARIQ A. STERLING";

  return (
    <section className="rounded-xl border border-white/10 bg-[#12171b] p-5 sm:p-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Player Avatar with Gold Border and Position Badge */}
      <div className="relative h-20 w-20 shrink-0 sm:h-26 sm:w-26">
        <div className="h-full w-full overflow-hidden rounded-lg border border-amber-400/50 bg-[#161b1f]">
          <img
            src={user?.photo || "/player/samplePlayer.png"}
            alt={playerName}
            className="h-full w-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/player/samplePlayer.png";
            }}
          />
        </div>
        <span className="absolute -bottom-1 -right-1 z-10 rounded bg-[#F59E0B] px-1.5 py-0.5 text-[10px] font-extrabold uppercase leading-none text-[#12171b] shadow-md">
          {welcomeMeta.positionCode}
        </span>
      </div>

      {/* Player Meta Information */}
      <div className="min-w-0 flex-1">
        {/* Top Info Row: CFIT ID, Status Badge, Info Button */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="font-medium uppercase tracking-wider text-white/45">
            CFIT ID:{" "}
            <span className="font-semibold text-accent">{PLAYER_ID}</span>
          </span>

          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <FiShield className="text-xs" />
            <span>{CURRENT_STATUS}</span>
          </span>

          <button
            type="button"
            onClick={onOpenStatusModal}
            aria-label="View profile status terminology"
            className="text-white/45 transition-colors hover:text-white"
          >
            <FiInfo className="text-xs" />
          </button>
        </div>

        {/* Welcome Heading with Exact Figma Linear Gradient */}
        <h1 className="mt-1.5 font-ethnocentric text-lg uppercase tracking-wider sm:text-xl lg:text-3xl font-bold bg-[linear-gradient(90deg,#FFFFFF_0%,#01EFFD_45%,#01AAB4_100%)] bg-clip-text text-transparent">
          WELCOME BACK, {playerName}
        </h1>

        {/* Subtitle */}
        <p className="mt-1 text-sm text-white/50">
          Manage your football profile and keep your information up to date.
        </p>

        {/* Bottom Attributes: Position, Location, Academy */}
        <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-white/80">
          <li className="flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
            <span>{welcomeMeta.position}</span>
          </li>
          <li className="flex items-center gap-1.5 font-medium">
            <FiFlag className="text-[#01EFFD] text-xs shrink-0" />
            <span>{welcomeMeta.location}</span>
          </li>
          <li className="flex items-center gap-1.5 font-medium">
            <FiShield className="text-amber-400 text-xs shrink-0" />
            <span>{welcomeMeta.club}</span>
          </li>
        </ul>
      </div>

      {/* Edit Information Action Button */}
      <Link
        to={playerPath("personal-physical")}
        className="flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-btn-primary px-4 py-2.5 text-xs font-semibold text-[#12171b] transition hover:bg-amber-300 sm:self-center shadow-sm"
      >
        <FiEdit2 className="text-xs" />
        <span>Edit Information</span>
      </Link>
    </section>
  );
};

export default PlayerWelcomeBanner;
