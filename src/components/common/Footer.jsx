import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Players", to: "/players" },
      { label: "Coaches & Academies", to: "/coaches-academies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About CFit", to: "/about" },
      { label: "Partners", to: "/partners" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
    ],
  },
];

const headingClass = "mb-5 text-xs uppercase tracking-[0.2em] text-white/70";
const linkClass = "text-sm text-white transition-colors hover:text-btn-primary";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-primary font-tactic">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block">
              <img src="/logo.jpg" alt="CFit Talent" className="h-9 w-auto" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/80">
              A smarter football intelligence platform connecting Caribbean
              talent with the people shaping the future of the game.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className={headingClass}>{column.title}</h3>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className={headingClass}>Connect</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="mailto:hello@cfittalent.com" className={linkClass}>
                  hello@cfittalent.com
                </a>
              </li>
              <li className="text-sm text-white">Caribbean Region</li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-sm border border-white/20 px-4 py-2 text-xs text-white transition-colors hover:border-white"
              >
                Login
              </Link>
              <Link
                to="/join"
                className="flex items-center gap-2 rounded-sm border border-btn-primary px-4 py-2 text-xs text-btn-primary transition-colors hover:bg-btn-primary hover:text-primary"
              >
                Join CFit <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[10px] uppercase tracking-[0.15em] text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} CFit Talent. All rights reserved.</p>
          <p>Caribbean Football Intelligence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
