import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiBell, FiCheck } from "react-icons/fi";
import PageHeader from "@/components/dashboard/PageHeader";
import { secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import { formatDate } from "@/utils/formatDate";

const NotificationsPage = ({ initialItems, icons, base }) => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState(initialItems);
  const hasUnread = items.some((item) => item.unread);

  const markRead = (id) => setItems((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  const markAllRead = () => setItems((prev) => prev.map((item) => ({ ...item, unread: false })));

  const timeLabel = ({ time, amount, date }) => (date ? formatDate(date, i18n.language) : t(`dashboardTime.${time}`, { count: amount }));

  return (
    <div className="mx-auto flex flex-col gap-5">
      <PageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
        action={
          <button
            type="button"
            onClick={markAllRead}
            disabled={!hasUnread}
            className={`${secondaryButtonClass} flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <FiCheck /> {t(`${base}.markAll`)}
          </button>
        }
      />

      <section>
        <ul className="overflow-hidden rounded-lg border border-white/10 bg-white/3">
          {items.map((item) => {
            const Icon = icons[item.type] ?? FiBell;
            return (
              <li key={item.id} className="border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => markRead(item.id)}
                  className={`flex w-full items-start gap-4 p-5 text-left transition hover:bg-white/3 ${item.unread ? "bg-accent/3" : ""}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2 text-xs">
                      {t(`${base}.items.${item.type}.title`)}
                      {item.unread && (
                        <span className="rounded-sm bg-btn-primary px-1.5 py-0.5 text-[8px] uppercase text-primary">{t(`${base}.new`)}</span>
                      )}
                    </span>
                    <span className="mt-1 block text-[11px] text-white/50">{t(`${base}.items.${item.type}.text`, { name: item.name })}</span>
                    <span className="mt-2 block text-[10px] text-white/35">{timeLabel(item)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default NotificationsPage;
