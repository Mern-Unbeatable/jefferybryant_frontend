import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";

const defaultCta = {
  ns: "cta",
  primary: { to: "/join/player", label: "createProfile" },
  secondary: { to: "/join/coach", label: "joinCoach" },
};

const pageCtas = {
  "/coaches-academies": {
    ns: "coaches.cta",
    highlightBlock: true,
    primary: { to: "/join/coach", label: "register" },
    secondary: { to: "/about", label: "learnMore" },
  },
  "/about": {
    ns: "about.cta",
    primary: { to: "/join", label: "join" },
    secondary: { to: "/players", label: "explore" },
  },
  "/partners": {
    ns: "partners.cta",
    highlightBlock: true,
    primary: { to: "/join/partner", label: "becomePartner" },
    secondary: { to: "mailto:hello@cfittalent.com", label: "contact" },
  },
};

const primaryClass =
  "flex items-center justify-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90";
const secondaryClass =
  "flex items-center justify-center gap-2 rounded-sm border border-white/20 bg-primary/80 px-6 py-3 text-sm uppercase text-white transition hover:border-white";

const CtaButton = ({ to, className, children }) =>
  to.startsWith("mailto:") ? (
    <a href={to} className={className}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className}>
      {children}
    </Link>
  );

const CtaSection = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { ns, primary, secondary, highlightBlock } = pageCtas[pathname] ?? defaultCta;

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden border border-btn-primary/20 px-6 py-14 sm:px-10 lg:px-12 lg:py-16">
          <img
            src="/common/emptyStadium.png"
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/90 via-primary/50 to-transparent" />

          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
              <span className="h-px w-8 bg-accent" />
              {t(`${ns}.eyebrow`)}
            </p>

            <h2 className="mt-6 max-w-lg font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
              {t(`${ns}.title`)}{" "}
              <span className={`text-accent ${highlightBlock ? "block" : ""}`}>
                {t(`${ns}.titleHighlight`)}
              </span>
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-white/80">
              {t(`${ns}.description`)}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CtaButton to={primary.to} className={primaryClass}>
                {t(`${ns}.${primary.label}`)} <FiArrowUpRight />
              </CtaButton>
              <CtaButton to={secondary.to} className={secondaryClass}>
                {t(`${ns}.${secondary.label}`)} <FiArrowUpRight />
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
