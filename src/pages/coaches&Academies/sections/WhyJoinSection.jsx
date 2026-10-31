import { useTranslation } from "react-i18next";
import { FiBarChart2, FiUser, FiUsers } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const items = [
  { key: "together", icon: FiUsers },
  { key: "invite", icon: FiUser },
  { key: "track", icon: FiBarChart2 },
  { key: "recommend", icon: LuShieldCheck },
];

const WhyJoinSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
              <span className="h-px w-8 bg-accent" />
              {t("coaches.whyJoin.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("coaches.whyJoin.titleLine1")}</span>
              <span className="block">{t("coaches.whyJoin.titleLine2")}</span>
              <span className="block">
                {t("coaches.whyJoin.titleLine3")}{" "}
                <span className="text-accent">
                  {t("coaches.whyJoin.titleHighlight")}
                </span>
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-white/80 lg:pb-2">
            {t("coaches.whyJoin.description")}
          </p>
        </div>

        <ul className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon }, index) => {
            const Icon = icon;
            return (
              <li
                key={key}
                className="flex flex-col border-b border-r border-white/10 bg-white/2 p-6 transition-colors hover:bg-white/4"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center border border-accent/40 text-accent">
                    <Icon />
                  </span>
                </div>
                <h3 className="mt-14 text-base uppercase tracking-wide">
                  {t(`coaches.whyJoin.items.${key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {t(`coaches.whyJoin.items.${key}.description`)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default WhyJoinSection;
