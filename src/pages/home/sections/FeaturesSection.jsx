import { useTranslation } from "react-i18next";
import { FiBarChart2, FiSearch, FiUser, FiUsers, FiVideo } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const features = [
  { key: "profiles", icon: FiUser },
  { key: "connections", icon: FiUsers },
  { key: "intelligence", icon: FiBarChart2 },
  { key: "scouting", icon: FiSearch },
  { key: "verified", icon: LuShieldCheck },
  { key: "video", icon: FiVideo },
];

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
          <span className="h-px w-8 bg-accent" />
          {t("home.features.eyebrow")}
        </p>
        <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
          <span className="block">{t("home.features.titleLine1")}</span>
          <span className="block">{t("home.features.titleLine2")}</span>
          <span className="text-accent">
            {t("home.features.titleHighlight")}
          </span>
        </h2>

        <ul className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ key, icon }) => {
            const Icon = icon;
            return (
              <li
                key={key}
                className="flex gap-4 border-b border-r border-white/10 p-6 transition-colors hover:bg-white/2 lg:p-8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/40 text-accent">
                  <Icon />
                </span>
                <div>
                  <h3 className="text-xs uppercase tracking-wide">
                    {t(`home.features.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/70">
                    {t(`home.features.items.${key}.description`)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FeaturesSection;
