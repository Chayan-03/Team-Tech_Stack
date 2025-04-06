import { useState } from "react";
import TopNav from "../../components/TopNav";
import BottomNavbar from "../../components/BottomNav";
import { Filter, Search, MapPin, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const Rent: React.FC = () => {
  const { t } = useTranslation("rent");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [capacity, setCapacity] = useState([0, 10000]);
  const [duration, setDuration] = useState("any");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample cold storage rental data
  const storages = [
    {
      id: 1,
      name: "Industrial Cold Storage Facility",
      location: "Pune, Maharashtra",
      capacity: 5000,
      price: 200000,
      period: "month",
      image: "/rent/industrial-cold-storage.jpg",
      rating: 4.5,
      amenities: ["24/7 Access", "Security System", "Loading Dock"],
    },
    {
      id: 2,
      name: "Commercial Freezer Unit",
      location: "Coimbatore, Tamil Nadu",
      capacity: 3200,
      price: 150000,
      period: "month",
      image: "/rent/commericial-freezer.webp",
      rating: 4.2,
      amenities: [
        "Temperature Control",
        "Inventory System",
        "Forklift Available",
      ],
    },
    {
      id: 3,
      name: "Small Cold Room",
      location: "Indore, Madhya Pradesh",
      capacity: 800,
      price: 55000,
      period: "month",
      image: "/rent/small-cold-room.avif",
      rating: 4.7,
      amenities: ["Flexible Terms", "Easy Access", "City Center"],
    },
    {
      id: 4,
      name: "Large Distribution Cold Storage",
      location: "Bahadurgarh, Haryana",
      capacity: 8500,
      price: 350000,
      period: "month",
      image: "/rent/large-cold-storage.avif",
      rating: 4.8,
      amenities: ["Highway Access", "Large Truck Bay", "24/7 Security"],
    },
    {
      id: 5,
      name: "Seasonal Storage Space",
      location: "Nagpur, Maharashtra",
      capacity: 2500,
      price: 320000,
      period: "season",
      image: "/rent/Seasonal-Storage.webp",
      rating: 4.3,
      amenities: ["3-Month Minimum", "Harvest Season Priority", "Sorting Area"],
    },
    {
      id: 6,
      name: "Mobile Cold Storage Unit",
      location: "Pan India",
      capacity: 1200,
      price: 60000,
      period: "week",
      image: "/rent/mobile-cs.jpg",
      rating: 4.6,
      amenities: [
        "Transportable",
        "Generator Included",
        "Short-term Available",
      ],
    },
  ];

  // Filter storages based on active filters
  const filteredStorages = storages.filter((storage) => {
    // Filter by price
    if (storage.price < priceRange[0] || storage.price > priceRange[1])
      return false;

    // Filter by capacity
    if (storage.capacity < capacity[0] || storage.capacity > capacity[1])
      return false;

    // Filter by duration
    if (duration !== "any" && storage.period !== duration) return false;

    // Filter by search query (name or location)
    if (
      searchQuery &&
      !storage.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !storage.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNav />

      {/* Main Content */}
      <main className="flex-1 pb-16">
        {/* Search Bar */}
        <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t(
                "searchPlaceholder",
                "Search by location or storage name..."
              )}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="ml-2 p-2 bg-gray-100 rounded-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-4 shadow-sm border-t border-gray-200 animate-in fade-in">
            <h3 className="font-medium text-gray-800 mb-3">
              {t("filters", "Filters")}
            </h3>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                {t("priceRangeLabel", "Price Range (per period)")}
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">₹{priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="100"
                  className="flex-1 accent-gray-600"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                />
                <span className="text-gray-500">₹{priceRange[1]}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                {t("capacityLabel", "Capacity (sq ft)")}
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">{capacity[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  className="flex-1 accent-gray-600"
                  value={capacity[1]}
                  onChange={(e) =>
                    setCapacity([capacity[0], parseInt(e.target.value)])
                  }
                />
                <span className="text-gray-500">{capacity[1]}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                {t("rentalPeriodLabel", "Rental Period")}
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="any">{t("duration.any", "Any Period")}</option>
                <option value="day">{t("duration.day", "Daily")}</option>
                <option value="week">{t("duration.week", "Weekly")}</option>
                <option value="month">{t("duration.month", "Monthly")}</option>
                <option value="season">
                  {t("duration.season", "Seasonal")}
                </option>
                <option value="year">{t("duration.year", "Yearly")}</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600"
                onClick={() => {
                  setPriceRange([0, 500000]);
                  setCapacity([0, 10000]);
                  setDuration("any");
                  setSearchQuery("");
                }}
              >
                {t("reset", "Reset")}
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
                onClick={() => setShowFilters(false)}
              >
                {t("applyFilters", "Apply Filters")}
              </button>
            </div>
          </div>
        )}

        {/* Storage Listings */}
        <div className="p-4">
          {filteredStorages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {t(
                  "noResults",
                  "No cold storage facilities match your criteria."
                )}
              </p>
              <button
                className="mt-2 text-gray-600 underline"
                onClick={() => {
                  setPriceRange([0, 500000]);
                  setCapacity([0, 10000]);
                  setDuration("any");
                  setSearchQuery("");
                }}
              >
                {t("clearAllFilters", "Clear all filters")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStorages.map((storage) => (
                <div
                  key={storage.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={storage.image}
                        alt={storage.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4 md:w-2/3">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-800">
                          {storage.name}
                        </h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {storage.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center mt-2 text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{storage.location}</span>
                      </div>

                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {storage.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-xs px-2 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-600">
                            {t("capacityLabelShort", "Capacity:")}
                          </span>
                          <span className="ml-1 font-medium">
                            {storage.capacity} {t("sqft", "sq ft")}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-gray-800 text-lg">
                            ₹{storage.price}
                          </span>
                          <span className="text-gray-600 text-sm">
                            /{storage.period}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-gray-700 transition">
                          {t("rentNow", "Rent Now")}
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-md hover:bg-gray-100 transition">
                          {t("contactOwner", "Contact Owner")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNavbar activeTab="shop" />
    </div>
  );
};

export default Rent;
