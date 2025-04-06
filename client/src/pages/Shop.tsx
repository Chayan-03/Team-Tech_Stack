import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ChartNoAxesCombined,
  Tags,
  Building,
} from "lucide-react";
import TopNav from "../components/TopNav";
import BottomNavbar from "../components/BottomNav";
import { useTranslation } from "react-i18next";

const Shop: React.FC = () => {
  const { t } = useTranslation("shop");
  const navigate = useNavigate();

  const data = [
    {
      key: "buy",
      icon: ShoppingCart,
      path: "/shop/buy",
    },
    {
      key: "sell",
      icon: Tags,
      path: "/shop/sell",
    },
    {
      key: "rent",
      icon: Building,
      path: "/shop/rent",
    },
    {
      key: "list",
      icon: ChartNoAxesCombined,
      path: "/shop/list",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <TopNav />

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col items-center justify-start mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          {t("title", "What would you like to do?")}
        </h2>

        <div className="grid grid-cols-1 gap-6 w-full max-w-md">
          {data.map((entry, idx) => (
            <button
              key={idx}
              onClick={() => navigate(entry.path)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-6 flex items-center text-left">
                <div className="bg-gray-100 p-4 rounded-full mr-4">
                  <entry.icon className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {t(`${entry.key}.heading`)}
                  </h3>
                  <p className="text-gray-600">{t(`${entry.key}.text`)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar activeTab="shop" />
    </div>
  );
};

export default Shop;
