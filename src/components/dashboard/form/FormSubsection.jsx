const FormSubsection = ({ title, subtitle, action, children }) => (
  <div className="flex flex-col gap-5 border-t border-white/10 pt-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-white">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-white/50">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

export default FormSubsection;
