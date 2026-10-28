import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { LuLayoutGrid, LuTarget } from "react-icons/lu";

const MilestoneProgressCard = ({
  milestone,
  icon: CustomIcon,
  onClick,
}) => {
  const {
    label,
    title,
    current,
    target,
    percentage,
    remaining,
    status,
    tone = "cyan",
    link,
  } = milestone;

  const barColor =
    tone === "yellow"
      ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
      : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]";

  const Content = (
    <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#12171b] p-5 transition hover:border-white/25">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-cyan-400">
              {CustomIcon ? <CustomIcon className="text-base" /> : label?.includes("OVERALL") ? <LuTarget className="text-base" /> : <LuLayoutGrid className="text-base" />}
            </span>
            <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-300">
              {status || "IN PROGRESS"}
            </span>
          </div>
          <FiChevronRight className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white" />
        </div>

        <div className="mt-4">
          <h3 className="font-ethnocentric text-xs tracking-wider text-white">
            {label}
          </h3>
          <p className="mt-1 text-[11px] text-white/50">{title}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-white">{current}</span>
            <span className="text-xs text-white/40">/ {target}</span>
          </div>
          <span className="text-xs font-semibold text-white/70">{percentage}%</span>
        </div>

        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] text-white/45">
          <span>Remaining</span>
          <span className="font-medium text-white/70">{remaining} Players</span>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="group block h-full focus:outline-none">
        {Content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className="group block h-full cursor-pointer">
      {Content}
    </div>
  );
};

export default MilestoneProgressCard;

