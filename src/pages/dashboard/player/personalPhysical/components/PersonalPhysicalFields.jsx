import { useTranslation } from "react-i18next";
import SelectField from "@/components/dashboard/form/SelectField";
import {
  FOOT_KEYS,
  POSITION_KEYS,
} from "@/pages/dashboard/player/playerData";

const base = "playerForms.personal";

const fieldInputClass =
  "w-full rounded-sm border border-white/10 bg-black/40 px-3.5 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent/60 disabled:cursor-not-allowed disabled:text-white/40";

const getAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  const birth = new Date(dateOfBirth);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
};

/**
 * FormField - Reusable field wrapper with larger, clearer labels and required badges
 */
const FormField = ({ id, label, required = false, hint, children }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="text-xs sm:text-sm font-medium text-white/80"
        >
          {label}
        </label>
        {required && (
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-btn-primary">
            {t("dashboardForm.required")}
          </span>
        )}
      </div>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-xs text-white/50">{hint}</p>}
    </div>
  );
};

/**
 * PersonalPhysicalFields - Form fields grid for personal attributes and physical metrics
 */
const PersonalPhysicalFields = ({ values, handleChange, setField }) => {
  const { t } = useTranslation();
  const age = getAge(values.dateOfBirth);
  const today = new Date().toISOString().split("T")[0];

  const positionOptions = POSITION_KEYS.map((key) => ({
    value: key,
    label: t(`playerForms.positions.${key}`),
  }));

  const footOptions = FOOT_KEYS.map((key) => ({
    value: key,
    label: t(`playerForms.feet.${key}`),
  }));

  const textField = (
    name,
    { required = true, type = "text", hint, placeholder, ...rest } = {},
  ) => (
    <FormField
      id={name}
      label={t(`${base}.fields.${name}`)}
      required={required}
      hint={hint}
    >
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={fieldInputClass}
        {...rest}
      />
    </FormField>
  );

  return (
    <div className="grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
      {textField("fullName", { autoComplete: "name" })}
      {textField("dateOfBirth", {
        type: "date",
        max: today,
        hint: age !== null ? t(`${base}.age`, { age }) : undefined,
        className: `${fieldInputClass} scheme-dark`,
      })}
      {textField("nationality")}
      {textField("additionalNationality", {
        required: false,
        hint: t("dashboardForm.optional"),
        placeholder: t(`${base}.additionalPlaceholder`),
      })}
      {textField("country", { autoComplete: "country-name" })}
      {textField("city", { autoComplete: "address-level2" })}
      {textField("height", {
        type: "number",
        min: 120,
        max: 230,
        inputMode: "numeric",
      })}
      {textField("weight", {
        type: "number",
        min: 30,
        max: 150,
        inputMode: "numeric",
      })}

      <FormField
        id="preferredFoot"
        label={t(`${base}.fields.preferredFoot`)}
        required
      >
        <SelectField
          id="preferredFoot"
          name="preferredFoot"
          value={values.preferredFoot}
          options={footOptions}
          onChange={setField}
          className={fieldInputClass}
        />
      </FormField>

      <FormField
        id="primaryPosition"
        label={t(`${base}.fields.primaryPosition`)}
        required
      >
        <SelectField
          id="primaryPosition"
          name="primaryPosition"
          value={values.primaryPosition}
          options={positionOptions}
          onChange={setField}
          className={fieldInputClass}
        />
      </FormField>

      <FormField
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
          className={fieldInputClass}
        />
      </FormField>
    </div>
  );
};

export default PersonalPhysicalFields;
