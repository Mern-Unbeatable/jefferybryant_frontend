import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cardClass } from "@/pages/dashboard/player/components/cardStyles";
import { profileSections } from "@/pages/dashboard/player/playerData";

const base = "playerDashboard";

/**
 * ProfileSectionsGrid - Grid of navigation cards for each profile section (personal, football, video, contacts)
 */
const ProfileSectionsGrid = () => {
  const { t } = useTranslation();

  return (
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
              <span className="block font-ethnocentric text-sm uppercase">
                {t(`${base}.sections.${key}.short`)}
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-white/50">
                {t(`${base}.sections.${key}.text`)}
              </span>
              <span
                className={`mt-2 block text-xs ${
                  complete ? "text-btn-primary" : "text-btn-primary/70"
                }`}
              >
                {t(
                  `${base}.profile.${complete ? "sectionComplete" : "needsAttention"}`,
                )}
              </span>
            </span>
          </Link>
        );
      })}
    </section>
  );
};

export default ProfileSectionsGrid;

