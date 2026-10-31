import { useTranslation } from "react-i18next";

const steps = ["create", "complete", "review"];

const JoinStepsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
              <span className="h-px w-8 bg-accent" />
              {t("player.joinSteps.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("player.joinSteps.titleLine1")}</span>
              <span className="block">
                {t("player.joinSteps.titleLine2")}{" "}
                <span className="text-accent">
                  {t("player.joinSteps.titleHighlight")}
                </span>
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-white/80 lg:pb-2">
            {t("player.joinSteps.description")}
          </p>
        </div>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((key, index) => (
            <li key={key}>
              <div className="flex items-end gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {t("player.joinSteps.stepLabel")}
                </span>
                <span className="text-2xl leading-none text-btn-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-5 flex items-center">
                <span className="relative flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="h-px flex-1 bg-white/10 md:mr-8" />
              </div>

              <h3 className="mt-5 text-lg uppercase tracking-wide">
                {t(`player.joinSteps.steps.${key}.title`)}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                {t(`player.joinSteps.steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default JoinStepsSection;
