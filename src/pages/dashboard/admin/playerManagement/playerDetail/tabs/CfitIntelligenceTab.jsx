import { useState } from "react";
import { FiPlus, FiShield } from "react-icons/fi";
import AdminStatusBadge from "@/pages/dashboard/admin/components/AdminStatusBadge";

const STAGES = [
  "SUBMITTED",
  "VERIFICATION",
  "WATCH",
  "REVIEW",
  "PRIORITY",
  "PASS",
  "ARCHIVED",
];

const INITIAL_NOTES = [
  {
    id: 1,
    initials: "AM",
    author: "Alex Morgan",
    date: "15 Jun 2025 · 10:24",
    text: "Strong 1v1 ability and direct running. Continue monitoring decision-making in final third.",
  },
  {
    id: 2,
    initials: "NK",
    author: "Nadia King",
    date: "11 Jun 2025 · 14:18",
    text: "Academy relationship confirmed. Player remains available for regional opportunities.",
  },
];

const CfitIntelligenceTab = ({ player, onChangeStageClick, onAddNoteClick }) => {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const currentStage = (player.intelligence || "PASS").toUpperCase();

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-white/10 bg-[#12171b] p-5 sm:p-6">
        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <h2 className="font-ethnocentric text-xs tracking-wider text-white">
            CFit Intelligence
          </h2>
        </div>

        {/* Admin Access Only Banner */}
        <div className="mt-4 flex items-center gap-3 rounded-md border border-cyan-400/30 bg-cyan-400/5 p-3 text-cyan-300">
          <FiShield className="shrink-0 text-base" />
          <div className="text-[11px]">
            <p className="font-semibold uppercase tracking-wider">Authorized Admin access only</p>
            <p className="text-[10px] text-cyan-300/70">
              This information is never visible to players, coaches, academies, or scouts.
            </p>
          </div>
        </div>

        {/* Manual Classification Banner */}
        <div className="mt-4 flex flex-col justify-between gap-3 rounded-md border border-white/10 bg-white/2 p-3 text-xs sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="rounded-sm border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300">
              {currentStage}
            </span>
            <span className="text-[11px] text-white/70">Internal recruitment classification</span>
          </div>
          <span className="text-[10px] text-white/40">
            Managed manually by CFit Admin. No automated or AI evaluation.
          </span>
        </div>

        {/* Recruitment Stage Horizontal Stepper */}
        <div className="mt-6 rounded-lg border border-white/5 bg-white/2 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-ethnocentric text-xs tracking-wider text-white">
              Recruitment Stage
            </h3>
            <button
              type="button"
              onClick={onChangeStageClick}
              className="rounded bg-btn-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
            >
              Change stage
            </button>
          </div>

          {/* Stepper Track */}
          <div className="mt-8 overflow-x-auto pb-2 [scrollbar-width:none]">
            <div className="relative flex min-w-160 items-center justify-between px-2">
              {/* Background Connecting Line */}
              <div className="absolute left-6 right-6 top-1.5 h-0.5 bg-white/10" />

              {STAGES.map((stage) => {
                const isCurrent = currentStage === stage;
                return (
                  <div key={stage} className="relative z-10 flex flex-col items-center">
                    {/* Circle */}
                    <span
                      className={`h-3.5 w-3.5 rounded-full border-2 transition ${
                        isCurrent
                          ? "border-amber-400 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                          : "border-white/30 bg-[#12171b]"
                      }`}
                    />
                    {/* Label */}
                    <span
                      className={`mt-3 text-[9px] font-semibold tracking-wider ${
                        isCurrent ? "text-amber-300" : "text-white/40"
                      }`}
                    >
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Internal Notes Section */}
        <div className="mt-6 rounded-lg border border-white/5 bg-white/2 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-ethnocentric text-xs tracking-wider text-white">
                Internal Notes
              </h3>
              <p className="mt-0.5 text-[10px] text-white/40">
                {notes.length} confidential notes
              </p>
            </div>
            <button
              type="button"
              onClick={onAddNoteClick}
              className="flex items-center gap-1.5 rounded bg-btn-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow transition hover:bg-btn-primary/90"
            >
              <FiPlus /> Add Internal note
            </button>
          </div>

          {/* Notes List */}
          <div className="mt-5 space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-md border border-white/5 bg-[#12171b] p-4 text-xs"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/20 text-[10px] font-bold text-amber-300">
                      {note.initials}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{note.author}</p>
                      <p className="text-[10px] text-white/40">{note.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    <button
                      type="button"
                      className="text-white/50 transition hover:text-white hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-400/80 transition hover:text-red-300 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/80">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CfitIntelligenceTab;
