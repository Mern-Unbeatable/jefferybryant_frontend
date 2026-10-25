import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const navLinks = [
  { key: "nav.home", to: "/" },
  { key: "nav.players", to: "/players" },
  { key: "nav.coachesAcademies", to: "/coaches-academies" },
  { key: "nav.about", to: "/about" },
  { key: "nav.partners", to: "/partners" },
];

const linkClass = ({ isActive }) =>
  `whitespace-nowrap text-base font-light leading-[19.5px] transition-colors hover:text-btn-primary ${
    isActive ? "text-btn-primary" : "text-white"
  }`;

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary font-tactic">
      <nav className="mx-auto flex h-16 container items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <img src="/logo.jpg" alt="CFit Talent" className="h-9 w-auto" />
        </Link>

        <ul className="hidden items-center gap-6 xl:flex 2xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className={linkClass}>
                {t(link.key)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 xl:flex">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="whitespace-nowrap text-lg font-light leading-[19.5px] text-white transition-colors hover:text-btn-primary"
          >
            {t("nav.login")}
          </Link>
          <Link
            to="/join"
            className="flex items-center gap-1 whitespace-nowrap rounded-sm bg-btn-primary px-4 py-2 text-sm font-medium uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t("nav.join")} <FiArrowUpRight />
          </Link>
        </div>

        <div className="flex items-center gap-4 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-2xl text-white"
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 bg-primary px-4 pb-6 shadow-2xl xl:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {t(link.key)}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-start gap-4">
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-sm text-white hover:text-btn-primary"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/join"
              onClick={closeMenu}
              className="flex w-fit items-center gap-1 rounded-sm bg-btn-primary px-4 py-2 text-sm font-medium uppercase text-primary hover:bg-btn-primary/90"
            >
              {t("nav.join")} <FiArrowUpRight />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
