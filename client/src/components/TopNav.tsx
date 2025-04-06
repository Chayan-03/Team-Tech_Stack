import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Sun, Moon, CircleUserRound, Settings } from "lucide-react";
import LanguageToggle from "./LangSelect";
import { useTranslation } from "react-i18next";

const TopNav = () => {
  const { t, i18n } = useTranslation("topnav");
  const navigate = useNavigate();
  const [mobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("greeting.morning", "Good Morning");
    if (hour < 17) return t("greeting.afternoon", "Good Afternoon");
    return t("greeting.evening", "Good Evening");
  };

  // const toggleMenu = () => {
  //   setMobileMenuOpen(!mobileMenuOpen);
  // };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-emerald-600 text-white shadow-lg">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col">
          {/* Top Row - Always Visible on Mobile */}
          <div className="flex justify-between items-center h-16 px-4">
            {/* Logo and Greeting */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-emerald-400 rounded-md flex items-center justify-center">
                  <span className="font-bold text-emerald-800">F</span>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold truncate max-w-[150px] sm:max-w-none">
                  {getGreeting()},{" "}
                  <span className="font-bold">{t("farmer", "Farmer")}</span>
                </h1>
                <p className="text-xs text-emerald-100 hidden sm:block">
                  {new Date().toLocaleDateString(i18n.language, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Always Visible Action Icons */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="h-5 w-5 text-emerald-100 hover:text-white cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  2
                </span>
              </div>
              <img
                src="/me.jpeg"
                alt={t("profileAlt", "Profile")}
                className="rounded-full w-8 h-8 border-2 border-emerald-300 hover:border-white transition-all"
              />
              {/* <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-5 w-5" />
                ) : (
                  <Menu className="block h-5 w-5" />
                )}
              </button> */}
            </div>
          </div>

          {/* Bottom Action Row - Always Visible on Mobile */}
          <div className="bg-emerald-700 px-4 py-2 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-emerald-100 hover:text-white transition-colors"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-emerald-100 hover:text-white transition-colors"
              >
                <CircleUserRound className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-emerald-100 hover:text-white transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Expanded Mobile Menu */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-emerald-800">
          <div className="flex items-center space-x-3 px-3 py-3 border-b border-emerald-700">
            <img
              src="/me.jpeg"
              alt={t("profileAlt", "Profile")}
              className="rounded-full w-12 h-12 border-2 border-emerald-300"
            />
            <div>
              <p className="text-sm font-medium">
                {t("farmerName", "Alex Smith")}
              </p>
              <p className="text-xs text-emerald-200">
                {t("farmName", "Green Acres")}
              </p>
            </div>
          </div>
          <div className="px-3 py-2 text-emerald-100 border-b border-emerald-700">
            <p className="text-xs">
              {new Date().toLocaleDateString(i18n.language, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <a
            href="#dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-600"
          >
            {t("dashboard", "Dashboard")}
          </a>
          <a
            href="#crops"
            className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-600"
          >
            {t("crops", "Crops")}
          </a>
          <a
            href="#weather"
            className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-600"
          >
            {t("weather", "Weather")}
          </a>
          <a
            href="#marketplace"
            className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-600"
          >
            {t("marketplace", "Marketplace")}
          </a>
          <a
            href="#settings"
            className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-600"
          >
            {t("settings", "Settings")}
          </a>
        </div>
      </div>

      {/* Desktop Navigation Enhancement - Hidden on Mobile */}
      <div className="hidden lg:block border-t border-emerald-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <a
              href="#dashboard"
              className="px-3 py-2 text-sm font-medium text-emerald-100 hover:text-white"
            >
              {t("dashboard", "Dashboard")}
            </a>
            <a
              href="#crops"
              className="px-3 py-2 text-sm font-medium text-emerald-100 hover:text-white"
            >
              {t("crops", "Crops")}
            </a>
            <a
              href="#weather"
              className="px-3 py-2 text-sm font-medium text-emerald-100 hover:text-white"
            >
              {t("weather", "Weather")}
            </a>
            <a
              href="#marketplace"
              className="px-3 py-2 text-sm font-medium text-emerald-100 hover:text-white"
            >
              {t("marketplace", "Marketplace")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
