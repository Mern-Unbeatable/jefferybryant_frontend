import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import Field from "@/components/dashboard/form/Field";
import SelectField from "@/components/dashboard/form/SelectField";
import { inputClass, primaryButtonClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import { REQUEST_TOPICS } from "@/pages/dashboard/scout/scoutData";

const base = "scoutDashboard.actions";

const ACTION_CONFIG = {
  requestInformation: { topic: true, messageRequired: false },
  furtherEvaluation: { topic: false, messageRequired: true },
  passOnPlayer: { topic: false, messageRequired: false, danger: true },
};

const ActionForm = ({ action, player, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const config = ACTION_CONFIG[action];
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [topicError, setTopicError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (config.topic && !topic) {
      setTopicError(true);
      return;
    }
    const topicLabel = topic ? `${t(`${base}.topics.${topic}`)}${message ? ` — ` : ""}` : "";
    onSubmit({ action, message: `${topicLabel}${message}`.trim() });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-4 p-5 pb-0">
        <div>
          <p className="text-[10px] text-accent">{player.name}</p>
          <h2 id="scout-action-title" className="mt-1 font-ethnocentric text-base uppercase">
            {t(`${base}.${action}.title`)}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t(`${base}.close`)}
          className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 text-white/60 transition hover:text-white"
        >
          <FiX />
        </button>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <p className="text-[11px] text-white/55">{t(`${base}.${action}.text`)}</p>

        {config.topic && (
          <Field id="topic" label={`${t(`${base}.topicLabel`)} *`}>
            <SelectField
              id="topic"
              name="topic"
              value={topic}
              onChange={(_, value) => {
                setTopic(value);
                setTopicError(false);
              }}
              options={REQUEST_TOPICS.map((key) => ({ value: key, label: t(`${base}.topics.${key}`) }))}
              placeholder={t("dashboardForm.select")}
            />
            {topicError && <p className="mt-1.5 text-[10px] text-red-400">{t(`${base}.topicError`)}</p>}
          </Field>
        )}

        <Field id="message" label={`${t(`${base}.${action}.messageLabel`)}${config.messageRequired ? " *" : ""}`}>
          <textarea
            id="message"
            required={config.messageRequired}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t(`${base}.messagePlaceholder`)}
            className={`${inputClass} min-h-20 resize-y`}
          />
        </Field>
      </div>

      <div className="flex justify-end gap-2 border-t border-white/10 p-5">
        <button type="button" onClick={onClose} className={secondaryButtonClass}>
          {t(`${base}.cancel`)}
        </button>
        <button
          type="submit"
          className={config.danger ? "rounded-sm bg-red-500/80 px-4 py-2.5 text-xs text-white transition hover:bg-red-500" : primaryButtonClass}
        >
          {t(`${base}.${action}.submit`)}
        </button>
      </div>
    </form>
  );
};

const ScoutActionModal = ({ action, player, onClose, onSubmit }) => (
  <Modal open={Boolean(action)} onClose={onClose} labelledBy="scout-action-title" className="max-w-md">
    {action && <ActionForm key={action} action={action} player={player} onClose={onClose} onSubmit={onSubmit} />}
  </Modal>
);

export default ScoutActionModal;
