import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";

const steps = ["interest", "connect", "explore"];

const PartnershipStepsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
              <span className="h-px w-8 bg-accent" />
              {t("partners.steps.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("partners.steps.titleLine1")}</span>
              <span className="block">{t("partners.steps.titleLine2")}</span>
              <span className="block">{t("partners.steps.titleLine3")}</span>
              <span className="block text-accent">{t("partners.steps.titleHighlight")}</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/70 lg:pb-2">
            {t("partners.steps.description")}
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((key, index) => (
            <li
              key={key}
              className="relative min-h-44 border border-white/10 bg-white/2 p-6"
            >
              {index > 0 && (
                <span className="absolute -left-2 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-primary text-[10px] text-accent md:flex">
                  <FiArrowRight />
                </span>
              )}
              <div className="flex items-end gap-2">
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/50">
                  {t("partners.steps.stepLabel")}
                </span>
                <span className="text-xl leading-none text-btn-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 text-xs uppercase tracking-wide">
                {t(`partners.steps.items.${key}.title`)}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-white/60">
                {t(`partners.steps.items.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default PartnershipStepsSection;
