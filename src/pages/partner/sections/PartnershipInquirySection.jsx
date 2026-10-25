import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiCheckCircle, FiChevronDown } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const base = "partners.inquiry";
const orgTypes = ["club", "academy", "association", "youth", "development", "other"];
const interests = ["talent", "development", "ecosystem", "sponsorship", "other"];

const labelClass = "text-[10px] uppercase tracking-[0.15em] text-white/50";
const inputClass =
  "mt-2 w-full border border-white/10 bg-white/2 px-3 py-3 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-accent/60";

const Field = ({ id, label, required, children }) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label}
      {required && " *"}
    </label>
    {children}
  </div>
);

const SelectField = ({ id, label, placeholder, options, ns }) => {
  const { t } = useTranslation();
  return (
    <Field id={id} label={label} required>
      <div className="relative mt-2">
        <select
          id={id}
          name={id}
          required
          defaultValue=""
          className={`${inputClass.replace("mt-2 ", "")} appearance-none pr-10 invalid:text-white/60`}
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
        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
      </div>
    </Field>
  );
};

const PartnershipInquirySection = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="partnership-inquiry" className="scroll-mt-16 pt-20 lg:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
              <span className="h-px w-8 bg-accent" />
              {t(`${base}.eyebrow`)}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t(`${base}.titleLine1`)}</span>
              <span className="block">{t(`${base}.titleLine2`)}</span>
              <span className="block text-accent">{t(`${base}.titleHighlight`)}</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/70 lg:pb-2">
            {t(`${base}.description`)}
          </p>
        </div>

        <div className="mt-12 border border-white/10 bg-white/2 p-5 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <FiCheckCircle className="text-4xl text-accent" />
              <p className="text-sm uppercase tracking-wide">{t(`${base}.successTitle`)}</p>
              <p className="max-w-md text-xs leading-relaxed text-white/60">
                {t(`${base}.successText`)}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="organization" label={t(`${base}.fields.organization`)} required>
                  <input
                    id="organization"
                    name="organization"
                    required
                    placeholder={t(`${base}.placeholders.organization`)}
                    className={inputClass}
                  />
                </Field>
                <SelectField
                  id="organizationType"
                  label={t(`${base}.fields.organizationType`)}
                  placeholder={t(`${base}.placeholders.organizationType`)}
                  options={orgTypes}
                  ns={`${base}.orgTypes`}
                />
                <Field id="contactPerson" label={t(`${base}.fields.contactPerson`)} required>
                  <input
                    id="contactPerson"
                    name="contactPerson"
                    required
                    placeholder={t(`${base}.placeholders.contactPerson`)}
                    className={inputClass}
                  />
                </Field>
                <Field id="email" label={t(`${base}.fields.email`)} required>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@organization.com"
                    className={inputClass}
                  />
                </Field>
                <Field id="country" label={t(`${base}.fields.country`)} required>
                  <input
                    id="country"
                    name="country"
                    required
                    placeholder={t(`${base}.placeholders.country`)}
                    className={inputClass}
                  />
                </Field>
                <Field id="website" label={t(`${base}.fields.website`)}>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://"
                    className={inputClass}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <SelectField
                    id="interest"
                    label={t(`${base}.fields.interest`)}
                    placeholder={t(`${base}.placeholders.interest`)}
                    options={interests}
                    ns={`${base}.interests`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field id="message" label={t(`${base}.fields.message`)} required>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder={t(`${base}.placeholders.message`)}
                      className={`${inputClass} resize-y`}
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-[10px] text-white/50">
                  <LuShieldCheck className="shrink-0 text-sm text-accent" />
                  {t(`${base}.note`)}
                </p>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-btn-primary px-6 py-3 text-xs uppercase text-primary transition hover:bg-btn-primary/90"
                >
                  {t(`${base}.submit`)} <FiArrowRight />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnershipInquirySection;
