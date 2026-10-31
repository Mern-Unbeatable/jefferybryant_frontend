const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CompletionRing = ({ percent }) => (
  <div className="relative h-24 w-24 shrink-0">
    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="9"
      />
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
        className="text-accent transition-[stroke-dashoffset] duration-1000"
      />
    </svg>
    <span className="absolute inset-0 flex items-center justify-center font-ethnocentric text-base">
      {percent}%
    </span>
  </div>
);

export default CompletionRing;

