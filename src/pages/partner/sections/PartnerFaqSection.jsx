import { useTranslation } from "react-i18next";
import FaqSection from "@/components/common/FaqSection";

const faqs = [
  "whichOrganizations",
  "expressInterest",
  "guarantee",
  "academies",
  "connect",
  "playerInformation",
  "contact",
];

const PartnerFaqSection = () => {
  const { t } = useTranslation();

  return (
    <FaqSection
      ns="partners.faq"
      itemKeys={faqs}
      defaultOpen={null}
      titleClassName="text-2xl sm:text-4xl"
      title={
        <>
          <span className="block">{t("partners.faq.titleLine1")}</span>
          <span className="block">{t("partners.faq.titleLine2")}</span>
          <span className="block text-accent">{t("partners.faq.titleHighlight")}</span>
        </>
      }
    />
  );
};

export default PartnerFaqSection;
