import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import es from "./locales/es.json";
import pap from "./locales/pap.json";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pap", label: "Papiamentu" },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pap: { translation: pap },
    },
    fallbackLng: "en",
    supportedLngs: LANGUAGES.map((lang) => lang.code),
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

const setHtmlLang = (lng) => {
  document.documentElement.lang = lng;
};

setHtmlLang(i18n.resolvedLanguage);
i18n.on("languageChanged", setHtmlLang);

export default i18n;
