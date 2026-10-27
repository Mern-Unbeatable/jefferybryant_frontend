const tones = {
  accent: "border-accent/40 bg-accent/10 text-accent",
  yellow: "border-btn-primary/40 bg-btn-primary/10 text-btn-primary",
  green: "border-green-500/60 bg-green-500/15 text-green-400",
  red: "border-red-500/50 bg-red-500/10 text-red-400",
};

const STATUS_TONES = {
  verified: "accent",
  complete: "accent",
  received: "accent",
  incomplete: "yellow",
  milestone: "yellow",
  approved: "green",
  pending: "yellow",
  reviewed: "accent",
  forwarded: "green",
  underReview: "yellow",
  responded: "accent",
  completed: "green",
  recorded: "red",
};

const StatusBadge = ({ status, children }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-0.5 text-[9px] uppercase tracking-wider ${
      tones[STATUS_TONES[status] ?? "accent"]
    }`}
  >
    <span className="h-1 w-1 rounded-full bg-current" />
    {children}
  </span>
);

export default StatusBadge;
