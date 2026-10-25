import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

const CoachesHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden lg:min-h-[640px]">
      <img
        src="/coaches&Academies/coachesHero.png"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary via-primary/60 to-transparent lg:via-primary/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-primary to-transparent" />

      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t("coaches.hero.eyebrow")}
          </p>

          <h1 className="mt-6 max-w-[640px] font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl lg:text-5xl">
            <span className="block">{t("coaches.hero.titleLine1")}</span>
            <span className="block">{t("coaches.hero.titleLine2")}</span>
            <span className="block text-accent">
              {t("coaches.hero.titleHighlight")}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {t("coaches.hero.description")}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/join/coach"
              className="flex items-center justify-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
            >
              {t("coaches.hero.register")} <FiArrowUpRight />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center justify-center gap-2 rounded-sm border border-white/20 bg-primary/80 px-6 py-3 text-sm uppercase text-white transition hover:border-white"
            >
              {t("coaches.hero.discover")} <FiArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachesHeroSection;
