import { useTranslation } from "react-i18next";

const steps = ["join", "build", "verify", "discover"];

const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="border-y border-white/10 py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
              <span className="h-px w-8 bg-accent" />
              {t("home.howItWorks.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("home.howItWorks.title")}</span>
              <span className="text-accent">
                {t("home.howItWorks.titleHighlight")}
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/80 lg:pb-2">
            {t("home.howItWorks.description")}
          </p>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((key, index) => (
            <li key={key}>
              <span className="text-lg text-btn-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent ring-4 ring-accent/20" />
                <span className="h-px flex-1 bg-accent/20" />
              </div>
              <h3 className="mt-6 text-sm uppercase">
                {t(`home.howItWorks.steps.${key}.title`)}
              </h3>
              <p className="mt-4 max-w-60 text-xs leading-relaxed text-white/70">
                {t(`home.howItWorks.steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorksSection;
