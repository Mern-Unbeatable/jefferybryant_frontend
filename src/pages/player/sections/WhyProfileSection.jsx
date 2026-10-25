import { useTranslation } from "react-i18next";
import { FiBarChart2, FiUser, FiUsers, FiVideo } from "react-icons/fi";

const items = [
  { key: "identity", icon: FiUser },
  { key: "showcase", icon: FiVideo },
  { key: "ecosystem", icon: FiUsers },
  { key: "organized", icon: FiBarChart2 },
];

const WhyProfileSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
              <span className="h-px w-8 bg-accent" />
              {t("player.whyProfile.eyebrow")}
            </p>
            <h2 className="mt-6 max-w-2xl font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              {t("player.whyProfile.title")}{" "}
              <span className="text-accent">
                {t("player.whyProfile.titleHighlight")}
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/80 lg:pb-2">
            {t("player.whyProfile.description")}
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
                  <span className="text-xs text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center border border-accent/40 text-accent">
                    <Icon />
                  </span>
                </div>
                <h3 className="mt-14 text-xs uppercase tracking-wide">
                  {t(`player.whyProfile.items.${key}.title`)}
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-white/70">
                  {t(`player.whyProfile.items.${key}.description`)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default WhyProfileSection;
