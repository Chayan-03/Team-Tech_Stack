import React, { useState } from "react";
import TopNav from "../../components/TopNav";
import BottomNavbar from "../../components/BottomNav";
import {
  MapPin,
  Warehouse,
  DollarSign,
  Calendar,
  Check,
  Thermometer,
  Package,
  Truck,
  Clock,
  Shield,
  FileText,
  Tag,
  Camera,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ListingFormData {
  name: string;
  location: string;
  capacity: string;
  price: string;
  period: "day" | "week" | "month" | "year";
  image: File | null;
  amenities: string[];
  description?: string;
}

interface AmenityOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const List: React.FC = () => {
  const { t } = useTranslation("list");
  const [formData, setFormData] = useState<ListingFormData>({
    name: "",
    location: "",
    capacity: "",
    price: "",
    period: "month",
    image: null,
    amenities: [],
    description: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const periodOptions: {
    value: "day" | "week" | "month" | "year";
    label: string;
  }[] = [
    { value: "day", label: t("period.day", "Per Day") },
    { value: "week", label: t("period.week", "Per Week") },
    { value: "month", label: t("period.month", "Per Month") },
    { value: "year", label: t("period.year", "Per Year") },
  ];

  const amenityOptions: AmenityOption[] = [
    {
      value: "Temperature Control",
      label: t("amenities.temperatureControl", "Temperature Control"),
      icon: <Thermometer size={18} />,
    },
    {
      value: "Inventory System",
      label: t("amenities.inventorySystem", "Inventory System"),
      icon: <Package size={18} />,
    },
    {
      value: "Forklift Available",
      label: t("amenities.forkliftAvailable", "Forklift Available"),
      icon: <Truck size={18} />,
    },
    {
      value: "24/7 Access",
      label: t("amenities.access24x7", "24/7 Access"),
      icon: <Clock size={18} />,
    },
    {
      value: "Security System",
      label: t("amenities.securitySystem", "Security System"),
      icon: <Shield size={18} />,
    },
    {
      value: "Loading Dock",
      label: t("amenities.loadingDock", "Loading Dock"),
      icon: <Truck size={18} />,
    },
    {
      value: "Flexible Terms",
      label: t("amenities.flexibleTerms", "Flexible Terms"),
      icon: <FileText size={18} />,
    },
    {
      value: "Easy Access",
      label: t("amenities.easyAccess", "Easy Access"),
      icon: <MapPin size={18} />,
    },
    {
      value: "City Center",
      label: t("amenities.cityCenter", "City Center"),
      icon: <MapPin size={18} />,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter((a) => a !== amenity),
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity],
        };
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        location: "",
        capacity: "",
        price: "",
        period: "month",
        image: null,
        amenities: [],
        description: "",
      });
      setPreviewImage(null);

      // Show success state
      setStep(3);
    }, 1500);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between w-full max-w-md mx-auto mb-8">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            <FileText size={20} />
          </div>
          <span className="text-xs mt-1">{t("step.details", "Details")}</span>
        </div>

        <div className="flex-1 h-1 mx-2 bg-gray-200">
          <div
            className={`h-full ${step >= 2 ? "bg-green-500" : "bg-gray-200"}`}
            style={{ width: step >= 2 ? "100%" : "0%" }}
          ></div>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            <Camera size={20} />
          </div>
          <span className="text-xs mt-1">{t("step.media", "Media")}</span>
        </div>

        <div className="flex-1 h-1 mx-2 bg-gray-200">
          <div
            className={`h-full ${step >= 3 ? "bg-green-500" : "bg-gray-200"}`}
            style={{ width: step >= 3 ? "100%" : "0%" }}
          ></div>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step === 3 ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            <Tag size={20} />
          </div>
          <span className="text-xs mt-1">{t("step.publish", "Publish")}</span>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">
          {t("step.facilityDetails", "Facility Details")}
        </h2>

        {/* Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            {t("step.facilityNameLabel", "Facility Name")}
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t(
                "step.facilityNamePlaceholder",
                "e.g. Industrial Cold Storage Facility"
              )}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Warehouse size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label
            htmlFor="location"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            {t("step.locationLabel", "Location")}
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={t(
                "step.locationPlaceholder",
                "e.g. Pune, Maharashtra"
              )}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-6">
          <label
            htmlFor="capacity"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            {t("step.capacityLabel", "Capacity (in tons)")}
          </label>
          <div className="relative">
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder={t("step.capacityPlaceholder", "e.g. 5000")}
              min="0"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Warehouse size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Price and Period */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              {t("step.priceLabel", "Price (₹)")}
            </label>
            <div className="relative">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder={t("step.pricePlaceholder", "e.g. 200000")}
                min="0"
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <DollarSign size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="period"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              {t("step.periodLabel", "Rental Period")}
            </label>
            <div className="relative">
              <select
                id="period"
                name="period"
                value={formData.period}
                onChange={handleChange}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none"
                required
              >
                {periodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={20} className="text-gray-400" />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            {t("step.descriptionLabel", "Description (Optional)")}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t(
              "step.descriptionPlaceholder",
              "Add details about your facility..."
            )}
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="w-full py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          {t("step.continue", "Continue to Add Photos & Amenities")}
        </button>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">
          {t("step.title", "Photos & Amenities")}
        </h2>

        {/* Image Upload */}
        <div className="mb-8">
          <h3 className="text-md font-medium mb-3 text-gray-700">
            {t("step.photosLabel", "Facility Photos")}
          </h3>

          {!previewImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <Camera size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {t("step.uploadPrompt", "Upload Facility Images")}
              </h3>
              <p className="text-sm text-gray-500 mb-4 text-center">
                {t(
                  "step.uploadInstructions",
                  "Drag and drop your image here, or click to browse"
                )}
              </p>
              <label
                htmlFor="image"
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors"
              >
                {t("step.browseFiles", "Browse Files")}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-4">
                {t(
                  "step.fileInfo",
                  "Maximum file size: 5MB | Formats: JPG, PNG"
                )}
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <div className="relative mb-4">
                <img
                  src={previewImage}
                  alt={t("step.previewAlt", "Preview")}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-700" />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {t(
                  "step.previewInfo",
                  "Your main facility image. This will be displayed in the listing."
                )}
              </p>
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700">
            {t("step.amenitiesLabel", "Available Amenities")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {amenityOptions.map((amenity) => (
              <button
                key={amenity.value}
                type="button"
                onClick={() => handleAmenityToggle(amenity.value)}
                className={`flex items-center p-3 rounded-lg border ${
                  formData.amenities.includes(amenity.value)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`mr-3 ${
                    formData.amenities.includes(amenity.value)
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {amenity.icon}
                </div>
                <span
                  className={`text-sm ${
                    formData.amenities.includes(amenity.value)
                      ? "font-medium text-blue-700"
                      : "text-gray-600"
                  }`}
                >
                  {amenity.label}
                </span>
                {formData.amenities.includes(amenity.value) && (
                  <Check size={16} className="ml-auto text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            {t("step.back", "Back")}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!previewImage || isSubmitting}
            className={`flex-1 py-4 rounded-lg font-medium shadow-md ${
              !previewImage || isSubmitting
                ? "bg-gray-400 text-white"
                : "bg-green-600 text-white hover:bg-blue-700"
            } transition-colors`}
          >
            {isSubmitting
              ? t("step.publishing", "Publishing...")
              : t("step.publishListing", "Publish Listing")}
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {t("step.listingPublished", "Listing Published!")}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {t(
            "step.successMessage",
            "Your facility has been successfully listed and is now available for users to rent."
          )}
        </p>
        <button
          onClick={() => setStep(1)}
          className="w-full py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          {t("step.listAnother", "List Another Facility")}
        </button>
      </div>
    );
  };

  return (
    <>
      <TopNav />
      <div className="bg-gray-100 min-h-screen py-6 px-4 pb-24">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {t("header", "List Your Storage Facility")}
        </h1>

        {renderStepIndicator()}

        <div className="max-w-md mx-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </form>
        </div>
      </div>
      <BottomNavbar activeTab="shop" />
    </>
  );
};

export default List;
