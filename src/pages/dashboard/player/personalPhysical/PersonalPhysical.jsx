import { useTranslation } from "react-i18next";
import ProfilePageHeader from "@/pages/dashboard/player/components/ProfilePageHeader";
import PersonalPhysicalCard from "./components/PersonalPhysicalCard";

const base = "playerForms.personal";

const PersonalPhysical = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex flex-col gap-5">
      {/* Page Header */}
      <ProfilePageHeader
        eyebrow={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        subtitle={t(`${base}.subtitle`)}
      />

      {/* Personal & Physical Form Section */}
      <PersonalPhysicalCard />
    </div>
  );
};

export default PersonalPhysical;
