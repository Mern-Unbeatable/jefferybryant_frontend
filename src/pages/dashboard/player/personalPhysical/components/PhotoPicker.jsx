import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCamera } from "react-icons/fi";
import { secondaryButtonClass } from "@/components/dashboard/form/formStyles";
import { sampleProfile } from "@/pages/dashboard/player/playerData";

const base = "playerForms.personal";

/**
 * PhotoPicker - Component for choosing and previewing player profile photo
 */
const PhotoPicker = () => {
  const { t } = useTranslation();
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => () => photoUrl && URL.revokeObjectURL(photoUrl), [photoUrl]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (file) setPhotoUrl(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-4 rounded-md border border-white/10 bg-black/20 p-5 sm:flex-row sm:items-center">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt=""
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-btn-primary font-ethnocentric text-lg text-primary">
          {sampleProfile.initials}
        </span>
      )}
      <div>
        <p className="text-sm text-white">{t(`${base}.addPhoto`)}</p>
        <p className="mt-1 text-xs text-white/45">{t(`${base}.photoHint`)}</p>
        <label
          className={`${secondaryButtonClass} mt-3 inline-flex cursor-pointer items-center gap-2`}
        >
          <FiCamera />
          {t(`${base}.${photoUrl ? "changePhoto" : "choosePhoto"}`)}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFile}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
};

export default PhotoPicker;

