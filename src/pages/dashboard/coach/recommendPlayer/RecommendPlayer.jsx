import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEye, FiSend, FiStar } from "react-icons/fi";
import PageHeader from "@/components/dashboard/PageHeader";
import Field from "@/components/dashboard/form/Field";
import SelectField from "@/components/dashboard/form/SelectField";
import { inputClass, primaryButtonClass } from "@/components/dashboard/form/formStyles";
import StatusBadge from "@/pages/dashboard/coach/components/StatusBadge";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import {
  COACH_PLAYERS,
  ORGANIZATION,
  RECOMMENDATIONS,
  RECOMMENDATION_MAX_LENGTH,
} from "@/pages/dashboard/coach/coachData";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";

const base = "coachDashboard.recommend";
const initialValues = { playerId: "", message: "", coachName: ORGANIZATION.director };

const RecommendPlayer = () => {
  const { t, i18n } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [history, setHistory] = useState(RECOMMENDATIONS);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const playerOptions = COACH_PLAYERS.map((player) => ({ value: String(player.id), label: player.name }));

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
    if (name === "playerId") setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.playerId) {
      setError(true);
      return;
    }
    const player = COACH_PLAYERS.find((item) => String(item.id) === values.playerId);
    setHistory((prev) => [
      { id: Date.now(), name: player.name, date: new Date().toISOString().split("T")[0], status: "received" },
      ...prev,
    ]);
    setValues(initialValues);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto flex flex-col gap-5">
      <PageHeader eyebrow={t(`${base}.eyebrow`)} title={t(`${base}.title`)} subtitle={t(`${base}.subtitle`)} />

      <div className="grid items-start gap-5 lg:grid-cols-[1fr_20rem]">
        <section>
          <form onSubmit={handleSubmit} className={`${cardClass} flex flex-col gap-5`}>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-btn-primary/40 text-btn-primary">
                <FiStar />
              </span>
              <div>
                <h2 className="text-base">{t(`${base}.formTitle`)}</h2>
                <p className="mt-1 text-[10px] text-white/45">{t(`${base}.formText`)}</p>
              </div>
            </div>

            <Field id="playerId" label={`${t(`${base}.player`)} *`}>
              <SelectField
                id="playerId"
                name="playerId"
                value={values.playerId}
                options={playerOptions}
                onChange={setField}
                placeholder={t(`${base}.playerPlaceholder`)}
              />
              {error && <p className="mt-1.5 text-[10px] text-red-400">{t(`${base}.playerError`)}</p>}
            </Field>

            <Field id="message" label={`${t(`${base}.message`)} *`}>
              <textarea
                id="message"
                name="message"
                required
                maxLength={RECOMMENDATION_MAX_LENGTH}
                value={values.message}
                onChange={(event) => setField("message", event.target.value)}
                placeholder={t(`${base}.messagePlaceholder`)}
                className={`${inputClass} min-h-32 resize-y leading-relaxed`}
              />
              <p className="mt-1.5 text-right text-[10px] text-white/40">
                {t(`${base}.characters`, { count: values.message.length, max: RECOMMENDATION_MAX_LENGTH })}
              </p>
            </Field>

            <Field id="coachName" label={t(`${base}.coachName`)}>
              <input
                id="coachName"
                name="coachName"
                required
                value={values.coachName}
                onChange={(event) => setField("coachName", event.target.value)}
                className={inputClass}
              />
            </Field>

            <div className="flex flex-wrap items-center justify-end gap-3">
              {submitted && (
                <p role="status" className="text-[10px] text-accent">
                  {t(`${base}.submitted`)}
                </p>
              )}
              <button type="submit" className={`${primaryButtonClass} flex items-center gap-2`}>
                <FiSend /> {t(`${base}.submit`)}
              </button>
            </div>
          </form>
        </section>

        <section className={cardClass}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-btn-primary/80">{t(`${base}.historyEyebrow`)}</p>
          <h2 className="mt-1.5 text-base">{t(`${base}.historyTitle`)}</h2>
          <ul className="mt-4 flex flex-col">
            {history.map(({ id, name, date, status }) => (
              <li key={id} className="flex items-center gap-3 border-b border-white/5 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[9px] text-white/70">
                  {getInitials(name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px]">{name}</span>
                  <span className="block text-[9px] text-white/40">
                    {t(`${base}.submittedOn`, { date: formatDate(date, i18n.language) })}
                  </span>
                </span>
                <StatusBadge status={status}>{t(`coachDashboard.statuses.${status}`)}</StatusBadge>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex gap-2.5 rounded-sm bg-white/5 p-3 text-[10px] leading-relaxed text-white/55">
            <FiEye className="mt-0.5 shrink-0 text-accent" />
            {t(`${base}.historyNote`)}
          </p>
        </section>
      </div>
    </div>
  );
};

export default RecommendPlayer;
