import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronRight, FiCopy, FiNavigation, FiStar } from "react-icons/fi";
import { LuQrCode } from "react-icons/lu";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { ORGANIZATION } from "@/pages/dashboard/coach/coachData";

const base = "coachDashboard.overview";
const coachPath = (path) => `/dashboard/coach/${path}`;
const quickActionClass = `${cardClass} group flex items-center gap-4 text-left transition hover:border-white/25`;

const QuickActionContent = ({ icon, title, text }) => {
  const Icon = icon;
  return (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-white">{title}</span>
        <span className="mt-1 block text-[10px] text-white/45">{text}</span>
      </span>
      <FiChevronRight className="shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white" />
    </>
  );
};

const CoachQuickActions = () => {
  const { t } = useTranslation();
  const [copied, copy] = useCopyToClipboard();

  return (
    <section>
      <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{t(`${base}.shortcuts`)}</p>
      <h2 className="mt-1.5 font-ethnocentric text-base uppercase">{t(`${base}.quickActions`)}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link to={coachPath("invite-players")} className={quickActionClass}>
          <QuickActionContent
            icon={FiNavigation}
            title={t(`${base}.actions.invite`)}
            text={t(`${base}.actions.inviteText`)}
          />
        </Link>
        <button
          type="button"
          onClick={() => copy(ORGANIZATION.inviteLink)}
          className={quickActionClass}
        >
          <QuickActionContent
            icon={FiCopy}
            title={t(`${base}.actions.${copied ? "copied" : "copyLink"}`)}
            text={t(`${base}.actions.copyLinkText`)}
          />
        </button>
        <Link to={coachPath("invite-players")} className={quickActionClass}>
          <QuickActionContent
            icon={LuQrCode}
            title={t(`${base}.actions.qr`)}
            text={t(`${base}.actions.qrText`)}
          />
        </Link>
        <Link to={coachPath("recommend-player")} className={quickActionClass}>
          <QuickActionContent
            icon={FiStar}
            title={t(`${base}.actions.recommend`)}
            text={t(`${base}.actions.recommendText`)}
          />
        </Link>
      </div>
    </section>
  );
};

export default CoachQuickActions;

