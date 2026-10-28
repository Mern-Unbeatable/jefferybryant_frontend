import { useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiAlertCircle, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import BackButton from "@/components/common/BackButton";
import { DUMMY_USERS } from "@/constants/dummyUsers";
import { useAuth } from "@/hooks/useAuth";
import { usePageAnimations } from "@/hooks/usePageAnimations";

const labelClass = "text-sm text-white/80";
const inputClass =
  "mt-2 w-full border border-white/10 bg-black/30 px-3 py-2.5 text-xs text-white placeholder:text-white/30 outline-none transition focus:border-accent/60";

const Login = () => {
  const { t } = useTranslation();
  const pageRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { user, login } = useAuth();
  const location = useLocation();

  usePageAnimations(pageRef, "/login");

  const fillDemo = ({ email, password }) => {
    emailRef.current.value = email;
    passwordRef.current.value = password;
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loggedIn = login(data.get("email"), data.get("password"), data.get("remember") === "on");
    setError(!loggedIn);
  };

  if (user) return <Navigate to={location.state?.from ?? `/dashboard/${user.role}`} replace />;

  return (
    <div ref={pageRef}>
      <section className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="/login/loginCity.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <BackButton className="absolute left-10 top-10" />
        </div>

        <div className="relative flex items-center px-4 py-24 sm:px-10 lg:px-16">
          <BackButton className="absolute left-4 top-6 sm:left-10 lg:hidden" />

          <div className="mx-auto w-full max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-btn-primary">
              {t("login.eyebrow")}
            </p>
            <h1 className="mt-3 font-ethnocentric text-xl uppercase leading-tight sm:text-2xl">
              {t("login.title")}
            </h1>
            <p className="mt-3 text-base text-white/50">{t("login.subtitle")}</p>

            <form onSubmit={handleSubmit} className="mt-8">
              <label htmlFor="email" className={labelClass}>
                {t("login.email")}
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@organization.com"
                className={inputClass}
              />

              <label htmlFor="password" className={`mt-5 block ${labelClass}`}>
                {t("login.password")}
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder={t("login.passwordPlaceholder")}
                  className={`${inputClass} pr-20`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 mt-1 flex -translate-y-1/2 items-center gap-1.5 text-[10px] text-white/60 transition-colors hover:text-white"
                >
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                  {showPassword ? t("login.hide") : t("login.show")}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-white/60">
                  <input type="checkbox" name="remember" className="h-3.5 w-3.5 accent-btn-primary" />
                  {t("login.remember")}
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-btn-primary transition-colors hover:text-btn-primary/80"
                >
                  {t("login.forgot")}
                </Link>
              </div>

              {error && (
                <p role="alert" className="mt-4 flex items-center gap-2 text-xs text-red-400">
                  <FiAlertCircle className="shrink-0 text-sm" /> {t("login.invalid")}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 bg-btn-primary py-3 text-sm text-primary transition hover:bg-btn-primary/90"
              >
                {t("login.submit")} <FiArrowRight className="text-sm" />
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-xs text-white/40">
              <span className="h-px flex-1 bg-white/10" />
              {t("login.newTo")}
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <Link
              to="/join/coach"
              className="mt-6 flex w-full items-center justify-center border border-btn-primary py-3 text-sm text-btn-primary transition hover:bg-btn-primary hover:text-primary"
            >
              {t("login.register")}
            </Link>

            <div className="mt-8 border border-dashed border-white/15 p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">
                {t("login.demoTitle")}
              </p>
              <p className="mt-1 text-[10px] text-white/40">{t("login.demoHint")}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {DUMMY_USERS.map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    onClick={() => fillDemo(demo)}
                    className="border border-white/10 px-3 py-2 text-[11px] text-white/80 transition hover:border-accent hover:text-accent"
                  >
                    {t(`login.roles.${demo.role}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
