import { useTranslation } from "react-i18next";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import ProfilePageHeader from "@/pages/dashboard/player/components/ProfilePageHeader";
import ProfileSnapshot from "@/pages/dashboard/player/components/ProfileSnapshot";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import ScoutingProfileCard from "./components/ScoutingProfileCard";
import ProfileSectionsGrid from "./components/ProfileSectionsGrid";

const base = "playerDashboard";

const MyPlayerProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex flex-col gap-5">
      {/* Page Header */}
      <ProfilePageHeader
        eyebrow={t(`${base}.profile.eyebrow`)}
        title={t(`${base}.profile.title`)}
        subtitle={t(`${base}.profile.subtitle`)}
      />

      {/* Scouting Profile Card */}
      <ScoutingProfileCard />

      {/* Profile Sections Grid */}
      <ProfileSectionsGrid />

      {/* Profile Preview Snapshot */}
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
