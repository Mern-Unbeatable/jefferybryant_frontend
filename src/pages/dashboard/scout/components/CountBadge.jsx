const CountBadge = ({ value, label }) => (
  <p className="flex items-center gap-2 border-l border-white/15 pl-4">
    <span className="font-ethnocentric text-2xl">{value}</span>
    <span className="w-16 text-[8px] uppercase leading-tight tracking-wider text-white/45">{label}</span>
  </p>
);

export default CountBadge;
