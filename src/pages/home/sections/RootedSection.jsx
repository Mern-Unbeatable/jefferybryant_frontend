import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

const RootedSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-32">
      <img
        src="/home/caribbeanPitch.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary via-primary/80 to-primary/20 lg:via-primary/40 lg:to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t("home.rooted.eyebrow")}
          </p>

          <h2 className="mt-6 max-w-lg font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            {t("home.rooted.title")}{" "}
            <span className="text-accent">{t("home.rooted.titleHighlight")}</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-white/80 sm:text-base">
            {t("home.rooted.description")}
          </p>

          <Link
            to="/join"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t("home.rooted.cta")} <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RootedSection;
