import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiEye, FiSend, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import { primaryButtonClass } from "@/components/dashboard/form/formStyles";
import StatusBadge from "@/pages/dashboard/coach/components/StatusBadge";
import { ORGANIZATION } from "@/pages/dashboard/coach/coachData";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";

const base = "coachDashboard.players";

const InfoBox = ({ label, value }) => (
  <div className="rounded-sm border border-white/10 p-3">
    <p className="text-[9px] uppercase tracking-[0.15em] text-white/40">{label}</p>
    <p className="mt-1.5 text-[11px]">{value}</p>
  </div>
);

const PlayerDetailsModal = ({ player, onClose }) => {
  const { t, i18n } = useTranslation();
  const [remindedIds, setRemindedIds] = useState([]);

  if (!player) return null;

  const needsReminder = player.status === "incomplete";
  const reminded = remindedIds.includes(player.id);
  const missing = player.missing.length
    ? player.missing.map((key) => t(`${base}.missingSections.${key}`)).join(", ")
    : t(`${base}.noneMissing`);

  return (
    <Modal open onClose={onClose} labelledBy="player-details-title">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-btn-primary/80">{t(`${base}.modal.eyebrow`)}</p>
          <h2 id="player-details-title" className="mt-1 font-ethnocentric text-base uppercase">
            {t(`${base}.modal.title`)}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t(`${base}.modal.close`)}
          className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 text-white/60 transition hover:text-white"
        >
          <FiX />
        </button>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-sm text-accent">
            {getInitials(player.name)}
          </span>
          <div>
            <p className="font-ethnocentric text-sm uppercase">{player.name}</p>
            <p className="mt-1 text-[10px] text-white/50">
              {t(`${base}.yearsOld`, { age: player.age })} · {t(`${base}.positions.${player.position}`)} · {player.country}
            </p>
            <div className="mt-2">
              <StatusBadge status={player.status}>{t(`coachDashboard.statuses.${player.status}`)}</StatusBadge>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em]">
            <span>{t(`${base}.modal.completion`)}</span>
            <span className="text-accent">{player.profile}%</span>
          </div>
          <div className="mt-2 h-1 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-accent" style={{ width: `${player.profile}%` }} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <InfoBox label={t(`${base}.modal.registered`)} value={formatDate(player.registered, i18n.language)} />
          <InfoBox label={t(`${base}.modal.organization`)} value={ORGANIZATION.name} />
          <InfoBox label={t(`${base}.modal.status`)} value={t(`coachDashboard.statuses.${player.status}`)} />
          <InfoBox label={t(`${base}.modal.missing`)} value={missing} />
        </div>

        <p className="flex gap-2.5 rounded-sm bg-white/5 p-3 text-[10px] leading-relaxed text-white/55">
          <FiEye className="mt-0.5 shrink-0 text-accent" />
          {t(`${base}.modal.privacy`)}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/10 p-5">
        <button type="button" onClick={onClose} className="px-3 py-2.5 text-xs text-white/60 transition hover:text-white">
          {t(`${base}.modal.close`)}
        </button>
        {needsReminder && (
          <button
            type="button"
            disabled={reminded}
            onClick={() => setRemindedIds((ids) => [...ids, player.id])}
            className={`${primaryButtonClass} flex items-center gap-2 disabled:cursor-default disabled:opacity-70`}
          >
            {reminded ? <FiCheck /> : <FiSend />}
            {t(`${base}.modal.${reminded ? "reminderSent" : "sendReminder"}`)}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default PlayerDetailsModal;
