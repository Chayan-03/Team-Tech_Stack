import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, Lock, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    password: "",
  });

  interface FormData {
    mobileNumber: string;
    email: string;
    password: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevState: FormData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/home");
    console.log("Login submitted", formData);
  };

  const handleGuestLogin = () => {
    navigate("/home");
    console.log("Guest login");
  };

  return (
    <div className="min-h-screen bg-grey-100 flex flex-col justify-center px-4 py-8">
      <div className="w-full mx-auto rounded-xl p-6">
        <div className="flex items-center justify-center space-x-3">
          <h1 className="text-4xl font-bold text-green-700 tracking-tight">
            Agro Setu
          </h1>
          <img
            src="/plant.webp"
            alt="Plant logo"
            className="h-12 w-12 transform transition-transform duration-300 hover:scale-110 hover:rotate-3"
          />
        </div>

        <h3 className="text-md text-center mb-6 mx-auto bg-grey-600 font-normal">
          Start Your Agricultral Journey
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="mobileNumber" className="sr-only">
              Mobile Number
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>

        {/* Guest Login Button */}
        <div className="mt-4">
          <button
            onClick={handleGuestLogin}
            className="w-full flex items-center justify-center bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <User className="h-5 w-5 mr-2" />
            Continue as Guest
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-10 text-center">
          <a href="#" className="text-sm text-green-600 hover:underline">
            Forgot Password?
          </a>
          <p className="text-sm text-gray-600 mt-2">
            Don't have an account?
            <a href="#" className="text-green-600 ml-1 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
