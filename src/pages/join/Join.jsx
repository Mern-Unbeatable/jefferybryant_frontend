import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiUser } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import Logo from "@/components/common/Logo";
import { usePageAnimations } from "@/hooks/usePageAnimations";

const roles = [
  { key: "player", to: "/join/player", icon: FiUser },
  { key: "coach", to: "/join/coach", icon: LuBuilding2 },
];

const Join = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  usePageAnimations(pageRef, "/join");

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/");
  };

  const backButton = (className) => (
    <button
      type="button"
      onClick={goBack}
      aria-label={t("join.back")}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-primary shadow-lg transition hover:bg-btn-primary ${className}`}
    >
      <FiChevronLeft />
    </button>
  );

  return (
    <div ref={pageRef}>
      <section className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="/join/joinHero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {backButton("absolute left-10 top-10")}
        </div>

        <div className="relative flex items-center px-4 py-24 sm:px-10">
          {backButton("absolute left-4 top-6 sm:left-10 lg:hidden")}

          <div className="mx-auto flex w-full max-w-md flex-col items-center">
            <Link to="/" aria-label="CFit Talent">
              <Logo size="lg" />
            </Link>

            <h1 className="sr-only">{t("join.title")}</h1>

            <ul className="mt-10 flex w-full flex-col gap-4">
              {roles.map(({ key, to, icon }) => {
                const Icon = icon;
                return (
                  <li key={key}>
                    <Link
                      to={to}
                      className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/3 px-5 py-6 transition hover:border-accent/50 hover:bg-white/6"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-lg text-white">
                        <Icon />
                      </span>
                      <span>
                        <span className="block font-ethnocentric text-sm uppercase">
                          {t(`join.roles.${key}.title`)}
                        </span>
                        <span className="mt-1.5 block text-xs leading-relaxed text-white/60">
                          {t(`join.roles.${key}.description`)}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Join;
