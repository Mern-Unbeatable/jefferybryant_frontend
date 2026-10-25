import { useTranslation } from "react-i18next";
import FaqSection from "@/components/common/FaqSection";

const faqs = [
  "whoCanRegister",
  "approval",
  "invite",
  "track",
  "recommendation",
  "multiple",
  "intelligence",
];

const CoachesFaqSection = () => {
  const { t } = useTranslation();

  return (
    <FaqSection
      ns="coaches.faq"
      itemKeys={faqs}
      defaultOpen={null}
      titleClassName="text-2xl sm:text-4xl"
      title={
        <>
          <span className="block">{t("coaches.faq.titleLine1")}</span>
          <span className="block">{t("coaches.faq.titleLine2")}</span>
          <span className="block">
            {t("coaches.faq.titleLine3")}{" "}
            <span className="text-accent">{t("coaches.faq.titleHighlight")}</span>
          </span>
        </>
      }
    />
  );
};

export default CoachesFaqSection;
