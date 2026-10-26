import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = ({ menuKey }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isOverview = menuKey === "overview";

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-accent">
        {t(`dashboard.portals.${user.role}`)}
      </p>
      <h1 className="mt-3 font-ethnocentric text-xl uppercase sm:text-2xl">
        {isOverview ? t("dashboard.welcome", { name: user.name }) : t(`dashboard.menu.${menuKey}`)}
      </h1>
      <div className="mt-8 flex min-h-64 items-center justify-center border border-dashed border-white/10 bg-white/2 p-8 text-center text-sm text-white/40">
        {t("dashboard.placeholder")}
      </div>
    </div>
  );
};

export default DashboardPage;
