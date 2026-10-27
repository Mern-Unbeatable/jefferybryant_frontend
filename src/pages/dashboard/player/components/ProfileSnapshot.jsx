import { useTranslation } from "react-i18next";
import { profileFields, sampleProfile } from "@/pages/dashboard/player/playerData";

const ProfileSnapshot = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-6 flex flex-col overflow-hidden rounded-md border border-white/10 sm:flex-row">
      <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-b border-white/10 bg-black/20 p-6 sm:w-44 sm:border-b-0 sm:border-r">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-btn-primary bg-white/10 font-ethnocentric text-lg">
          {sampleProfile.initials}
        </span>
        <span className="text-[10px] text-white/50">{t("playerDashboard.overview.sampleImage")}</span>
      </div>

      <dl className="grid flex-1 sm:grid-cols-2 lg:grid-cols-3">
        {profileFields.map(({ key, value }) => (
          <div key={key} className="border-b border-white/10 p-4 sm:border-r">
            <dt className="text-[10px] uppercase tracking-[0.15em] text-white/40">
              {t(`playerDashboard.fields.${key}`)}
            </dt>
            <dd className="mt-1.5 font-ethnocentric text-[11px] uppercase">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProfileSnapshot;
