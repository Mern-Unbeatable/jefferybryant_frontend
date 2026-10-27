import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";
import {
  FiArrowRight,
  FiCheck,
  FiCopy,
  FiDownload,
  FiLink,
  FiMail,
  FiMessageSquare,
  FiNavigation,
  FiPhone,
} from "react-icons/fi";
import PageHeader from "@/components/dashboard/PageHeader";
import { primaryButtonClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { ORGANIZATION } from "@/pages/dashboard/coach/coachData";

const base = "coachDashboard.invite";

const InvitePlayers = () => {
  const { t } = useTranslation();
  const qrRef = useRef(null);
  const [copied, copy] = useCopyToClipboard();

  const message = t(`${base}.shareMessage`, { organization: ORGANIZATION.name, link: ORGANIZATION.inviteLink });
  const encoded = encodeURIComponent(message);

  const shareSocial = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: ORGANIZATION.name, text: message, url: ORGANIZATION.inviteLink });
      } catch {
        // The user dismissed the share sheet.
      }
    } else {
      copy(ORGANIZATION.inviteLink);
    }
  };

  const downloadQr = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "kingston-athletic-qr.png";
    link.click();
  };

  const channels = [
    { key: "whatsapp", icon: FiPhone, href: `https://wa.me/?text=${encoded}` },
    { key: "email", icon: FiMail, href: `mailto:?subject=${encodeURIComponent(t(`${base}.emailSubject`))}&body=${encoded}` },
    { key: "sms", icon: FiMessageSquare, href: `sms:?&body=${encoded}` },
    { key: "social", icon: FiNavigation, onClick: shareSocial },
  ];

  const channelClass =
    "flex flex-col items-center gap-2 rounded-md border border-white/10 bg-black/20 p-4 text-center transition hover:border-white/25";

  return (
    <div className="mx-auto flex flex-col gap-5">
      <PageHeader eyebrow={t(`${base}.eyebrow`)} title={t(`${base}.title`)} subtitle={t(`${base}.subtitle`)} />

      <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
        <section className={`${cardClass} flex flex-col gap-5`}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{t(`${base}.cardEyebrow`)}</p>
            <h2 className="mt-2 font-ethnocentric text-base uppercase sm:text-lg">{t(`${base}.cardTitle`)}</h2>
            <p className="mt-2 max-w-md text-xs text-white/55">
              {t(`${base}.cardText`, { organization: ORGANIZATION.name })}
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-md border border-white/10 bg-black/30 p-2 pl-4 sm:flex-row sm:items-center">
            <FiLink className="hidden shrink-0 text-accent sm:block" />
            <code className="min-w-0 flex-1 truncate text-xs text-white/80">{ORGANIZATION.inviteLink}</code>
            <button type="button" onClick={() => copy(ORGANIZATION.inviteLink)} className={`${primaryButtonClass} flex items-center justify-center gap-2`}>
              {copied ? <FiCheck /> : <FiCopy />}
              {t(`${base}.${copied ? "copied" : "copy"}`)}
            </button>
          </div>

          <div className="flex gap-3 border-l-2 border-accent bg-accent/5 p-4">
            <FiCheck className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-[11px] text-white">{t(`${base}.associationTitle`)}</p>
              <p className="mt-1 text-[10px] text-white/50">{t(`${base}.associationText`)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {channels.map(({ key, icon, href, onClick }) => {
              const Icon = icon;
              const content = (
                <>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon />
                  </span>
                  <span className="text-[11px]">{t(`${base}.channels.${key}`)}</span>
                  <span className="text-[9px] text-white/40">{t(`${base}.channels.${key}Text`)}</span>
                </>
              );
              return href ? (
                <a key={key} href={href} target="_blank" rel="noreferrer" className={channelClass}>
                  {content}
                </a>
              ) : (
                <button key={key} type="button" onClick={onClick} className={channelClass}>
                  {content}
                </button>
              );
            })}
          </div>
        </section>

        <section className={`${cardClass} flex flex-col items-center gap-4 text-center`}>
          <span className="self-start rounded-sm bg-btn-primary px-2 py-1 font-ethnocentric text-[9px] text-primary">CFIT</span>
          <div className="rounded-md bg-white p-3">
            <QRCodeCanvas ref={qrRef} value={ORGANIZATION.inviteLink} size={168} marginSize={1} />
          </div>
          <div>
            <p className="text-xs">{ORGANIZATION.name}</p>
            <p className="mt-1 text-[10px] text-white/45">{t(`${base}.qrText`)}</p>
          </div>
          <button type="button" onClick={downloadQr} className={`${secondaryButtonClass} flex items-center gap-2`}>
            <FiDownload /> {t(`${base}.downloadQr`)}
          </button>
          <Link to="/dashboard/coach/my-organization" className="flex items-center gap-1.5 text-[11px] text-accent hover:underline">
            {t(`${base}.manage`)} <FiArrowRight />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default InvitePlayers;
