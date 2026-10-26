import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronLeft } from "react-icons/fi";

const BackButton = ({ className = "" }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/");
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label={t("join.back")}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-primary shadow-lg transition hover:bg-btn-primary ${className}`}
    >
      <FiChevronLeft />
    </button>
  );
};

export default BackButton;
