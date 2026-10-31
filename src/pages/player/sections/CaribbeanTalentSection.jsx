import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

const CaribbeanTalentSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative isolate mt-20 overflow-hidden py-24 lg:mt-28 lg:py-32">
      <img
        src="/player/caribbeanTalent.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary via-primary/80 to-primary/20 lg:via-primary/30 lg:to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent sm:text-sm">
            <span className="h-px w-8 bg-accent" />
            {t("player.caribbeanTalent.eyebrow")}
          </p>

          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t("player.caribbeanTalent.titleLine1")}</span>
            <span className="block">{t("player.caribbeanTalent.titleLine2")}</span>
            <span className="block text-accent">
              {t("player.caribbeanTalent.titleHighlight")}
            </span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-base">
            {t("player.caribbeanTalent.description1")}
          </p>
          <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-base">
            {t("player.caribbeanTalent.description2")}
          </p>

          <Link
            to="/join/player"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t("player.caribbeanTalent.cta")} <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaribbeanTalentSection;
