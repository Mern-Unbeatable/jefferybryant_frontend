import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiEdit2 } from "react-icons/fi";
import CardHeading from "@/pages/dashboard/player/components/CardHeading";
import ProfileSnapshot from "@/pages/dashboard/player/components/ProfileSnapshot";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";

const base = "playerDashboard";
const playerPath = (path) => `/dashboard/player/${path}`;

/**
 * ProfileOverviewSnapshot - Section rendering the player overview heading, action links, and quick details snapshot
 */
const ProfileOverviewSnapshot = () => {
  const { t } = useTranslation();

  return (
    <section className={cardClass}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <CardHeading
          eyebrow={t(`${base}.overview.eyebrow`)}
          title={t(`${base}.overview.title`)}
        />
        <div className="flex gap-2">
          <Link
            to={playerPath("my-profile")}
            className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs transition hover:border-white/30"
          >
            {t(`${base}.overview.viewFull`)}
          </Link>
          <Link
            to={playerPath("personal-physical")}
            className="flex items-center gap-2 rounded-sm bg-btn-primary px-4 py-2 text-xs text-primary transition hover:bg-btn-primary/90"
          >
            <FiEdit2 /> {t(`${base}.overview.edit`)}
          </Link>
        </div>
      </div>
      <ProfileSnapshot />
    </section>
  );
};

export default ProfileOverviewSnapshot;

