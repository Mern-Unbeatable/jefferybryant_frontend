import { useTranslation } from "react-i18next";
import { FiBarChart2, FiSearch, FiUser, FiUsers, FiVideo } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import Logo from "@/components/common/Logo";

const nodes = [
  { key: "clubs", icon: FiUsers, x: 22, y: 12 },
  { key: "academies", icon: FiBarChart2, x: 78, y: 12 },
  { key: "coaches", icon: FiUser, x: 12, y: 50 },
  { key: "players", icon: FiVideo, x: 88, y: 50 },
  { key: "development", icon: LuShieldCheck, x: 27, y: 88 },
  { key: "scouts", icon: FiSearch, x: 75, y: 88 },
];

const EcosystemDiagramSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-20 lg:pt-28">
      <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
            <span className="h-px w-8 bg-accent" />
            {t("partners.ecosystem.eyebrow")}
          </p>
          <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
            <span className="block">{t("partners.ecosystem.titleLine1")}</span>
            <span className="block">{t("partners.ecosystem.titleLine2")}</span>
            <span className="block">{t("partners.ecosystem.titleLine3")}</span>
            <span className="block text-accent">
              {t("partners.ecosystem.titleHighlight")}
            </span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            {t("partners.ecosystem.description")}
          </p>
        </div>

        <div className="relative aspect-4/3 w-full">
          <div className="absolute inset-[15%] rounded-full bg-accent/5 blur-3xl" />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {nodes.map(({ key, x, y }) => (
              <line
                key={key}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="rgba(41, 211, 242, 0.15)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          <Logo
            stacked
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          {nodes.map(({ key, icon, x, y }) => {
            const Icon = icon;
            return (
              <div
                key={key}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap border border-white/10 bg-primary px-2 py-1.5 sm:px-3 sm:py-2"
              >
                <span className="flex h-5 w-5 items-center justify-center border border-accent/30 text-[10px] text-accent">
                  <Icon />
                </span>
                <span className="text-[8px] uppercase tracking-wide text-white/70 sm:text-[9px]">
                  {t(`partners.ecosystem.nodes.${key}`)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EcosystemDiagramSection;
