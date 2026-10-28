import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

const WhatIsCFitSection = () => {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden py-16 lg:py-20">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
            <span className="h-px w-8 bg-accent" />
            {t("home.whatIs.eyebrow")}
          </p>

          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t("home.whatIs.titleLine1")}</span>
            {t("home.whatIs.titleLine2")}{" "}
            <span className="text-accent">
              {t("home.whatIs.titleHighlight")}
            </span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-white/80 sm:text-base">
            {t("home.whatIs.description")}
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm text-primary transition hover:bg-btn-primary/90"
          >
            {t("home.whatIs.cta")} <FiArrowUpRight />
          </Link>
        </div>

        <img
          src="/home/map.png"
          alt={t("home.whatIs.mapAlt")}
          loading="lazy"
          className="w-full"
        />
      </div>
    </section>
  );
};

export default WhatIsCFitSection;
