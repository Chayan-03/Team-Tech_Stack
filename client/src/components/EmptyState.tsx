import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Crop, Leaf, Shield, Cloud } from "lucide-react";
import { useTranslation } from "react-i18next";

// Define our types
type CategoryKey = "crops" | "soil" | "pests" | "weather";

interface QuestionsByCategory {
  crops: string[];
  soil: string[];
  pests: string[];
  weather: string[];
}

interface CategoryInfo {
  title: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  textColor: string;
}

const FarmAIEmptyState: React.FC = () => {
  const { t } = useTranslation("questions");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );

  // Get common questions from translations. Define these in your translation JSON file
  // using a key "commonQuestions" with keys for each category.
  const commonQuestions = t("commonQuestions", {
    returnObjects: true,
    defaultValue: {
      crops: [],
      soil: [],
      pests: [],
      weather: [],
    },
  }) as QuestionsByCategory;

  // Define category information with translated titles.
  const categories: Record<CategoryKey, CategoryInfo> = {
    crops: {
      title: t("categories.crops", "Crops"),
      icon: <Crop size={20} />,
      color: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100",
      textColor: "text-emerald-700",
    },
    soil: {
      title: t("categories.soil", "Soil"),
      icon: <Leaf size={20} />,
      color: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      textColor: "text-green-700",
    },
    pests: {
      title: t("categories.pests", "Pests"),
      icon: <Shield size={20} />,
      color: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      textColor: "text-gray-700",
    },
    weather: {
      title: t("categories.weather", "Weather"),
      icon: <Cloud size={20} />,
      color: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      textColor: "text-gray-700",
    },
  };

  return (
    <div className="mt-16 flex flex-col items-center w-full px-4 py-8 bg-white">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-emerald-600 p-3 rounded-xl">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 ml-3">
            {t("farmAITitle", "Farm AI")}
          </h1>
        </div>

        {/* Welcoming text */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-gray-700 mb-2">
            {t("welcomeTitle", "Smart farming assistance")}
          </h2>
          <p className="text-gray-500">
            {t(
              "welcomeSubtitle",
              "Get expert advice on agricultural management and planning"
            )}
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {(Object.keys(categories) as CategoryKey[]).map((key) => (
            <button
              key={key}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border transition duration-200 ${
                selectedCategory === key
                  ? `bg-emerald-600 text-white border-emerald-600`
                  : `${categories[key].color} ${categories[key].textColor} border-gray-200 ${categories[key].hoverColor}`
              }`}
              onClick={() => setSelectedCategory(key)}
            >
              <div
                className={`mb-2 ${
                  selectedCategory === key
                    ? "text-white"
                    : categories[key].textColor
                }`}
              >
                {categories[key].icon}
              </div>
              <span className="text-sm font-medium">
                {categories[key].title}
              </span>
            </button>
          ))}
        </div>

        {/* Questions Card */}
        {selectedCategory && (
          <Card className="w-full mb-6 border-gray-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {t("askAbout", "Ask about")}{" "}
                  {categories[selectedCategory].title.toLowerCase()}
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {commonQuestions[selectedCategory].map((question, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    className="w-full h-auto py-3 px-4 justify-start text-left text-sm font-normal text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-none"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400">
          {t(
            "footer",
            "Tap a category to get started or type your question below"
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmAIEmptyState;
