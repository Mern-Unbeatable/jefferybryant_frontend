const INITIAL_EVENTS = [
  {
    id: 1,
    tag: "INTELLIGENCE",
    title: "Stage changed",
    subtitle: "REVIEW → PRIORITY",
    authorMeta: "Alex Morgan · 18 Jun 2025 · 10:24 AST",
  },
  {
    id: 2,
    tag: "VERIFICATION",
    title: "Player record verified",
    subtitle: "Verification status updated to VERIFIED",
    authorMeta: "Alex Morgan · 14 Jun 2025 · 15:58 AST",
  },
  {
    id: 3,
    tag: "VIDEO",
    title: "Highlight video updated",
    subtitle: "2025 Player Highlights replaced previous link",
    authorMeta: "Malik Thompson · 12 Jun 2025 · 17:04 AST",
  },
  {
    id: 4,
    tag: "PROFILE",
    title: "Physical information updated",
    subtitle: "Height changed from 5'10\" to 5'11\"",
    authorMeta: "Malik Thompson · 10 Jun 2025 · 12:45 AST",
  },
  {
    id: 5,
    tag: "REGISTRATION",
    title: "Player profile registered",
    subtitle: "CF-2048 created through Harbour View Academy",
    authorMeta: "Malik Thompson · 22 Mar 2025 · 09:42 AST",
  },
];

const ActivityHistoryTab = ({ player }) => {
  const events = INITIAL_EVENTS;

  return (
    <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-ethnocentric text-xs tracking-wider text-white">
          Activity History
        </h2>
        <p className="mt-1 text-[11px] text-white/50">
          {events.length} recorded events this season and before
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {events.map((item, index) => (
          <div key={item.id} className="relative flex items-start gap-4">
            {/* Connecting Line */}
            {index < events.length - 1 && (
              <span
                className="absolute left-1.5 top-3.5 -bottom-6 w-px bg-cyan-400/30"
                aria-hidden="true"
              />
            )}
            {/* Cyan Timeline Bullet */}
            <span className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-cyan-400 bg-[#12171b]" />

            <div className="flex-1">
              <span className="rounded-sm border border-cyan-400/40 bg-cyan-400/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-cyan-300">
                {item.tag}
              </span>
              <p className="mt-1 text-xs font-semibold text-white">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-white/70">{item.subtitle}</p>
              <p className="mt-1 text-[10px] text-white/40">{item.authorMeta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityHistoryTab;
