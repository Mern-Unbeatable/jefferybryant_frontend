import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import ProfilePageHeader from "@/pages/dashboard/player/components/ProfilePageHeader";
import ProfileSnapshot from "@/pages/dashboard/player/components/ProfileSnapshot";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import { profileSections } from "@/pages/dashboard/player/playerData";
import ScoutingProfileCard from "./components/ScoutingProfileCard";

const base = "playerDashboard";

const MyPlayerProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex flex-col gap-5">
      <ProfilePageHeader
        eyebrow={t(`${base}.profile.eyebrow`)}
        title={t(`${base}.profile.title`)}
        subtitle={t(`${base}.profile.subtitle`)}
      />

      <ScoutingProfileCard />

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
