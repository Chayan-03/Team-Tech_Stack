import { useState } from "react";
import {
  CloudRain,
  Bell,
  Tractor,
  ShoppingBag,
  Droplet,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import TopNav from "../components/TopNav";
import BottomNavbar from "../components/BottomNav";

const Home: React.FC = () => {
  const { t } = useTranslation("home");
  const [activeTab] = useState("home");

  const quickActions = [
    {
      icon: Tractor,
      title: t("cropPlanning"),
      description: t("cropPlanningDesc"),
    },
    {
      icon: ShoppingBag,
      title: t("marketPrices"),
      description: t("marketPricesDesc"),
    },
    {
      icon: Droplet,
      title: t("irrigation"),
      description: t("irrigationDesc"),
    },
  ];

  const cropHealth = [
    {
      crop: "Wheat",
      stage: "Harvesting",
      health: "Good",
      area: "5 acres",
      progress: 85,
    },
    {
      crop: "Corn",
      stage: "Flowering",
      health: "Fair",
      area: "3 acres",
      progress: 60,
    },
  ];

  const financialInsights = [
    {
      icon: TrendingUp,
      title: t("totalEarnings"),
      value: "₹1,25,000",
    },
    {
      icon: Calendar,
      title: t("expectedHarvest"),
      value: t("next30Days"),
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 pb-16">
      <TopNav />

      <div className="p-4 space-y-6">
        <div className="grid grid-row-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{t("location")}</h2>
                <p className="text-sm text-gray-600">{t("weatherStatus")}</p>
              </div>
              <CloudRain className="w-12 h-12 text-blue-400" />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-8 text-zinc-500">
                <p className="text-lg font-medium">
                  {t("humidity", { value: 42 })}
                </p>
                <p className="text-lg font-medium">
                  {t("wind", { value: 6.1 })}
                </p>
              </div>
              <div className="text-grey-700">
                <span className="text-4xl font-extrabold tracking-wide">
                  {t("temperature")}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 rounded-xl p-4 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <Bell className="w-6 h-6 mr-3 text-yellow-600" />
              <p className="text-sm font-medium">{t("rainAlert")}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t("quickActionsTitle")}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-2">
                  <action.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-medium text-sm">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{t("myCrops")}</h2>
          <div className="space-y-4">
            {cropHealth.map((crop, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{crop.crop}</h3>
                    <p className="text-sm text-gray-600">
                      {t("stageAndArea", {
                        stage: crop.stage,
                        area: crop.area,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        crop.health === "Good"
                          ? "bg-green-500"
                          : crop.health === "Fair"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-sm">{crop.health}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="bg-gray-200 rounded-full h-2 w-full">
                    <div
                      className="bg-green-500 rounded-full h-2"
                      style={{ width: `${crop.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {t("progressCompleted", { progress: crop.progress })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t("financialOverview")}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {financialInsights.map((insight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-md flex items-center"
              >
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <insight.icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{insight.title}</p>
                  <h3 className="font-semibold">{insight.value}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavbar activeTab={activeTab} />
    </div>
  );
};

export default Home;
