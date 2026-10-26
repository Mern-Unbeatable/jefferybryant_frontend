import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight, FiCheck, FiClock, FiMail, FiMessageCircle } from "react-icons/fi";
import { LuHourglass } from "react-icons/lu";
import { usePageAnimations } from "@/hooks/usePageAnimations";
import CoachPortalHeader from "@/pages/join/CoachPortalHeader";
import { gridBackground } from "@/pages/join/gridBackground";

const base = "coachPending";
const statusSteps = ["submitted", "review", "approved", "invite"];
const currentIndex = 1;

const CoachPending = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const pageRef = useRef(null);
  const iconRef = useRef(null);

  usePageAnimations(pageRef, "/join/coach/pending");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hourglass", {
          rotation: "+=180",
          duration: 0.8,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 1.6,
        });
        gsap.to(".halo", { scale: 1.25, opacity: 0, duration: 2, ease: "power1.out", repeat: -1 });
      });
    },
    { scope: iconRef }
  );

  const organization = state?.organization;
  const email = state?.email;

  const infoCards = [
    { key: "time", icon: FiClock, value: t(`${base}.info.timeValue`) },
    { key: "notify", icon: FiMail, value: email || t(`${base}.info.notifyFallback`) },
    { key: "help", icon: FiMessageCircle, value: "hello@cfittalent.com", href: "mailto:hello@cfittalent.com" },
  ];

  return (
    <div ref={pageRef} className={`min-h-svh ${gridBackground}`}>
      <CoachPortalHeader />

      <section className="container mx-auto flex flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8">
        <div ref={iconRef} className="relative flex h-28 w-28 items-center justify-center">
          <span className="halo absolute inset-0 rounded-full border border-btn-primary/60" />
          <span className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full border border-dashed border-btn-primary/40" />
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-btn-primary/10 shadow-[0_0_60px_rgba(253,204,41,0.25)]">
            <LuHourglass className="hourglass text-4xl text-btn-primary" />
          </span>
        </div>

        <p className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">
          <span className="h-px w-8 bg-accent" />
          {t(`${base}.eyebrow`)}
          <span className="h-px w-8 bg-accent" />
        </p>
        <h1 className="mt-6 font-ethnocentric text-3xl uppercase leading-tight sm:text-5xl">
          <span className="block">{t(`${base}.titleLine1`)}</span>
          <span className="block text-btn-primary">{t(`${base}.titleHighlight`)}</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70">
          {organization
            ? t(`${base}.descriptionNamed`, { organization })
            : t(`${base}.description`)}
        </p>

        <div className="mt-12 w-full max-w-4xl border border-white/10 bg-primary/80 p-6 text-left sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm uppercase tracking-[0.15em] text-white/80">
              {t(`${base}.statusTitle`)}
            </h2>
            <span className="flex items-center gap-2 rounded-full border border-btn-primary/40 bg-btn-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-btn-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-btn-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-btn-primary" />
              </span>
              {t(`${base}.badge`)}
            </span>
          </div>

          <ol className="mt-8 grid gap-6 lg:grid-cols-4 lg:gap-0">
            {statusSteps.map((key, index) => {
              const isDone = index < currentIndex;
              const isCurrent = index === currentIndex;
              return (
                <li key={key} className="relative flex gap-4 lg:flex-col lg:gap-0">
                  {index < statusSteps.length - 1 && (
                    <span
                      className={`absolute left-4 top-9 h-[calc(100%-1.25rem)] w-px lg:left-9 lg:top-4 lg:h-px lg:w-[calc(100%-2.25rem)] ${
                        isDone ? "bg-btn-primary" : "bg-white/10"
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${
                      isDone
                        ? "border-btn-primary bg-btn-primary text-primary"
                        : isCurrent
                          ? "border-btn-primary bg-primary text-btn-primary"
                          : "border-white/15 bg-primary text-white/40"
                    }`}
                  >
                    {isDone ? <FiCheck /> : isCurrent ? <FiClock /> : index + 1}
                  </span>
                  <span className="lg:mt-4 lg:pr-6">
                    <span
                      className={`block text-xs uppercase tracking-wide ${
                        isCurrent ? "text-btn-primary" : isDone ? "text-white" : "text-white/40"
                      }`}
                    >
                      {t(`${base}.steps.${key}.title`)}
                    </span>
                    <span className="mt-1.5 block text-[11px] leading-relaxed text-white/50">
                      {t(`${base}.steps.${key}.text`)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <ul className="mt-6 grid w-full max-w-4xl gap-4 text-left sm:grid-cols-3">
          {infoCards.map(({ key, icon, value, href }) => {
            const Icon = icon;
            return (
              <li key={key} className="flex items-start gap-3 border border-white/10 bg-white/2 p-5">
                <Icon className="mt-0.5 shrink-0 text-lg text-accent" />
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-white/50">
                    {t(`${base}.info.${key}`)}
                  </span>
                  {href ? (
                    <a href={href} className="mt-1 block truncate text-xs text-white hover:text-btn-primary">
                      {value}
                    </a>
                  ) : (
                    <span className="mt-1 block truncate text-xs text-white">{value}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-sm bg-btn-primary px-6 py-3 text-sm uppercase text-primary transition hover:bg-btn-primary/90"
          >
            {t(`${base}.home`)} <FiArrowUpRight />
          </Link>
          <Link
            to="/coaches-academies"
            className="flex items-center gap-2 rounded-sm border border-white/20 px-6 py-3 text-sm uppercase transition hover:border-accent hover:text-accent"
          >
            {t(`${base}.explore`)} <FiArrowUpRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CoachPending;
