import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiCheck, FiChevronDown } from "react-icons/fi";
import { usePageAnimations } from "@/hooks/usePageAnimations";
import CoachPortalHeader from "@/pages/join/CoachPortalHeader";
import { gridBackground } from "@/pages/join/gridBackground";

const base = "coachSignup";
const journey = ["submit", "review", "approved", "invite"];
const orgTypes = ["academy", "club", "school", "league", "federation", "independentCoach"];
const playerRanges = ["1-15", "16-30", "31-50", "51-100", "100+"];

const labelClass = "flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/50";
const inputClass =
  "mt-2 w-full border border-white/10 bg-black/30 px-3 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-accent/60";

const Field = ({ id, label, optional, children }) => {
  const { t } = useTranslation();
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        <span>
          {label}
          {!optional && " *"}
        </span>
        {optional && <span className="normal-case tracking-normal text-white/30">{t(`${base}.optional`)}</span>}
      </label>
      {children}
    </div>
  );
};

const TextField = ({ id, label, optional, ...props }) => (
  <Field id={id} label={label} optional={optional}>
    <input id={id} name={id} required={!optional} className={inputClass} {...props} />
  </Field>
);

const SelectField = ({ id, label, placeholder, options, ns }) => {
  const { t } = useTranslation();
  return (
    <Field id={id} label={label}>
      <div className="relative">
        <select
          id={id}
          name={id}
          required
          defaultValue=""
          className={`${inputClass} appearance-none pr-10 invalid:text-white/30`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-primary text-white">
              {t(`${ns}.${option}`)}
            </option>
          ))}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-white/40" />
      </div>
    </Field>
  );
};

const FormBlock = ({ number, name, children }) => {
  const { t } = useTranslation();
  return (
    <div className="border-b border-white/10 p-5 sm:p-8">
      <div className="flex items-start gap-3">
        <span className="font-ethnocentric text-[10px] text-btn-primary">{number}</span>
        <div>
          <h2 className="text-lg">{t(`${base}.blocks.${name}.title`)}</h2>
          <p className="mt-1 text-[11px] text-white/50">{t(`${base}.blocks.${name}.description`)}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
};

const CoachSignup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  usePageAnimations(pageRef, "/join/coach");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    navigate("/join/coach/pending", {
      state: { organization: data.get("organization"), email: data.get("email") },
    });
  };

  return (
    <div ref={pageRef} className={`min-h-svh ${gridBackground}`}>
      <CoachPortalHeader />

      <section className="container mx-auto px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t(`${base}.eyebrow`)}
          </p>
          <h1 className="mt-6 font-ethnocentric text-3xl uppercase leading-tight sm:text-5xl">
            <span className="block">{t(`${base}.titleLine1`)}</span>
            <span className="block text-btn-primary">{t(`${base}.titleHighlight`)}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">{t(`${base}.description`)}</p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <ol className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((key, index) => (
              <li
                key={key}
                className="flex items-center gap-3 border-b border-r border-white/10 bg-white/2 px-5 py-5 text-[11px] text-white/70"
              >
                <span className="font-ethnocentric text-xs text-btn-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {t(`${base}.journey.${key}`)}
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit} className="mt-6 border border-white/10 bg-primary/80">
            <FormBlock number="01" name="organization">
              <TextField
                id="organization"
                label={t(`${base}.fields.organization`)}
                placeholder="Kingston Athletic Academy"
              />
              <SelectField
                id="organizationType"
                label={t(`${base}.fields.organizationType`)}
                placeholder={t(`${base}.placeholders.select`)}
                options={orgTypes}
                ns={`${base}.orgTypes`}
              />
              <TextField id="country" label={t(`${base}.fields.country`)} placeholder="Jamaica" />
              <TextField id="city" label={t(`${base}.fields.city`)} placeholder="Kingston" />
            </FormBlock>

            <FormBlock number="02" name="director">
              <TextField
                id="fullName"
                label={t(`${base}.fields.fullName`)}
                autoComplete="name"
                placeholder="David Morgan"
              />
              <TextField id="role" label={t(`${base}.fields.role`)} placeholder="Academy Director" />
              <TextField
                id="email"
                type="email"
                label={t(`${base}.fields.email`)}
                autoComplete="email"
                placeholder="david@kingstonathletic.com"
              />
              <TextField
                id="phone"
                type="tel"
                label={t(`${base}.fields.phone`)}
                autoComplete="tel"
                placeholder="+1 876 555 0148"
              />
            </FormBlock>

            <FormBlock number="03" name="network">
              <div className="sm:col-span-2">
                <SelectField
                  id="playerCount"
                  label={t(`${base}.fields.playerCount`)}
                  placeholder={t(`${base}.placeholders.range`)}
                  options={playerRanges}
                  ns={`${base}.playerRanges`}
                />
              </div>
            </FormBlock>

            <FormBlock number="04" name="additional">
              <TextField
                id="website"
                type="url"
                optional
                label={t(`${base}.fields.website`)}
                placeholder="https://yourwebsite.com"
              />
              <TextField
                id="social"
                optional
                label={t(`${base}.fields.social`)}
                placeholder="@yourorganization"
              />
              <TextField
                id="ageGroups"
                optional
                label={t(`${base}.fields.ageGroups`)}
                placeholder="e.g. U15, U17, U21"
              />
              <TextField
                id="additionalContact"
                optional
                label={t(`${base}.fields.additionalContact`)}
                placeholder={t(`${base}.placeholders.additionalContact`)}
              />
            </FormBlock>

            <div className="p-5 sm:p-8">
              <label className="flex cursor-pointer items-start gap-3 border border-white/10 bg-black/30 p-4 text-[11px] leading-relaxed text-white/70">
                <input
                  type="checkbox"
                  name="acknowledge"
                  required
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-btn-primary"
                />
                {t(`${base}.acknowledge`)} *
              </label>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-[10px] text-white/50">
                  <FiCheck className="shrink-0 text-sm text-emerald-400" />
                  {t(`${base}.privacyNote`)}
                </p>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-btn-primary px-6 py-3 text-xs text-primary transition hover:bg-btn-primary/90"
                >
                  <FiArrowRight className="text-sm" /> {t(`${base}.submit`)}
                </button>
              </div>
            </div>
          </form>

          <p className="mt-8 text-center text-[11px] text-white/50">
            {t(`${base}.alreadyRegistered`)}{" "}
            <Link to="/login" className="text-btn-primary transition-colors hover:text-btn-primary/80">
              {t(`${base}.signIn`)}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default CoachSignup;
