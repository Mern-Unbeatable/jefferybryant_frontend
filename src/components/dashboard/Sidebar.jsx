import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiLogOut, FiX } from "react-icons/fi";
import Logo from "@/components/common/Logo";
import { DASHBOARD_MENUS } from "@/constants/dashboardMenus";
import { useAuth } from "@/hooks/useAuth";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm transition-colors ${
    isActive
      ? "border-btn-primary bg-btn-primary/20 text-btn-primary"
      : "border-transparent text-white/50 hover:bg-white/5 hover:text-white"
  }`;

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menu = DASHBOARD_MENUS[user.role];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#161b1f] px-4 py-6 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="CFit Talent">
            <Logo size="md" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("dashboard.closeMenu")}
            className="text-xl text-white/60 lg:hidden"
          >
            <FiX />
          </button>
        </div>

        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="px-1 text-xs text-white/80">{t(`dashboard.portals.${user.role}`)}</p>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {menu.map(({ key, path, icon }) => {
              const Icon = icon;
              return (
                <li key={key}>
                  <NavLink
                    to={`/dashboard/${user.role}${path ? `/${path}` : ""}`}
                    end={!path}
                    onClick={onClose}
                    className={linkClass}
                  >
                    <Icon className="shrink-0 text-base" />
                    {t(`dashboard.menu.${key}`)}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 rounded-md bg-white/5 p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm text-accent">
              {getInitials(user.name)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm">{user.name}</span>
              <span className="block truncate text-[11px] text-white/60">
                {t(`dashboard.status.${user.role}`)}
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-md bg-white/5 px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-red-500/10 hover:text-white"
          >
            <FiLogOut className="text-base text-red-400" />
            {t("dashboard.logout")}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
