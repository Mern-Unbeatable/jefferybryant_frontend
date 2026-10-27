import { useTranslation } from "react-i18next";

const pageButton =
  "flex h-8 min-w-8 items-center justify-center rounded-sm border border-white/10 px-2.5 text-[11px] transition disabled:cursor-not-allowed disabled:opacity-40";

const Pagination = ({ page, totalPages, totalItems, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <p className="text-[10px] text-white/45">
        {t("dashboardTable.pageSummary", { page, total: Math.max(totalPages, 1), count: totalItems })}
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className={`${pageButton} bg-white/5 text-white/60 hover:bg-white/10`}
        >
          {t("dashboardTable.previous")}
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            type="button"
            aria-current={number === page ? "page" : undefined}
            onClick={() => onChange(number)}
            className={`${pageButton} ${
              number === page ? "border-accent bg-accent text-primary" : "text-white/60 hover:bg-white/10"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          className={`${pageButton} bg-white/5 text-white hover:bg-white/10`}
        >
          {t("dashboardTable.next")}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
