import { useTranslation } from "react-i18next";
import { FiInfo } from "react-icons/fi";

const ProfilePageHeader = ({ eyebrow, title, subtitle }) => {
  const { t } = useTranslation();

  return (
    <>
      <p className="flex items-center gap-2 rounded-md border border-accent/30 bg-accent/5 px-4 py-2.5 text-[11px] text-white/70">
        <FiInfo className="shrink-0 text-accent" />
        {t("playerDashboard.profile.demoNotice")}
      </p>

      <section>
        <p className="text-[10px] uppercase tracking-[0.2em] text-btn-primary/80">{eyebrow}</p>
        <h1 className="mt-2 font-ethnocentric text-xl uppercase sm:text-3xl">{title}</h1>
        <p className="mt-2 text-xs text-white/60">{subtitle}</p>
      </section>
    </>
  );
};

export default ProfilePageHeader;
