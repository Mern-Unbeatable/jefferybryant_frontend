/**
 * AdminHeader - Common reusable header component for Admin Dashboard pages
 *
 * @param {string} eyebrow - Uppercase subheader or date string (e.g. "TALENT OPERATIONS")
 * @param {string} title - Main page heading styled with font-ethnocentric
 * @param {string} subtitle - Helper or description text
 * @param {React.ReactNode} action - Optional right-aligned action button/content
 * @param {React.ReactNode} children - Optional extra elements under the text block
 * @param {string} className - Extra classes for container
 */
const AdminHeader = ({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col justify-between gap-4 sm:flex-row sm:items-center ${className}`}
    >
      <div>
        {eyebrow && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            {eyebrow}
          </p>
        )}
        {title && (
          <h1 className="mt-1 font-ethnocentric text-xl tracking-wider text-white sm:text-2xl">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-1 text-xs text-white/50">{subtitle}</p>
        )}
        {children}
      </div>

      {action && (
        <div className="shrink-0 self-start sm:self-auto">{action}</div>
      )}
    </div>
  );
};

export default AdminHeader;

