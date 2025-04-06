import { useState } from "react";
import {
  Edit2,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Crop,
  Sun,
  CloudRain,
  TrendingUp,
  Award,
  ChevronRight,
  Camera,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation("profile");
  const [activeTab, setActiveTab] = useState("overview");

  const farmerData = {
    name: "Rajesh Patel",
    location: "Anand, Gujarat",
    memberSince: "2019",
    email: "rajesh@kisanvyapar.in",
    phone: "+91 98765 43210",
    farmSize: "13 hectares",
    crops: ["Rice", "Wheat", "Cotton", "Sugarcane"],
    certifications: ["Organic", "PGS India Certified", "NPOP Certified"],
    achievements: [
      { title: "PM Kisan Samman Award", year: "2024" },
      { title: "District Best Organic Farmer", year: "2023" },
      { title: "Water Conservation Excellence", year: "2022" },
    ],
    stats: {
      cropYield: "5.8 tonnes/hectare",
      waterUsage: "32% below regional average",
      revenue: "+21% from last kharif season",
    },
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-lg mx-auto pb-16">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-40 bg-gradient-to-r from-emerald-500 to-emerald-700 relative">
          <button className="absolute bottom-4 right-4 bg-white bg-opacity-20 p-2 rounded-full">
            <Camera className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Profile Photo */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src="/me.jpeg"
              alt={t("profileAlt", "Profile")}
              className="rounded-full w-32 h-32 border-4 border-white shadow-md"
            />
            <button className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full shadow-md">
              <Edit2 className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {farmerData.name}
          </h1>
          <div className="flex items-center justify-center mt-1 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <p className="text-sm">{farmerData.location}</p>
          </div>
          <div className="flex items-center justify-center mt-1 text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <p className="text-sm">
              {t("memberSince", "Member since")} {farmerData.memberSince}
            </p>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <Crop className="h-5 w-5 mx-auto text-emerald-600" />
            <p className="text-xs text-gray-500 mt-1">
              {t("farmSize", "Farm Size")}
            </p>
            <p className="text-sm font-medium">{farmerData.farmSize}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <Sun className="h-5 w-5 mx-auto text-emerald-600" />
            <p className="text-xs text-gray-500 mt-1">{t("crops", "Crops")}</p>
            <p className="text-sm font-medium">{farmerData.crops.length}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <Award className="h-5 w-5 mx-auto text-emerald-600" />
            <p className="text-xs text-gray-500 mt-1">
              {t("awards", "Awards")}
            </p>
            <p className="text-sm font-medium">
              {farmerData.achievements.length}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-sm mt-6 divide-y divide-gray-100">
          <div className="flex items-center p-4">
            <Mail className="h-5 w-5 text-gray-500 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">{t("email", "Email")}</p>
              <p className="text-sm font-medium">{farmerData.email}</p>
            </div>
          </div>
          <div className="flex items-center p-4">
            <Phone className="h-5 w-5 text-gray-500 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">{t("phone", "Phone")}</p>
              <p className="text-sm font-medium">{farmerData.phone}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => handleTabChange("overview")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "overview"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500"
              }`}
            >
              {t("overview", "Overview")}
            </button>
            <button
              onClick={() => handleTabChange("crops")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "crops"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500"
              }`}
            >
              {t("crops", "Crops")}
            </button>
            <button
              onClick={() => handleTabChange("achievements")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "achievements"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500"
              }`}
            >
              {t("achievements", "Achievements")}
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-lg font-medium mb-4 text-gray-800">
                  {t("farmStats", "Farm Stats")}
                </h2>
                <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                  <div className="flex items-center p-4">
                    <Crop className="h-5 w-5 text-emerald-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        {t("cropYield", "Crop Yield")}
                      </p>
                      <p className="text-sm font-medium">
                        {farmerData.stats.cropYield}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4">
                    <CloudRain className="h-5 w-5 text-emerald-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        {t("waterUsage", "Water Usage")}
                      </p>
                      <p className="text-sm font-medium">
                        {farmerData.stats.waterUsage}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4">
                    <TrendingUp className="h-5 w-5 text-emerald-600 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">
                        {t("revenue", "Revenue")}
                      </p>
                      <p className="text-sm font-medium">
                        {farmerData.stats.revenue}
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-medium mt-6 mb-4 text-gray-800">
                  {t("certifications", "Certifications")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {farmerData.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                    >
                      <Award className="h-4 w-4 mr-1" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "crops" && (
              <div>
                <h2 className="text-lg font-medium mb-4 text-gray-800">
                  {t("currentCrops", "Current Crops")}
                </h2>
                <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                  {farmerData.crops.map((crop, index) => (
                    <div key={index} className="flex items-center p-4">
                      <Crop className="h-5 w-5 text-emerald-600 mr-3" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{crop}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div>
                <h2 className="text-lg font-medium mb-4 text-gray-800">
                  {t("awards", "Awards & Achievements")}
                </h2>
                <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                  {farmerData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center p-4">
                      <Award className="h-5 w-5 text-emerald-600 mr-3" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {achievement.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
          {t("editProfile", "Edit Profile")}
        </button>
      </div>
    </div>
  );
};

export default Profile;
