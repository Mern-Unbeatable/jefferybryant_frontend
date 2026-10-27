import { useTranslation } from "react-i18next";
import { labelClass } from "@/components/dashboard/form/formStyles";

const Field = ({ id, label, required = false, hint, className = "", children }) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {required && (
          <span className="text-[9px] uppercase tracking-[0.15em] text-btn-primary">
            {t("dashboardForm.required")}
          </span>
        )}
      </div>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-[10px] text-white/40">{hint}</p>}
    </div>
  );
};

export default Field;
