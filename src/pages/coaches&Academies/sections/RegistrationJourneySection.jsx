import { useTranslation } from "react-i18next";

const steps = [
  { key: "register" },
  { key: "approval", badge: true },
  { key: "invite" },
  { key: "track" },
  { key: "recommend" },
];

const RegistrationJourneySection = () => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="scroll-mt-16 pt-20 lg:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
              <span className="h-px w-8 bg-accent" />
              {t("coaches.journey.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("coaches.journey.titleLine1")}</span>
              <span className="block">
                {t("coaches.journey.titleLine2")}{" "}
                <span className="text-accent">
                  {t("coaches.journey.titleHighlight")}
                </span>
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/80 lg:pb-2">
            {t("coaches.journey.description")}
          </p>
        </div>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map(({ key, badge }, index) => (
            <li key={key}>
              <div className="flex items-center justify-between gap-2 lg:mr-4">
                <span className="text-2xl leading-none text-btn-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {badge && (
                  <span className="border border-btn-primary/50 px-1.5 py-1 text-[8px] uppercase tracking-wide text-btn-primary">
                    {t("coaches.journey.approvalRequired")}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center">
                <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full border border-accent">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                </span>
                <span className="h-px flex-1 bg-white/10 lg:mr-4" />
              </div>

              <h3 className="mt-5 text-xs uppercase tracking-wide">
                {t(`coaches.journey.steps.${key}.title`)}
              </h3>
              <p className="mt-4 max-w-56 text-xs leading-relaxed text-white/70">
                {t(`coaches.journey.steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default RegistrationJourneySection;
