import { useTranslation } from "react-i18next";
import {
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/dashboard/form/formStyles";

const FormCard = ({ title, subtitle, form, children }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit} className="rounded-lg border border-white/10 bg-white/3">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
        <div>
          <h2 className="font-ethnocentric text-sm uppercase">{title}</h2>
          {subtitle && <p className="mt-1.5 text-[11px] text-white/50">{subtitle}</p>}
        </div>
        <span className="flex items-center gap-1.5 text-[10px] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-btn-primary" />
          {t("dashboardForm.requiredField")}
        </span>
      </div>

      <div className="flex flex-col gap-6 p-5 sm:p-6">{children}</div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5 sm:px-6">
        <p role="status" className={`text-[10px] ${form.saved ? "text-accent" : "text-white/40"}`}>
          {t(form.saved ? "dashboardForm.saved" : "dashboardForm.notSaved")}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={form.reset} className={secondaryButtonClass}>
            {t("dashboardForm.cancel")}
          </button>
          <button type="submit" className={primaryButtonClass}>
            {t("dashboardForm.save")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCard;
