import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiSearch, FiUser, FiUsers } from "react-icons/fi";

const tags = [
  { key: "profiles", icon: FiUser },
  { key: "connections", icon: FiUsers },
  { key: "scouting", icon: FiSearch },
];

const MissionSection = () => {
  const { t } = useTranslation();

  return (
    <section id="our-mission" className="scroll-mt-16 overflow-x-clip pt-16 lg:pt-20">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <img
          src="/about/missionPlayer.png"
          alt={t("about.mission.imageAlt")}
          loading="lazy"
          className="order-2 -mb-[13%] -ml-[10.7%] -mt-[7%] w-[121%] max-w-none lg:order-1"
        />

        <div className="order-1 max-w-xl lg:order-2">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
            <span className="h-px w-8 bg-accent" />
            {t("about.mission.eyebrow")}
          </p>
          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t("about.mission.titleLine1")}</span>
            <span className="block">{t("about.mission.titleLine2")}</span>
            <span className="block text-accent">{t("about.mission.titleHighlight1")}</span>
            <span className="block text-accent">{t("about.mission.titleHighlight2")}</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/80">
            {t("about.mission.description")}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {tags.map(({ key, icon }) => {
              const Icon = icon;
              return (
                <li
                  key={key}
                  className="flex items-center gap-2 border border-white/10 px-3 py-2 text-xs uppercase tracking-wide text-white/70"
                >
                  <Icon className="text-sm text-accent" />
                  {t(`about.mission.tags.${key}`)}
                </li>
              );
            })}
          </ul>

          <Link
            to="/join"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t("about.mission.cta")} <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
