import { useTranslation } from "react-i18next";
import FormCard from "@/components/dashboard/form/FormCard";
import { useDemoForm } from "@/hooks/useDemoForm";
import { personalInfo } from "@/pages/dashboard/player/playerData";
import PhotoPicker from "./PhotoPicker";
import PersonalPhysicalFields from "./PersonalPhysicalFields";

const base = "playerForms.personal";

/**
 * PersonalPhysicalCard - Form card containing the player photo picker and personal/physical fields
 */
const PersonalPhysicalCard = () => {
  const { t } = useTranslation();
  const form = useDemoForm(personalInfo);
  const { values, handleChange, setField } = form;

  return (
    <section>
      <FormCard
        title={t(`${base}.photoTitle`)}
        subtitle={t(`${base}.photoSubtitle`)}
        form={form}
      >
        <PhotoPicker />
        <PersonalPhysicalFields
          values={values}
          handleChange={handleChange}
          setField={setField}
        />
      </FormCard>
    </section>
  );
};

export default PersonalPhysicalCard;

