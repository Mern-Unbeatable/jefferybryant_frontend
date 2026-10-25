import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

const CtaSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden border border-btn-primary/20 px-6 py-14 sm:px-10 lg:px-12 lg:py-16">
          <img
            src="/common/emptyStadium.png"
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/90 via-primary/50 to-transparent" />

          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
              <span className="h-px w-8 bg-accent" />
              {t("cta.eyebrow")}
            </p>

            <h2 className="mt-6 max-w-lg font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              {t("cta.title")}{" "}
              <span className="text-accent">{t("cta.titleHighlight")}</span>
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-white/80">
              {t("cta.description")}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/join/player"
                className="flex items-center justify-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
              >
                {t("cta.createProfile")} <FiArrowUpRight />
              </Link>
              <Link
                to="/join/coach"
                className="flex items-center justify-center gap-2 rounded-sm border border-white/20 bg-primary/80 px-6 py-3 text-sm uppercase text-white transition hover:border-white"
              >
                {t("cta.joinCoach")} <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
