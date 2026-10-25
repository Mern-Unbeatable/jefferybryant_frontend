import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiArrowUpRight, FiChevronDown } from "react-icons/fi";

const base = "coaches.recommend";

const RecommendPlayerSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="order-2 border border-white/10 bg-white/2 p-5 sm:p-6 lg:order-1">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <p className="text-xs uppercase tracking-wide">{t(`${base}.form.title`)}</p>
            <span className="text-[9px] uppercase tracking-wide text-white/40">
              {t(`${base}.form.preview`)}
            </span>
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-[0.15em] text-white/50">
            {t(`${base}.form.playerLabel`)}
          </p>
          <div className="mt-2 flex items-center justify-between border border-white/10 bg-primary px-3 py-3 text-xs">
            Daniel Williams <FiChevronDown className="text-white/50" />
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-white/50">
            {t(`${base}.form.typeLabel`)}
          </p>
          <div className="mt-2 flex items-center justify-between border border-white/10 bg-primary px-3 py-3 text-xs">
            {t(`${base}.form.typeValue`)} <FiChevronDown className="text-white/50" />
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-white/50">
            {t(`${base}.form.commentsLabel`)}
          </p>
          <div className="mt-2 min-h-20 border border-white/10 bg-primary px-3 py-3 text-xs text-white/50">
            {t(`${base}.form.commentsValue`)}
          </div>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 bg-btn-primary px-4 py-3 text-xs uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t(`${base}.form.submit`)} <FiArrowRight />
          </button>
          <p className="mt-4 text-center text-[9px] text-white/40">{t(`${base}.form.note`)}</p>
        </div>

        <div className="order-1 lg:order-2">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t(`${base}.eyebrow`)}
          </p>
          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t(`${base}.titleLine1`)}</span>
            <span className="block">{t(`${base}.titleLine2`)}</span>
            <span className="block">{t(`${base}.titleLine3`)}</span>
            <span className="block text-accent">{t(`${base}.titleHighlight`)}</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/80">
            {t(`${base}.description`)}
          </p>
          <Link
            to="/join/coach"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t(`${base}.cta`)} <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendPlayerSection;
