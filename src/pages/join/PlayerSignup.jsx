import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { LuTrophy } from "react-icons/lu";
import BackButton from "@/components/common/BackButton";
import { usePageAnimations } from "@/hooks/usePageAnimations";

const base = "playerSignup";

const countries = [
  "Antigua and Barbuda",
  "Aruba",
  "Bahamas",
  "Barbados",
  "Belize",
  "Bermuda",
  "Cayman Islands",
  "Cuba",
  "Curaçao",
  "Dominica",
  "Dominican Republic",
  "Grenada",
  "Guyana",
  "Haiti",
  "Jamaica",
  "Puerto Rico",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Suriname",
  "Trinidad and Tobago",
];

const positions = [
  { code: "GK", key: "goalkeeper" },
  { code: "CB", key: "centreBack" },
  { code: "FB", key: "fullBack" },
  { code: "DM", key: "defMidfielder" },
  { code: "CM", key: "centralMid" },
  { code: "AM", key: "attackingMid" },
  { code: "WG", key: "winger" },
  { code: "ST", key: "striker" },
];

const passwordRules = [
  { key: "length", test: (value) => value.length >= 8 },
  { key: "upper", test: (value) => /[A-Z]/.test(value) },
  { key: "lower", test: (value) => /[a-z]/.test(value) },
  { key: "number", test: (value) => /\d/.test(value) },
  { key: "special", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

const initialValues = {
  fullName: "",
  dateOfBirth: "",
  country: "",
  nationality: "",
  email: "",
  position: "",
  club: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

const labelClass = "text-[10px] uppercase tracking-[0.15em] text-white/60";
const inputClass =
  "mt-2 w-full border border-white/10 bg-black/30 px-3 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-accent/60";

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className={labelClass}>
    {children} *
  </label>
);

const IconInput = ({ icon, ...props }) => {
  const Icon = icon;
  return (
    <div className="relative">
      <input {...props} className={`${inputClass} pr-10`} />
      <Icon className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-sm text-white/40" />
    </div>
  );
};

const CountrySelect = ({ id, value, onChange, placeholder }) => (
  <div className="relative">
    <select
      id={id}
      name={id}
      required
      value={value}
      onChange={onChange}
      className={`${inputClass} appearance-none pr-10 invalid:text-white/30`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {countries.map((country) => (
        <option key={country} value={country} className="bg-primary text-white">
          {country}
        </option>
      ))}
    </select>
    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-white/40" />
  </div>
);

const PasswordInput = ({ id, value, onChange, inputRef, autoComplete }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        name={id}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        required
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? t("login.hide") : t("login.show")}
        aria-pressed={visible}
        className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-sm text-white/50 transition-colors hover:text-white"
      >
        {visible ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
};

const StepTabs = ({ step }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <ol className="grid grid-cols-2 gap-3">
        {["personal", "football"].map((key, index) => {
          const number = index + 1;
          const isActive = step === number;
          const isDone = step > number;
          return (
            <li
              key={key}
              aria-current={isActive ? "step" : undefined}
              className={`flex items-center gap-3 rounded-md border px-3 py-2.5 ${
                isActive ? "border-btn-primary" : "border-white/15"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  isActive || isDone ? "bg-btn-primary text-primary" : "bg-white/15 text-white/70"
                }`}
              >
                {isDone ? <FiCheck /> : number}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-[10px] uppercase tracking-[0.15em] ${
                    isActive ? "text-btn-primary" : "text-white/60"
                  }`}
                >
                  {t(`${base}.step`, { number })}
                </span>
                <span className="block truncate text-[11px] text-white/80">
                  {t(`${base}.steps.${key}`)}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 h-1 bg-white/80">
        <div
          className={`h-full bg-btn-primary transition-all duration-500 ${
            step === 1 ? "w-1/2" : "w-full"
          }`}
        />
      </div>
    </div>
  );
};

const PlayerSignup = () => {
  const { t } = useTranslation();
  const pageRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  usePageAnimations(pageRef, "/join/player");

  const rulesPassed = passwordRules.every((rule) => rule.test(values.password));
  const passwordsMatch = values.password === values.confirmPassword;

  useEffect(() => {
    passwordRef.current?.setCustomValidity(rulesPassed ? "" : t(`${base}.errors.weakPassword`));
    confirmRef.current?.setCustomValidity(passwordsMatch ? "" : t(`${base}.errors.mismatch`));
  }, [step, rulesPassed, passwordsMatch, t]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleStepOne = (event) => {
    event.preventDefault();
    setStep(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div ref={pageRef}>
      <section className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:sticky lg:top-0 lg:block lg:h-svh">
          <img
            src="/login/loginCity.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <BackButton className="absolute left-10 top-10" />
        </div>

        <div className="relative flex items-center px-4 py-20 sm:px-10 lg:px-16">
          <BackButton className="absolute left-4 top-6 sm:left-10 lg:hidden" />

          <div className="mx-auto w-full max-w-xl">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <FiCheckCircle className="text-5xl text-accent" />
                <h1 className="font-ethnocentric text-xl uppercase sm:text-2xl">
                  {t(`${base}.successTitle`)}
                </h1>
                <p className="max-w-sm text-xs leading-relaxed text-white/60">
                  {t(`${base}.successText`)}
                </p>
                <Link
                  to="/login"
                  className="mt-4 flex items-center gap-2 bg-btn-primary px-6 py-3 text-xs text-primary transition hover:bg-btn-primary/90"
                >
                  {t(`${base}.signIn`)} <FiArrowRight />
                </Link>
              </div>
            ) : (
              <>
                <h1 className="font-ethnocentric text-xl uppercase leading-tight sm:text-2xl">
                  {t(`${base}.title`)}
                </h1>
                <p className="mt-3 text-xs text-white/50">{t(`${base}.subtitle`)}</p>

                <StepTabs step={step} />

                {step === 1 ? (
                  <form onSubmit={handleStepOne} className="mt-8 flex flex-col gap-5">
                    <div>
                      <Label htmlFor="fullName">{t(`${base}.fields.fullName`)}</Label>
                      <IconInput
                        icon={FiUser}
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        required
                        value={values.fullName}
                        onChange={handleChange}
                        placeholder="Tariq A. Sterling"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">{t(`${base}.fields.dateOfBirth`)}</Label>
                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        required
                        max={today}
                        value={values.dateOfBirth}
                        onChange={handleChange}
                        className={`${inputClass} scheme-dark`}
                      />
                      <p className="mt-2 text-[10px] text-white/40">{t(`${base}.dobHint`)}</p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="country">{t(`${base}.fields.country`)}</Label>
                        <CountrySelect
                          id="country"
                          value={values.country}
                          onChange={handleChange}
                          placeholder={t(`${base}.placeholders.country`)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="nationality">{t(`${base}.fields.nationality`)}</Label>
                        <CountrySelect
                          id="nationality"
                          value={values.nationality}
                          onChange={handleChange}
                          placeholder={t(`${base}.placeholders.nationality`)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">{t(`${base}.fields.email`)}</Label>
                      <IconInput
                        icon={FiMail}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                        placeholder="tariq.sterling@cfittalent.com"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 flex w-full items-center justify-center gap-2 bg-btn-primary py-3 text-xs text-primary transition hover:bg-btn-primary/90"
                    >
                      {t(`${base}.continue`)} <FiArrowRight className="text-sm" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                    <fieldset>
                      <legend className={labelClass}>{t(`${base}.fields.position`)} *</legend>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {positions.map(({ code, key }) => {
                          const isSelected = values.position === code;
                          return (
                            <label
                              key={code}
                              className={`flex cursor-pointer flex-col items-center gap-0.5 rounded-md border px-2 py-2.5 text-center transition has-focus-visible:border-accent ${
                                isSelected
                                  ? "border-btn-primary bg-white text-primary"
                                  : "border-white/15 hover:border-white/40"
                              }`}
                            >
                              <input
                                type="radio"
                                name="position"
                                value={code}
                                required
                                checked={isSelected}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <span className="text-[11px] font-medium">{code}</span>
                              <span
                                className={`text-[10px] ${isSelected ? "text-primary/70" : "text-white/50"}`}
                              >
                                {t(`${base}.positions.${key}`)}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div>
                      <Label htmlFor="club">{t(`${base}.fields.club`)}</Label>
                      <input
                        id="club"
                        name="club"
                        required
                        value={values.club}
                        onChange={handleChange}
                        placeholder="Harbour View FC Academy (Jamaica)"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="password">{t(`${base}.fields.password`)}</Label>
                          <PasswordInput
                            id="password"
                            inputRef={passwordRef}
                            autoComplete="new-password"
                            value={values.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">
                            {t(`${base}.fields.confirmPassword`)}
                          </Label>
                          <PasswordInput
                            id="confirmPassword"
                            inputRef={confirmRef}
                            autoComplete="new-password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                        {passwordRules.map((rule) => {
                          const passed = rule.test(values.password);
                          return (
                            <li
                              key={rule.key}
                              className={`flex items-center gap-1.5 text-[10px] transition-colors ${
                                passed ? "text-emerald-400" : "text-white/40"
                              }`}
                            >
                              <FiCheck /> {t(`${base}.rules.${rule.key}`)}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <label className="flex cursor-pointer items-start gap-2 text-[10px] leading-relaxed text-white/70">
                      <input
                        type="checkbox"
                        name="terms"
                        required
                        checked={values.terms}
                        onChange={handleChange}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-btn-primary"
                      />
                      <span>
                        {t(`${base}.terms.prefix`)}{" "}
                        <Link to="/terms-and-conditions" className="text-btn-primary underline">
                          {t(`${base}.terms.service`)}
                        </Link>
                        ,{" "}
                        <Link to="/privacy-policy" className="text-btn-primary underline">
                          {t(`${base}.terms.privacy`)}
                        </Link>
                        {t(`${base}.terms.suffix`)}
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-xs text-primary transition hover:bg-white/90"
                      >
                        <FiArrowLeft /> {t(`${base}.back`)}
                      </button>
                      <button
                        type="submit"
                        className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-btn-primary py-3 text-xs text-primary transition hover:bg-btn-primary/90"
                      >
                        <LuTrophy className="text-sm" /> {t(`${base}.submit`)}
                      </button>
                    </div>
                  </form>
                )}

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-[10px]">
                  <span className="text-white/60">{t(`${base}.haveAccount`)}</span>
                  <Link
                    to="/login"
                    className="flex items-center gap-1 text-btn-primary transition-colors hover:text-btn-primary/80"
                  >
                    {t(`${base}.signInHere`)} <FiArrowRight />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayerSignup;
