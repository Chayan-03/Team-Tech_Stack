import React, { useState, ChangeEvent, FormEvent } from "react";
import TopNav from "../../components/TopNav";
import BottomNavbar from "../../components/BottomNav";
import { Camera, Package, Leaf, Tractor, FileText, Tag, X } from "lucide-react";

interface FormDataType {
  name: string;
  category: string;
  price: string;
  image: File | null;
  description: string;
}

interface CategoryType {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const Sell: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    category: "crops",
    price: "",
    image: null,
    description: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const categories: CategoryType[] = [
    { value: "amenities", label: "Amenities", icon: <Package size={20} /> },
    { value: "crops", label: "Crops", icon: <Leaf size={20} /> },
    { value: "equipment", label: "Equipment", icon: <Tractor size={20} /> },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFormData({
        ...formData,
        image: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setFormData({
      ...formData,
      image: null,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the data to your backend
    console.log("Submitting form data:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form after submission
      setFormData({
        name: "",
        category: "crops",
        price: "",
        image: null,
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
          <span className="text-xs mt-1">Details</span>
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
          <span className="text-xs mt-1">Media</span>
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
          <span className="text-xs mt-1">Publish</span>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Item Details</h2>

        {/* Item Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            Item Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Corn Seeds (High Yield)"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FileText size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Category
          </label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, category: category.value })
                }
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                  formData.category === category.value
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`mb-2 ${
                    formData.category === category.value
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {category.icon}
                </div>
                <span
                  className={`text-sm ${
                    formData.category === category.value
                      ? "font-medium text-green-700"
                      : "text-gray-600"
                  }`}
                >
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            Price (₹)
          </label>
          <div className="relative">
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="199"
              min="0"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-gray-500 font-bold">₹</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details about your product..."
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
          />
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="w-full py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
        >
          Continue to Add Photos
        </button>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Add Photos</h2>

        {!previewImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <Camera size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Upload Product Images
            </h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Drag and drop your image here, or click to browse
            </p>
            <label
              htmlFor="image"
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg cursor-pointer hover:bg-green-200 transition-colors"
            >
              Browse Files
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
              Maximum file size: 5MB | Formats: JPG, PNG
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <div className="relative mb-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                type="button"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Your main product image. This will be displayed in the product
              listing.
            </p>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!previewImage || isSubmitting}
            className={`flex-1 py-4 rounded-lg font-medium shadow-md ${
              !previewImage || isSubmitting
                ? "bg-gray-400 text-white"
                : "bg-green-600 text-white hover:bg-green-700"
            } transition-colors`}
          >
            {isSubmitting ? "Publishing..." : "Publish Listing"}
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
          Listing Published!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Your item has been successfully listed and is now available for buyers
          to see.
        </p>
        <button
          onClick={() => setStep(1)}
          className="w-full py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
          type="button"
        >
          List Another Item
        </button>
      </div>
    );
  };

  return (
    <>
      <TopNav />
      <div className="bg-gray-100 min-h-screen py-6 px-4 pb-24">
        <h1 className="text-2xl font-bold mb-6 text-center">Sell Your Item</h1>

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

export default Sell;
