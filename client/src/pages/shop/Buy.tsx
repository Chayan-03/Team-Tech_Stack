import { useState } from "react";
import { Filter, Search, Leaf, Tractor, Package } from "lucide-react";
import TopNav from "../../components/TopNav";
import BottomNavbar from "../../components/BottomNav";

const Buy = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Organic Wheat Seeds",
      category: "crops",
      price: 129,
      image: "/buy/wheat_seeds.webp",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Corn Seeds (High Yield)",
      category: "crops",
      price: 199,
      image: "/buy/corn.jpg",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Tomato Seedlings",
      category: "crops",
      price: 79,
      image: "/buy/tomato.cms",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Compact Tractor",
      category: "equipment",
      price: 8499,
      image: "/buy/tractor.avif",
      rating: 4.8,
    },
    {
      id: 5,
      name: "Irrigation System",
      category: "equipment",
      price: 1299,
      image: "/buy/pipes.webp",
      rating: 4.3,
    },
    {
      id: 6,
      name: "Handheld Seeder",
      category: "equipment",
      price: 349,
      image: "/buy/seeder.jpg",
      rating: 4.1,
    },
    {
      id: 7,
      name: "Storage Silo",
      category: "amenities",
      price: 5999,
      image: "/buy/silo.jpg",
      rating: 4.6,
    },
    {
      id: 8,
      name: "Farm Kit",
      category: "amenities",
      price: 899,
      image: "/buy/farm-kit.jpg",
      rating: 4.4,
    },
    {
      id: 9,
      name: "Weather Station",
      category: "amenities",
      price: 599,
      image: "/buy/weather-station.jpg",
      rating: 4.9,
    },
  ];

  // Category options
  const categories = [
    { id: "all", label: "All Products", icon: <Package className="h-5 w-5" /> },
    { id: "crops", label: "Crops & Seeds", icon: <Leaf className="h-5 w-5" /> },
    {
      id: "equipment",
      label: "Equipment",
      icon: <Tractor className="h-5 w-5" />,
    },
    {
      id: "amenities",
      label: "Amenities",
      icon: <Package className="h-5 w-5" />,
    },
  ];

  // Filter products based on active filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (activeCategory !== "all" && product.category !== activeCategory)
      return false;

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;

    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

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
              placeholder="Search crops, equipment, amenities..."
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
            <h3 className="font-medium text-gray-800 mb-3">Filters</h3>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                Price Range
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">${priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  className="flex-1 accent-gray-600"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                />
                <span className="text-gray-500">${priceRange[1]}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600"
                onClick={() => {
                  setPriceRange([0, 10000]);
                  setSearchQuery("");
                }}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Category Navigation */}
        <div className="overflow-x-auto p-2 bg-white shadow-sm border-t border-gray-200">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 whitespace-nowrap transition-colors duration-200 ${
                  activeCategory === category.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                <span className="font-medium text-sm">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products match your filters.</p>
              <button
                className="mt-2 text-gray-600 underline"
                onClick={() => {
                  setActiveCategory("all");
                  setPriceRange([0, 10000]);
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800 text-sm">
                        {product.name}
                      </h3>
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold text-gray-800">
                        ₹{product.price}
                      </span>
                      <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded-md">
                        Add
                      </button>
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

export default Buy;
