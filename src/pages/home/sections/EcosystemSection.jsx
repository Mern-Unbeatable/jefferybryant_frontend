import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiSearch, FiUser, FiUsers } from "react-icons/fi";

const cards = [
  {
    key: "players",
    icon: FiUser,
    image: "/home/football_field.png",
    to: "/join/player",
  },
  {
    key: "coaches",
    icon: FiUsers,
    image: "/home/football_environment.png",
    to: "/join/coach",
  },
  {
    key: "scouts",
    icon: FiSearch,
    image: "/home/Scouts.png",
    to: "/about",
  },
];

const EcosystemSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
              <span className="h-px w-8 bg-accent" />
              {t("home.ecosystem.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("home.ecosystem.title")}</span>
              <span className="text-accent">
                {t("home.ecosystem.titleHighlight")}
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/80 lg:pb-2">
            {t("home.ecosystem.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ key, icon, image, to }, index) => {
            const Icon = icon;
            return (
              <article
                key={key}
                className="group relative isolate flex min-h-96 flex-col justify-end overflow-hidden border border-white/10 p-6 transition-colors hover:border-accent/40"
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-primary/60 to-primary" />

                <span className="absolute left-6 top-6 text-xs text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center border border-accent/40 bg-primary/60 text-accent">
                  <Icon />
                </span>

                <h3 className="text-lg uppercase">
                  {t(`home.ecosystem.${key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  {t(`home.ecosystem.${key}.description`)}
                </p>
                <Link
                  to={to}
                  className="mt-6 inline-flex w-fit items-center gap-3 text-xs uppercase tracking-wider text-btn-primary transition-colors hover:text-white"
                >
                  {t(`home.ecosystem.${key}.cta`)} <FiArrowRight />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
