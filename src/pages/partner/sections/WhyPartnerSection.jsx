import { useTranslation } from "react-i18next";
import { FiSearch, FiUser, FiUsers } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const items = [
  { key: "talent", icon: FiSearch },
  { key: "development", icon: FiUser },
  { key: "connections", icon: FiUsers },
  { key: "ecosystem", icon: LuShieldCheck },
];

const WhyPartnerSection = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-16 border-t border-white/10 pt-16 lg:mt-20 lg:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
            <span className="h-px w-8 bg-accent" />
            {t("partners.why.eyebrow")}
          </p>
          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t("partners.why.titleLine1")}</span>
            <span className="block">{t("partners.why.titleLine2")}</span>
            <span className="block">
              {t("partners.why.titleLine3")}{" "}
              <span className="text-accent">{t("partners.why.titleHighlight")}</span>
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/80">
            {t("partners.why.description")}
          </p>
        </div>

        <ul className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon }, index) => {
            const Icon = icon;
            return (
              <li
                key={key}
                className="flex flex-col border-b border-r border-white/10 bg-linear-to-b from-white/2 to-accent/5 p-6"
              >
                <span className="text-sm text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-6 flex h-12 w-12 items-center justify-center border border-btn-primary/40 text-btn-primary">
                  <Icon />
                </span>
                <h3 className="mt-6 text-sm uppercase tracking-wide">
                  {t(`partners.why.items.${key}.title`)}
                </h3>
                <p className="mt-4 max-w-60 text-xs leading-relaxed text-white/60">
                  {t(`partners.why.items.${key}.description`)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default WhyPartnerSection;
