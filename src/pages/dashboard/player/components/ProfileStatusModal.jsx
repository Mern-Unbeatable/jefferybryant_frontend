import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiAlertTriangle, FiCheckCircle, FiClock, FiShield, FiStar, FiX } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import { CURRENT_STATUS, PROFILE_STATUSES } from "@/pages/dashboard/player/playerData";

const statusIcons = {
  registered: FiClock,
  incomplete: FiAlertTriangle,
  complete: FiCheckCircle,
  verified: LuShieldCheck,
  reviewReady: FiStar,
};

const ProfileStatusModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[75svh] w-full max-w-lg overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-xl border border-white/10 bg-[#161b1f] p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-btn-primary/60 text-btn-primary">
            <FiShield />
          </span>
          <div className="flex-1">
            <h2 id="status-modal-title" className="font-ethnocentric text-sm uppercase leading-snug">
              {t("playerDashboard.modal.title")}
            </h2>
            <p className="mt-1 text-[11px] text-accent">{t("playerDashboard.modal.subtitle")}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("playerDashboard.modal.close")}
            className="text-lg text-white/60 transition-colors hover:text-white"
          >
            <FiX />
          </button>
        </div>

        <p className="mt-5 rounded-md border border-btn-primary/50 bg-btn-primary/5 p-4 text-[11px] leading-relaxed text-btn-primary">
          {t("playerDashboard.modal.notice")}
        </p>

        <ol className="mt-4 flex flex-col gap-3">
          {PROFILE_STATUSES.map((status, index) => {
            const Icon = statusIcons[status];
            const isCurrent = status === CURRENT_STATUS;
            const tone = status === "incomplete" || status === "reviewReady" ? "btn-primary" : "accent";
            return (
              <li
                key={status}
                className={`rounded-md border p-4 ${
                  isCurrent ? "border-btn-primary bg-btn-primary/5" : "border-white/10 bg-white/2"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wide ${
                      tone === "accent" ? "border-accent/50 text-accent" : "border-btn-primary/50 text-btn-primary"
                    }`}
                  >
                    <Icon /> {t(`playerDashboard.statuses.${status}`)}
                  </span>
                  {isCurrent && (
                    <span className="rounded-full bg-btn-primary px-2.5 py-0.5 text-[9px] uppercase tracking-wide text-primary">
                      {t("playerDashboard.modal.current")}
                    </span>
                  )}
                  <span className="ml-auto text-[10px] text-white/40">
                    {t("playerDashboard.modal.step", { number: index + 1, total: PROFILE_STATUSES.length })}
                  </span>
                </div>
                <p className="mt-2.5 text-[11px] leading-relaxed text-white/60">
                  {t(`playerDashboard.modal.descriptions.${status}`)}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ProfileStatusModal;
