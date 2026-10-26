import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { PiSoccerBallFill } from "react-icons/pi";

const exploreLinks = [
  { key: "nav.players", to: "/players" },
  { key: "nav.coachesAcademies", to: "/coaches-academies" },
  { key: "nav.about", to: "/about" },
  { key: "nav.partners", to: "/partners" },
];

const PitchLines = () => (
  <svg
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 -z-10 h-full w-full text-white/6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="40" y="40" width="1120" height="720" vectorEffect="non-scaling-stroke" />
    <line x1="600" y1="40" x2="600" y2="760" vectorEffect="non-scaling-stroke" />
    <circle cx="600" cy="400" r="110" vectorEffect="non-scaling-stroke" />
    <circle cx="600" cy="400" r="4" fill="currentColor" />
    <rect x="40" y="220" width="170" height="360" vectorEffect="non-scaling-stroke" />
    <rect x="40" y="320" width="60" height="160" vectorEffect="non-scaling-stroke" />
    <rect x="990" y="220" width="170" height="360" vectorEffect="non-scaling-stroke" />
    <rect x="1100" y="320" width="60" height="160" vectorEffect="non-scaling-stroke" />
  </svg>
);

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const codeRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline()
          .from(".digit", { yPercent: -120, autoAlpha: 0, duration: 0.9, ease: "bounce.out", stagger: 0.15 })
          .from(".ball", { scale: 0, rotation: -360, duration: 0.9, ease: "back.out(1.7)" }, "-=0.5");

        gsap.to(".ball", { rotation: 360, duration: 8, ease: "none", repeat: -1, delay: 1.5 });
        gsap.to(".ball-shadow", { scaleX: 0.7, opacity: 0.4, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
    },
    { scope: codeRef }
  );

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-20">
      <PitchLines />
      <div className="absolute left-1/2 top-1/2 -z-10 h-112 w-112 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto flex flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
          <span className="h-px w-8 bg-accent" />
          {t("notFound.eyebrow")}
          <span className="h-px w-8 bg-accent" />
        </p>

        <div
          ref={codeRef}
          aria-hidden="true"
          className="mt-8 flex items-center gap-2 font-ethnocentric text-[96px] leading-none sm:gap-4 sm:text-[180px]"
        >
          <span className="digit">4</span>
          <span className="relative flex items-center justify-center">
            <PiSoccerBallFill className="ball text-[84px] text-btn-primary sm:text-[156px]" />
            <span className="ball-shadow absolute -bottom-4 h-2 w-16 rounded-full bg-black/60 blur-sm sm:-bottom-6 sm:w-28" />
          </span>
          <span className="digit text-accent">4</span>
        </div>

        <h1 className="mt-12 font-ethnocentric text-2xl uppercase leading-tight sm:text-4xl">
          {t("notFound.title")}
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
          {t("notFound.description")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t("notFound.home")} <FiArrowUpRight />
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-6 py-3 text-sm uppercase transition hover:border-accent hover:text-accent"
          >
            <FiArrowLeft /> {t("notFound.back")}
          </button>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
            {t("notFound.explore")}
          </span>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-white/80 transition-colors hover:text-btn-primary">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
