import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCamera } from "react-icons/fi";
import Field from "@/components/dashboard/form/Field";
import FormCard from "@/components/dashboard/form/FormCard";
import SelectField from "@/components/dashboard/form/SelectField";
import { inputClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import ProfilePageHeader from "@/pages/dashboard/player/components/ProfilePageHeader";
import { useDemoForm } from "@/hooks/useDemoForm";
import {
  FOOT_KEYS,
  POSITION_KEYS,
  personalInfo,
  sampleProfile,
} from "@/pages/dashboard/player/playerData";

const base = "playerForms.personal";

const getAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  const birth = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
};

const PhotoPicker = () => {
  const { t } = useTranslation();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => () => photoUrl && URL.revokeObjectURL(photoUrl), [photoUrl]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (file) setPhotoUrl(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-4 rounded-md border border-white/10 bg-black/20 p-5 sm:flex-row sm:items-center">
      {photoUrl ? (
        <img src={photoUrl} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-btn-primary font-ethnocentric text-lg text-primary">
          {sampleProfile.initials}
        </span>
      )}
      <div>
        <p className="text-xs text-white">{t(`${base}.addPhoto`)}</p>
        <p className="mt-1 text-[10px] text-white/45">{t(`${base}.photoHint`)}</p>
        <label className={`${secondaryButtonClass} mt-3 inline-flex cursor-pointer items-center gap-2`}>
          <FiCamera />
          {t(`${base}.${photoUrl ? "changePhoto" : "choosePhoto"}`)}
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFile} className="sr-only" />
        </label>
      </div>
    </div>
  );
};

const PersonalPhysical = () => {
  const { t } = useTranslation();
  const form = useDemoForm(personalInfo);
  const { values, handleChange, setField } = form;
  const age = getAge(values.dateOfBirth);
  const today = new Date().toISOString().split("T")[0];

  const positionOptions = POSITION_KEYS.map((key) => ({ value: key, label: t(`playerForms.positions.${key}`) }));
  const footOptions = FOOT_KEYS.map((key) => ({ value: key, label: t(`playerForms.feet.${key}`) }));

  const textField = (name, { required = true, type = "text", hint, placeholder, ...rest } = {}) => (
    <Field id={name} label={t(`${base}.fields.${name}`)} required={required} hint={hint}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClass}
        {...rest}
      />
    </Field>
  );

  return (
    <div className="mx-auto flex flex-col gap-5">
      <ProfilePageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
      />

      <section>
        <FormCard title={t(`${base}.photoTitle`)} subtitle={t(`${base}.photoSubtitle`)} form={form}>
          <PhotoPicker />

          <div className="grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
            {textField("fullName", { autoComplete: "name" })}
            {textField("dateOfBirth", {
              type: "date",
              max: today,
              hint: age !== null ? t(`${base}.age`, { age }) : undefined,
              className: `${inputClass} scheme-dark`,
            })}
            {textField("nationality")}
            {textField("additionalNationality", {
              required: false,
              hint: t("dashboardForm.optional"),
              placeholder: t(`${base}.additionalPlaceholder`),
            })}
            {textField("country", { autoComplete: "country-name" })}
            {textField("city", { autoComplete: "address-level2" })}
            {textField("height", { type: "number", min: 120, max: 230, inputMode: "numeric" })}
            {textField("weight", { type: "number", min: 30, max: 150, inputMode: "numeric" })}

            <Field id="preferredFoot" label={t(`${base}.fields.preferredFoot`)} required>
              <SelectField
                id="preferredFoot"
                name="preferredFoot"
                value={values.preferredFoot}
                options={footOptions}
                onChange={setField}
              />
            </Field>
            <Field id="primaryPosition" label={t(`${base}.fields.primaryPosition`)} required>
              <SelectField
                id="primaryPosition"
                name="primaryPosition"
                value={values.primaryPosition}
                options={positionOptions}
                onChange={setField}
              />
            </Field>
            <Field
              id="secondaryPosition"
              label={t(`${base}.fields.secondaryPosition`)}
              hint={t("dashboardForm.optional")}
            >
              <SelectField
                id="secondaryPosition"
                name="secondaryPosition"
                value={values.secondaryPosition}
                options={positionOptions}
                onChange={setField}
                placeholder={t("dashboardForm.select")}
              />
            </Field>
          </div>
        </FormCard>
      </section>
    </div>
  );
};

export default PersonalPhysical;
