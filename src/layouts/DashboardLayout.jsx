import { useRef, useState } from "react";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiMenu } from "react-icons/fi";
import Logo from "@/components/common/Logo";
import Sidebar from "@/components/dashboard/Sidebar";
import { usePageAnimations } from "@/hooks/usePageAnimations";

const DashboardLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  usePageAnimations(mainRef, pathname);

  return (
    <div className="min-h-svh">
      <ScrollRestoration />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-primary px-4 lg:hidden">
          <Link to="/" aria-label="CFit Talent">
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label={t("dashboard.openMenu")}
            className="text-2xl text-white"
          >
            <FiMenu />
          </button>
        </header>

        <main ref={mainRef} className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
