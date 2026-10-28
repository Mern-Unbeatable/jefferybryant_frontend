import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const PipelineProgress = ({ data }) => {
  const navigate = useNavigate();

  const handleStageClick = (stageKey) => {
    navigate(`/dashboard/admin/player-management?intelligence=${stageKey.toLowerCase()}`);
  };

  const renderStage = (item) => {
    const isAdvancing = item.tone === "yellow";
    const barColor = isAdvancing
      ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]"
      : "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]";

    const widthPercent = Math.min(Math.round((item.count / item.max) * 100), 100);

    return (
      <div
        key={item.key}
        onClick={() => handleStageClick(item.key)}
        className="group cursor-pointer py-1.5 transition"
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="tracking-widest text-white/50 transition group-hover:text-white">
            {item.key}
          </span>
          <span className="font-semibold text-white/80 transition group-hover:text-accent">
            {item.count}
          </span>
        </div>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${widthPercent}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#12171b] p-5">
      <div>
        <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              Player Intelligence Pipeline
            </h2>
            <p className="mt-0.5 text-[10px] text-white/40">
              Internal classification · {data.totalRecords} active records
            </p>
          </div>
          <Link
            to="/dashboard/admin/player-management"
            className="flex items-center gap-1 text-[10px] text-accent hover:underline"
          >
            Open workspace <FiChevronRight />
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <div className="space-y-3">{data.left.map(renderStage)}</div>
          <div className="space-y-3">{data.right.map(renderStage)}</div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-[10px] text-white/40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Advancing</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Under review</span>
          </span>
        </div>
        <span>Click any stage to view players</span>
      </div>
    </div>
  );
};

export default PipelineProgress;

