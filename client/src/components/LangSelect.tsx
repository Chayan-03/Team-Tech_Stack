import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en";

  const toggleLanguage = () => {
    const newLang = isEnglish ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-white hover:text-emerald-200 transition-colors"
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">{isEnglish ? "EN" : "हि"}</span>
    </button>
  );
};

export default LanguageToggle;
