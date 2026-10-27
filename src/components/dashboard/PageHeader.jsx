const PageHeader = ({ eyebrow, title, subtitle, action }) => (
  <section className="flex flex-wrap items-end justify-between gap-4">
    <div>
      {eyebrow && (
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-btn-primary/80">
          <span className="h-px w-5 bg-current" />
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 font-ethnocentric text-xl uppercase sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-xs text-white/60">{subtitle}</p>}
    </div>
    {action}
  </section>
);

export default PageHeader;
