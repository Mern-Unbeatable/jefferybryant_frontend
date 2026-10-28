import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const StatCard = ({ stat }) => {
  const { value, label, icon: Icon, tone = "cyan", path } = stat;

  const iconClasses =
    tone === "yellow"
      ? "text-amber-400 bg-amber-400/10 border-amber-400/20"
      : "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";

  const Content = (
    <div className="group flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#12171b] p-4 transition duration-200 hover:border-white/25 hover:bg-[#151c22]">
      <div className="flex items-center justify-between">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm ${iconClasses}`}
        >
          <Icon />
        </span>
        <FiChevronRight className="text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white" />
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
        <p className="mt-1 text-[11px] text-white/50">{label}</p>
      </div>
    </div>
  );

  if (path) {
    return (
      <Link to={path} className="block h-full focus:outline-none">
        {Content}
      </Link>
    );
  }

  return Content;
};

export default StatCard;

