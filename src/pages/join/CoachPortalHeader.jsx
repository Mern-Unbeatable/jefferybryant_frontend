import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "@/components/common/Logo";

const CoachPortalHeader = () => {
  const { t } = useTranslation();

  return (
    <header className="border-b border-white/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="CFit Talent">
          <Logo />
        </Link>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
          {t("coachSignup.portal")}
        </span>
      </div>
    </header>
  );
};

export default CoachPortalHeader;
