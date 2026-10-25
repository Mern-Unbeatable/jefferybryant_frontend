import { useTranslation } from "react-i18next";
import FaqSection from "@/components/common/FaqSection";

const faqs = [
  "whatIs",
  "whoCanCreate",
  "whatInfo",
  "addVideos",
  "verification",
  "recommend",
  "update",
];

const PlayerFaqSection = () => {
  const { t } = useTranslation();

  return (
    <FaqSection
      ns="player.faq"
      itemKeys={faqs}
      title={
        <>
          <span className="block">{t("player.faq.titleLine1")}</span>
          <span className="block">{t("player.faq.titleLine2")}</span>
          <span className="block">
            {t("player.faq.titleLine3")}{" "}
            <span className="text-accent">{t("player.faq.titleHighlight")}</span>
          </span>
          <span className="block text-accent">{t("player.faq.titleHighlight2")}</span>
        </>
      }
    />
  );
};

export default PlayerFaqSection;
