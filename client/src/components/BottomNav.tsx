import { Home, Search, ShoppingCart, HelpCircle, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BottomNavbarProps {
  activeTab: string;
}

const BottomNavbar = ({ activeTab }: BottomNavbarProps) => {
  const { t } = useTranslation("bottomnav");
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: t("home", "Home"), value: "home" },
    { icon: Search, label: t("find", "Find"), value: "find" },
    { icon: ShoppingCart, label: t("shop", "Shop"), value: "shop" },
    { icon: HelpCircle, label: t("help", "Help"), value: "help" },
    { icon: Leaf, label: t("farm", "Farm"), value: "farm" },
  ];

  const onTabChange = (url: string) => {
    navigate(`/${url}`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onTabChange(item.value)}
            className={`flex flex-col items-center justify-center w-full py-1 ${
              activeTab === item.value
                ? "text-green-600"
                : "text-gray-500 hover:text-green-500"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
