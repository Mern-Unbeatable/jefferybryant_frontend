import { useTranslation } from "react-i18next";
import { LuShieldCheck } from "react-icons/lu";

const ManagementSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-16 lg:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
              <span className="h-px w-8 bg-accent" />
              {t("about.management.eyebrow")}
            </p>
            <h2 className="mt-6 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              <span className="block">{t("about.management.titleLine1")}</span>
              <span className="block text-accent">{t("about.management.titleHighlight")}</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/80">{t("about.management.managedBy")}</p>
            <p className="mt-4 text-base leading-relaxed text-white/70">{t("about.management.network")}</p>
          </div>

          <div className="flex items-center justify-center rounded-sm border border-white/10 bg-black p-8 sm:p-12">
            <img
              src="/about.png"
              alt={t("about.management.logoAlt")}
              loading="lazy"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>

        <div className="mt-12 rounded-sm border border-white/10 bg-white/2 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent/40 text-accent">
              <LuShieldCheck className="text-xl" />
            </span>
            <div>
              <h3 className="font-ethnocentric text-sm uppercase tracking-wide sm:text-base">
                {t("about.management.safeguardingTitle")}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
                {t("about.management.safeguardingText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagementSection;
