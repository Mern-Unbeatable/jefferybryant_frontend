import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/dashboard/PageHeader";
import Field from "@/components/dashboard/form/Field";
import { inputClass, primaryButtonClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import { useDemoForm } from "@/hooks/useDemoForm";

const base = "accountDetailsSettings";

const passwordInitial = { currentPassword: "", newPassword: "", confirmPassword: "" };
const INPUT_TYPES = { email: "email", phone: "tel" };
const AUTOCOMPLETE = {
  accountName: "name",
  email: "email",
  phone: "tel",
  currentPassword: "current-password",
  newPassword: "new-password",
  confirmPassword: "new-password",
};

const SettingsCard = ({ title, form, buttonLabel, buttonClass, savedMessage, children }) => (
  <section>
    <form onSubmit={form.handleSubmit} className="flex flex-col gap-5 rounded-lg border border-white/10 bg-white/3 p-5 sm:p-6">
      <h2 className="font-ethnocentric text-sm uppercase">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
      <div className="flex flex-wrap items-center justify-end gap-3">
        {form.saved && (
          <p role="status" className="text-[10px] text-accent">
            {savedMessage}
          </p>
        )}
        <button type="submit" className={buttonClass}>
          {buttonLabel}
        </button>
      </div>
    </form>
  </section>
);

const AccountDetailsSettings = ({ initialAccount }) => {
  const { t } = useTranslation();
  const confirmRef = useRef(null);
  const accountForm = useDemoForm(initialAccount);
  const passwordForm = useDemoForm(passwordInitial, { resetOnSave: true });
  const { newPassword, confirmPassword } = passwordForm.values;

  useEffect(() => {
    confirmRef.current?.setCustomValidity(
      confirmPassword && confirmPassword !== newPassword ? t("accountSettings.passwordMismatch") : ""
    );
  }, [newPassword, confirmPassword, t]);

  const input = (form, name, extra = {}) => (
    <Field id={name} label={t(`${base}.fields.${name}`)}>
      <input
        id={name}
        name={name}
        required={name !== "phone"}
        autoComplete={AUTOCOMPLETE[name]}
        value={form.values[name]}
        onChange={form.handleChange}
        className={inputClass}
        {...extra}
      />
    </Field>
  );

  const passwordInput = (name) =>
    input(passwordForm, name, {
      type: "password",
      minLength: name === "currentPassword" ? undefined : 8,
      placeholder: t(`${base}.placeholders.${name}`),
      ref: name === "confirmPassword" ? confirmRef : undefined,
    });

  return (
    <div className="mx-auto flex flex-col gap-5">
      <PageHeader eyebrow={t(`${base}.eyebrow`)} title={t(`${base}.title`)} subtitle={t(`${base}.subtitle`)} />

      <SettingsCard
        title={t(`${base}.accountTitle`)}
        form={accountForm}
        buttonLabel={t(`${base}.saveAccount`)}
        buttonClass={primaryButtonClass}
        savedMessage={t(`${base}.accountSaved`)}
      >
        {Object.keys(initialAccount).map((name) => (
          <div key={name}>{input(accountForm, name, { type: INPUT_TYPES[name] ?? "text" })}</div>
        ))}
      </SettingsCard>

      <SettingsCard
        title={t(`${base}.passwordTitle`)}
        form={passwordForm}
        buttonLabel={t(`${base}.updatePassword`)}
        buttonClass={secondaryButtonClass}
        savedMessage={t("accountSettings.passwordSaved")}
      >
        {passwordInput("currentPassword")}
        {passwordInput("newPassword")}
        {passwordInput("confirmPassword")}
      </SettingsCard>
    </div>
  );
};

export default AccountDetailsSettings;
