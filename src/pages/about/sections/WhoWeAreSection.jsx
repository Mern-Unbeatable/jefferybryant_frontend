import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

const WhoWeAreSection = () => {
  const { t } = useTranslation();

  return (
    <section className="overflow-x-clip pt-20 lg:pt-28">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t("about.whoWeAre.eyebrow")}
          </p>
          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t("about.whoWeAre.titleLine1")}</span>
            <span className="block">{t("about.whoWeAre.titleLine2")}</span>
            <span className="block">{t("about.whoWeAre.titleLine3")}</span>
            <span className="block text-accent">{t("about.whoWeAre.titleHighlight")}</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/80">
            {t("about.whoWeAre.description")}
          </p>
          <a
            href="#our-mission"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t("about.whoWeAre.cta")} <FiArrowUpRight />
          </a>
        </div>

        <img
          src="/about/caribbeanCity.png"
          alt={t("about.whoWeAre.imageAlt")}
          loading="lazy"
          className="-mb-[13%] -ml-[10.7%] -mt-[7%] w-[121%] max-w-none"
        />
      </div>
    </section>
  );
};

export default WhoWeAreSection;
