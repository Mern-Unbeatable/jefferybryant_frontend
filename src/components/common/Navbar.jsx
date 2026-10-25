import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Players", to: "/players" },
  { label: "Coaches & Academies", to: "/coaches-academies" },
  { label: "About CFit", to: "/about" },
  { label: "Partners", to: "/partners" },
];

const linkClass = ({ isActive }) =>
  `text-base font-light leading-[19.5px] transition-colors hover:text-btn-primary ${
    isActive ? "text-btn-primary" : "text-white"
  }`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary font-tactic">
      <nav className="mx-auto flex h-16 container items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <img src="/logo.jpg" alt="CFit Talent" className="h-9 w-auto" />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/login"
            className="text-lg font-light leading-[19.5px] text-white transition-colors hover:text-btn-primary"
          >
            Login
          </Link>
          <Link
            to="/join"
            className="flex items-center gap-1 rounded-sm bg-btn-primary px-4 py-2 text-sm font-medium uppercase text-primary transition hover:bg-btn-primary/90"
          >
            Join CFit <FiArrowUpRight />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-2xl text-white lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-primary px-4 pb-6 lg:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-4">
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-sm text-white hover:text-btn-primary"
            >
              Login
            </Link>
            <Link
              to="/join"
              onClick={closeMenu}
              className="flex w-fit items-center gap-1 rounded-sm bg-btn-primary px-4 py-2 text-sm font-medium uppercase text-primary hover:bg-btn-primary/90"
            >
              Join CFit <FiArrowUpRight />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
