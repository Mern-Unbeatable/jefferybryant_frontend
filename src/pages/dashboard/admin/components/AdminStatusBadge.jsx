const tones = {
  green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
  yellow: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  gold: "border-amber-400/50 bg-amber-400/15 text-amber-300 font-medium",
  blue: "border-blue-400/40 bg-blue-400/10 text-blue-300",
  purple: "border-purple-400/40 bg-purple-400/10 text-purple-300",
  gray: "border-white/20 bg-white/5 text-white/50",
  red: "border-red-400/40 bg-red-400/10 text-red-300",
};

const mapStatusToTone = (status) => {
  if (!status) return "gray";
  const s = String(status).toLowerCase().trim();
  switch (s) {
    case "verified":
    case "approved":
    case "active":
    case "presented":
    case "complete":
    case "accepted":
      return "green";

    case "ready to review":
    case "ready_to_review":
    case "under review":
    case "under_review":
    case "in progress":
    case "in_progress":
    case "pending":
    case "submitted":
    case "invitation pending":
      return "yellow";

    case "priority":
      return "gold";

    case "verification":
      return "cyan";

    case "watch":
      return "blue";

    case "review":
      return "purple";

    case "pass":
    case "inactive":
    case "suspended":
    case "archived":
      return "gray";

    default:
      return "cyan";
  }
};

const AdminStatusBadge = ({ status, tone: customTone, children, dot = true }) => {
  const toneKey = customTone || mapStatusToTone(status || children);
  const toneClasses = tones[toneKey] || tones.cyan;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-0.5 text-[9px] uppercase tracking-wider ${toneClasses}`}
    >
      {dot && <span className="h-1 w-1 rounded-full bg-current" />}
      {children || status}
    </span>
  );
};

export default AdminStatusBadge;

