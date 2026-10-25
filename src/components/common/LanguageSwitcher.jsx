import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";
import { LANGUAGES } from "@/i18n";

const LanguageSwitcher = ({ className = "" }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const current =
    LANGUAGES.find((lang) => lang.code === i18n.resolvedLanguage) ??
    LANGUAGES[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 whitespace-nowrap rounded-md border border-white/40 px-3 py-1.5 text-sm text-white transition-colors hover:border-white"
        aria-label={`${t("nav.language")}: ${current.label}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <FiGlobe className="text-base" />
        {current.label}
        <FiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-md border border-white/10 bg-primary py-1 shadow-lg"
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === current.code;
            return (
              <li key={lang.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                    isActive ? "text-btn-primary" : "text-white"
                  }`}
                >
                  {lang.label}
                  {isActive && <FiCheck />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
