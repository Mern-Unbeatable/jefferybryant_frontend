import { useTranslation } from "react-i18next";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Field from "@/components/dashboard/form/Field";
import FormCard from "@/components/dashboard/form/FormCard";
import FormSubsection from "@/components/dashboard/form/FormSubsection";
import { inputClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import ProfilePageHeader from "@/pages/dashboard/player/components/ProfilePageHeader";
import { useDemoForm } from "@/hooks/useDemoForm";
import { footballInfo } from "@/pages/dashboard/player/playerData";

const base = "playerForms.football";
const textareaClass = `${inputClass} min-h-24 resize-y leading-relaxed`;

const FootballBackground = () => {
  const { t } = useTranslation();
  const form = useDemoForm(footballInfo);
  const { values, handleChange, setField } = form;

  const fieldProps = (name, required = true) => ({
    id: name,
    name,
    required,
    value: values[name],
    onChange: handleChange,
  });

  const updateClub = (id, key, value) =>
    setField(
      "previousClubs",
      values.previousClubs.map((club) => (club.id === id ? { ...club, [key]: value } : club))
    );

  const addClub = () =>
    setField("previousClubs", [...values.previousClubs, { id: Date.now(), club: "", years: "" }]);

  const removeClub = (id) =>
    setField(
      "previousClubs",
      values.previousClubs.filter((club) => club.id !== id)
    );

  return (
    <div className="mx-auto flex flex-col gap-5">
      <ProfilePageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
      />

      <section>
        <FormCard title={t(`${base}.cardTitle`)} subtitle={t(`${base}.cardSubtitle`)} form={form}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="currentClub" label={t(`${base}.fields.currentClub`)} required>
              <input {...fieldProps("currentClub")} className={inputClass} />
            </Field>
            <Field id="currentLeague" label={t(`${base}.fields.currentLeague`)} required>
              <input {...fieldProps("currentLeague")} className={inputClass} />
            </Field>
            <Field id="playingHistory" label={t(`${base}.fields.playingHistory`)} required>
              <textarea {...fieldProps("playingHistory")} className={textareaClass} />
            </Field>
            <Field
              id="nationalTeam"
              label={t(`${base}.fields.nationalTeam`)}
              hint={t("dashboardForm.optional")}
            >
              <textarea
                {...fieldProps("nationalTeam", false)}
                placeholder={t(`${base}.fields.nationalTeamPlaceholder`)}
                className={textareaClass}
              />
            </Field>
            <Field
              id="statistics"
              label={t(`${base}.fields.statistics`)}
              hint={t(`${base}.fields.statisticsHint`)}
            >
              <textarea {...fieldProps("statistics", false)} className={textareaClass} />
            </Field>
            <Field id="achievements" label={t(`${base}.fields.achievements`)}>
              <textarea {...fieldProps("achievements", false)} className={textareaClass} />
            </Field>
          </div>

          <FormSubsection
            title={t(`${base}.previousTitle`)}
            subtitle={t(`${base}.previousSubtitle`)}
            action={
              <button type="button" onClick={addClub} className={`${secondaryButtonClass} flex items-center gap-2`}>
                <FiPlus /> {t(`${base}.addClub`)}
              </button>
            }
          >
            {values.previousClubs.length === 0 ? (
              <p className="rounded-sm border border-dashed border-white/10 p-4 text-center text-[11px] text-white/40">
                {t(`${base}.noClubs`)}
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {values.previousClubs.map((club, index) => (
                  <li key={club.id} className="flex items-center gap-3">
                    <span className="w-6 shrink-0 text-[10px] text-btn-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <input
                      aria-label={t(`${base}.clubName`)}
                      placeholder={t(`${base}.clubName`)}
                      value={club.club}
                      onChange={(event) => updateClub(club.id, "club", event.target.value)}
                      className={`${inputClass} flex-1`}
                    />
                    <div className="w-28 shrink-0 sm:w-40">
                      <input
                        aria-label={t(`${base}.years`)}
                        placeholder={t(`${base}.years`)}
                        value={club.years}
                        onChange={(event) => updateClub(club.id, "years", event.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeClub(club.id)}
                      aria-label={t(`${base}.remove`)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-white/10 text-red-400 transition hover:bg-red-500/10"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </FormSubsection>
        </FormCard>
      </section>
    </div>
  );
};

export default FootballBackground;
