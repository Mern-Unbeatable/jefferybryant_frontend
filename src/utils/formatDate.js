export const formatDate = (value, language = "en", options = { month: "short", day: "numeric", year: "numeric" }) => {
  const locale = language === "pap" ? "en" : language;
  return new Date(`${value}T00:00:00`).toLocaleDateString(locale, options);
};
