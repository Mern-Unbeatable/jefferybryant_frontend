import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiEdit2 } from "react-icons/fi";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import ProfilePageHeader from "@/pages/dashboard/player/components/ProfilePageHeader";
import ProfileSnapshot from "@/pages/dashboard/player/components/ProfileSnapshot";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import {
  CURRENT_STATUS,
  completedSections,
  profileSections,
  sampleProfile,
} from "@/pages/dashboard/player/playerData";

const base = "playerDashboard";

const MyPlayerProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <ProfilePageHeader
        eyebrow={t(`${base}.profile.eyebrow`)}
        title={t(`${base}.profile.title`)}
        subtitle={t(`${base}.profile.subtitle`)}
      />

      <section className={`${cardClass} flex flex-col gap-5 bg-linear-to-r from-white/5 to-white/2 sm:flex-row sm:items-center`}>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-btn-primary font-ethnocentric text-lg text-primary">
          {sampleProfile.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{t(`${base}.profile.scoutingProfile`)}</p>
          <h2 className="mt-1 font-ethnocentric text-lg uppercase sm:text-xl">{sampleProfile.name}</h2>
          <p className="mt-1 text-xs text-white/70">
            {sampleProfile.position} · {sampleProfile.club}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[11px] text-white/50">
            <span>{sampleProfile.location}</span>
            <span className="text-white/20">|</span>
            <span>{t(`${base}.profile.complete`, { done: completedSections, total: profileSections.length })}</span>
            <span className="text-white/20">|</span>
            <span className="text-btn-primary">{t(`${base}.statuses.${CURRENT_STATUS}`)}</span>
          </p>
        </div>
        <Link
          to="/dashboard/player/personal-physical"
          className="flex shrink-0 items-center justify-center gap-2 self-start rounded-sm bg-btn-primary px-4 py-2.5 text-xs text-primary transition hover:bg-btn-primary/90 sm:self-center"
        >
          <FiEdit2 /> {t(`${base}.overview.edit`)}
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {profileSections.map(({ key, path, icon, complete }) => {
          const Icon = icon;
          return (
            <Link
              key={key}
              to={`/dashboard/player/${path}`}
              className={`${cardClass} flex gap-4 transition hover:border-white/25`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/15 text-lg text-accent">
                <Icon />
              </span>
              <span className="min-w-0">
                <span className="block font-ethnocentric text-[11px] uppercase">
                  {t(`${base}.sections.${key}.short`)}
                </span>
                <span className="mt-1.5 block text-[10px] leading-relaxed text-white/50">
                  {t(`${base}.sections.${key}.text`)}
                </span>
                <span className={`mt-2 block text-[10px] ${complete ? "text-btn-primary" : "text-btn-primary/70"}`}>
                  {t(`${base}.profile.${complete ? "sectionComplete" : "needsAttention"}`)}
                </span>
              </span>
            </Link>
          );
        })}
      </section>

      <section className={cardClass}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <CardHeading eyebrow={t(`${base}.profile.previewEyebrow`)} title={t(`${base}.overview.title`)} />
          <p className="text-[10px] text-white/40">{t(`${base}.profile.previewNote`)}</p>
        </div>
        <ProfileSnapshot />
      </section>
    </div>
  );
};

export default MyPlayerProfile;
