import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMinus, FiPlus } from "react-icons/fi";

const faqs = [
  "whatIs",
  "whoCanCreate",
  "whatInfo",
  "addVideos",
  "verification",
  "recommend",
  "update",
];

const PlayerFaqSection = () => {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState(faqs[0]);

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t("player.faq.eyebrow")}
          </p>
          <h2 className="mt-6 font-ethnocentric text-3xl uppercase leading-tight sm:text-5xl">
            <span className="block">{t("player.faq.titleLine1")}</span>
            <span className="block">{t("player.faq.titleLine2")}</span>
            <span className="block">
              {t("player.faq.titleLine3")}{" "}
              <span className="text-accent">{t("player.faq.titleHighlight")}</span>
            </span>
            <span className="block text-accent">
              {t("player.faq.titleHighlight2")}
            </span>
          </h2>
          <p className="mt-10 max-w-sm text-sm leading-relaxed text-white/80">
            {t("player.faq.description")}
          </p>
        </div>

        <ul className="border-t border-white/10">
          {faqs.map((key, index) => {
            const isOpen = openKey === key;
            const panelId = `player-faq-${key}`;
            return (
              <li key={key} className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenKey(isOpen ? null : key)}
                  className="flex w-full items-center gap-5 py-6 text-left"
                >
                  <span className="text-sm text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-sm uppercase tracking-wide transition-colors ${
                      isOpen ? "text-accent" : "text-white hover:text-accent"
                    }`}
                  >
                    {t(`player.faq.items.${key}.question`)}
                  </span>
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent/60 text-[10px] text-accent">
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>
                <div
                  id={panelId}
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="overflow-hidden pl-9 pr-8 text-xs leading-relaxed text-white/70">
                    {t(`player.faq.items.${key}.answer`)}
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

export default PlayerFaqSection;
