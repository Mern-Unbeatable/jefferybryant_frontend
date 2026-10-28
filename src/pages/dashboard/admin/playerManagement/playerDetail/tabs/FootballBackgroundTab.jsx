const FootballBackgroundTab = ({ player }) => {
  const bg = player.background || {};
  const timeline = bg.timeline || [];

  return (
    <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="font-ethnocentric text-xs tracking-wider text-white">
          Football Background
        </h2>
        <p className="mt-1 text-[11px] text-white/50">
          Chronological playing and development history.
        </p>
      </div>

      {/* Top 2 Columns Box */}
      <div className="mt-6 rounded-lg border border-white/5 bg-white/2 p-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Current Club/Academy</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {bg.currentClub || player.club}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Playing History/Experience</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {bg.history || "COMPETITIVE ACADEMY FOOTBALL SINCE 2019"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Relevant Playing Statistics</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {bg.stats || "2024 SEASON: 18 APPEARANCES, 5 GOALS, 7 ASSISTS"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Current league / competition</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {bg.currentLeague || "JAMAICA U19 YOUTH LEAGUE"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">National / youth team experience</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {bg.nationalTeam || "JAMAICA U17 TRAINING CAMP"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/40">Achievements</p>
              <p className="mt-1 font-semibold uppercase text-white">
                {bg.achievements || "ACADEMY PLAYERS' PLAYER OF THE YEAR, 2024"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="mt-8">
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4">
              {/* Vertical line connecting bullets */}
              {index < timeline.length - 1 && (
                <span
                  className="absolute left-1.5 top-3.5 -bottom-6 w-px bg-cyan-400/30"
                  aria-hidden="true"
                />
              )}
              {/* Cyan bullet */}
              <span className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-cyan-400 bg-[#12171b]" />

              <div className="flex-1">
                <span className="text-[10px] font-semibold text-cyan-300">{item.years}</span>
                <p className="mt-0.5 font-ethnocentric text-xs tracking-wider text-white">
                  {item.club}
                </p>
                <p className="text-[11px] text-white/60">{item.squad}</p>
                <p className="mt-0.5 text-[10px] text-white/40">{item.competition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FootballBackgroundTab;

