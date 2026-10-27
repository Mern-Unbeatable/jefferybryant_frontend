import { useTranslation } from "react-i18next";
import { LuShieldCheck } from "react-icons/lu";
import Field from "@/components/dashboard/form/Field";
import FormCard from "@/components/dashboard/form/FormCard";
import FormSubsection from "@/components/dashboard/form/FormSubsection";
import SelectField from "@/components/dashboard/form/SelectField";
import { inputClass } from "@/components/dashboard/form/formStyles";
import ProfilePageHeader from "@/pages/dashboard/player/components/ProfilePageHeader";
import { useDemoForm } from "@/hooks/useDemoForm";
import {
  RECRUITING_STATUS_KEYS,
  contactInfo,
  footballInfo,
} from "@/pages/dashboard/player/playerData";

const base = "playerForms.contact";
const textareaClass = `${inputClass} min-h-20 resize-y leading-relaxed`;

const ContactRecruiting = () => {
  const { t } = useTranslation();
  const form = useDemoForm(contactInfo);
  const { values, handleChange, setField } = form;

  const statusOptions = RECRUITING_STATUS_KEYS.map((key) => ({
    value: key,
    label: t(`${base}.statuses.${key}`),
  }));

  const fieldProps = (name, { required = false, type = "text" } = {}) => ({
    id: name,
    name,
    type,
    required,
    value: values[name],
    onChange: handleChange,
    className: inputClass,
  });

  return (
    <div className="mx-auto flex flex-col gap-5">
      <ProfilePageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
      />

      <section className="flex gap-4 rounded-lg border border-accent/25 bg-accent/5 p-5">
        <LuShieldCheck className="mt-0.5 shrink-0 text-lg text-accent" />
        <div>
          <h2 className="text-xs text-white">{t(`${base}.protectedTitle`)}</h2>
          <p className="mt-1 text-[11px] text-white/55">{t(`${base}.protectedText`)}</p>
        </div>
      </section>

      <section>
        <FormCard title={t(`${base}.cardTitle`)} subtitle={t(`${base}.cardSubtitle`)} form={form}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="currentClubAffiliation" label={t(`${base}.currentClub`)} hint={t(`${base}.currentClubHint`)}>
              <input id="currentClubAffiliation" value={footballInfo.currentClub} disabled className={inputClass} />
            </Field>
            <Field id="recruitingStatus" label={t(`${base}.recruitingStatus`)} required>
              <SelectField
                id="recruitingStatus"
                name="recruitingStatus"
                value={values.recruitingStatus}
                options={statusOptions}
                onChange={setField}
              />
            </Field>
          </div>

          <FormSubsection title={t(`${base}.coachTitle`)} subtitle={t(`${base}.coachSubtitle`)}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="coachName" label={t(`${base}.coachName`)} required>
                <input {...fieldProps("coachName", { required: true })} />
              </Field>
              <Field id="coachEmail" label={t(`${base}.coachEmail`)} required>
                <input {...fieldProps("coachEmail", { required: true, type: "email" })} />
              </Field>
              <Field id="directorContact" label={t(`${base}.directorContact`)}>
                <input {...fieldProps("directorContact")} placeholder={t(`${base}.directorPlaceholder`)} />
              </Field>
              <Field id="references" label={t(`${base}.references`)}>
                <textarea
                  id="references"
                  name="references"
                  value={values.references}
                  onChange={handleChange}
                  placeholder={t(`${base}.referencesPlaceholder`)}
                  className={textareaClass}
                />
              </Field>
            </div>
          </FormSubsection>

          <FormSubsection title={t(`${base}.guardianTitle`)} subtitle={t(`${base}.guardianSubtitle`)}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="playerEmail" label={t(`${base}.playerEmail`)} required>
                <input {...fieldProps("playerEmail", { required: true, type: "email" })} />
              </Field>
              <Field id="guardianName" label={t(`${base}.guardianName`)}>
                <input {...fieldProps("guardianName")} />
              </Field>
              <Field id="guardianEmail" label={t(`${base}.guardianEmail`)}>
                <input {...fieldProps("guardianEmail", { type: "email" })} />
              </Field>
            </div>

            <label className="flex cursor-pointer gap-3 rounded-md border border-white/10 bg-black/20 p-4">
              <input
                type="checkbox"
                name="guardianConsent"
                checked={values.guardianConsent}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 shrink-0 accent-btn-primary"
              />
              <span>
                <span className="block text-xs text-white">{t(`${base}.consent`)}</span>
                <span className="mt-1 block text-[10px] text-white/45">{t(`${base}.consentHint`)}</span>
              </span>
            </label>
          </FormSubsection>
        </FormCard>
      </section>
    </div>
  );
};

export default ContactRecruiting;
