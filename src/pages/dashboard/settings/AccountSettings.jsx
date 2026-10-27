import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Field from "@/components/dashboard/form/Field";
import { inputClass, primaryButtonClass } from "@/components/dashboard/form/formStyles";
import { useAuth } from "@/hooks/useAuth";
import { useDemoForm } from "@/hooks/useDemoForm";

const base = "accountSettings";

const emptyPasswords = { currentPassword: "", newPassword: "", confirmPassword: "" };

const FormFooter = ({ saved, message, label }) => (
  <div className="flex flex-wrap items-center justify-end gap-3">
    {saved && (
      <p role="status" className="text-[10px] text-accent">
        {message}
      </p>
    )}
    <button type="submit" className={primaryButtonClass}>
      {label}
    </button>
  </div>
);

const AccountSettings = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const confirmRef = useRef(null);

  const accountForm = useDemoForm({ phone: "+1 876 555 0142", email: user?.email ?? "" });
  const passwordForm = useDemoForm(emptyPasswords, { resetOnSave: true });
  const { newPassword, confirmPassword } = passwordForm.values;

  useEffect(() => {
    confirmRef.current?.setCustomValidity(
      confirmPassword && confirmPassword !== newPassword ? t(`${base}.passwordMismatch`) : ""
    );
  }, [newPassword, confirmPassword, t]);

  const passwordField = (name, autoComplete) => (
    <Field id={name} label={t(`${base}.${name}`)} hint={name === "newPassword" ? t(`${base}.passwordHint`) : undefined}>
      <input
        ref={name === "confirmPassword" ? confirmRef : undefined}
        id={name}
        name={name}
        type="password"
        required
        minLength={name === "currentPassword" ? undefined : 8}
        autoComplete={autoComplete}
        value={passwordForm.values[name]}
        onChange={passwordForm.handleChange}
        placeholder="••••••••"
        className={inputClass}
      />
    </Field>
  );

  return (
    <div className="mx-auto flex flex-col gap-5">
      <section>
        <h1 className="font-ethnocentric text-xl uppercase sm:text-3xl">{t(`${base}.title`)}</h1>
        <p className="mt-2 text-xs text-white/60">{t(`${base}.subtitle`)}</p>
      </section>

      <section className="flex flex-col gap-8 rounded-xl border border-white/20 p-5 sm:p-7">
        <form onSubmit={accountForm.handleSubmit} className="flex flex-col gap-5">
          <h2 className="font-ethnocentric text-sm uppercase">{t(`${base}.accountTitle`)}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="phone" label={t(`${base}.phone`)}>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={accountForm.values.phone}
                onChange={accountForm.handleChange}
                className={inputClass}
              />
            </Field>
            <Field id="email" label={t(`${base}.email`)}>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={accountForm.values.email}
                onChange={accountForm.handleChange}
                className={inputClass}
              />
            </Field>
          </div>
          <FormFooter
            saved={accountForm.saved}
            message={t(`${base}.profileSaved`)}
            label={t(`${base}.updateProfile`)}
          />
        </form>

        <form onSubmit={passwordForm.handleSubmit} className="flex flex-col gap-5">
          <h2 className="font-ethnocentric text-sm uppercase">{t(`${base}.passwordTitle`)}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {passwordField("currentPassword", "current-password")}
            {passwordField("newPassword", "new-password")}
            {passwordField("confirmPassword", "new-password")}
          </div>
          <FormFooter
            saved={passwordForm.saved}
            message={t(`${base}.passwordSaved`)}
            label={t(`${base}.changePassword`)}
          />
        </form>
      </section>
    </div>
  );
};

export default AccountSettings;
