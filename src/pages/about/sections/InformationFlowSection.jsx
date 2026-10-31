import { useTranslation } from "react-i18next";
import { FiArrowRight, FiBarChart2, FiSearch, FiUser } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const steps = [
  { key: "information", icon: FiUser },
  { key: "verification", icon: LuShieldCheck },
  { key: "intelligence", icon: FiBarChart2 },
  { key: "scouting", icon: FiSearch },
];

const InformationFlowSection = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-16 border-y border-white/10 py-16 lg:mt-20 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
              <span className="h-px w-8 bg-accent" />
              {t("about.flow.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("about.flow.titleLine1")}</span>
              <span className="block">{t("about.flow.titleLine2")}</span>
              <span className="block text-accent">{t("about.flow.titleHighlight")}</span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-white/80 lg:pb-2">
            {t("about.flow.description")}
          </p>
        </div>

        <ol className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ key, icon }, index) => {
            const Icon = icon;
            return (
              <li
                key={key}
                className="relative flex flex-col border-b border-r border-white/10 p-6"
              >
                {index > 0 && (
                  <span className="absolute left-0 top-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-primary text-sm text-accent lg:flex">
                    <FiArrowRight />
                  </span>
                )}
                <span className="flex h-12 w-12 items-center justify-center border border-accent/40 text-accent">
                  <Icon />
                </span>
                <span className="mt-8 text-xs uppercase tracking-[0.15em] text-btn-primary">
                  {t("about.flow.stepLabel")} {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-sm uppercase tracking-wide">
                  {t(`about.flow.steps.${key}.title`)}
                </h3>
                <p className="mt-3 max-w-56 text-base leading-relaxed text-white/60">
                  {t(`about.flow.steps.${key}.description`)}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default InformationFlowSection;
