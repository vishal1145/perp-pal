"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { logoBtnColor, text1, text2 } from "@/data/data";
import Loader from "@/components/Loader";
import Snackbar from "@/components/snackbar";
import GoogleLoginButton from '@/components/GoogleLogin';
import { setUserProfile } from "@/data/functions";

interface SignUpProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;

}

const SignUp = ({ onClose, onSwitchToSignIn }: SignUpProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [snackbar, setSnackbar] = useState<{ message: string; type: string }>({ message: "", type: "" });
  const [showLoader, setShowLoader] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value.trimStart(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setSnackbar({ message: "All fields are required and cannot start with whitespace.", type: "error" });
      return;
    }

    if (!termsChecked) {
      setSnackbar({ message: "Please select terms and privacy policy", type: "error" });
      return;
    }

    setShowLoader(true);
    setSnackbar({ message: "", type: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to sign up");

      const data = await response.json();
      setUserProfile(data.data);
      onClose();
      setSnackbar({ message: "Sign up successful!", type: "success" });
      setTimeout(() => onClose(), 2000); // Close modal after showing success
    } catch (error) {
      setSnackbar({ message: "User already exist", type: "error" });
    } finally {
      setShowLoader(false);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modalWrapper") onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ message: "", type: "" }); // Clear the snackbar message
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      id="modalWrapper"
      onClick={handleOutsideClick}
    >
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg space-y-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-gray-700 text-2xl sm:text-3xl md:text-4xl"
        >
          &times;
        </button>
        <div className="flex justify-center">
          <img
            src="/assets/images/logo1.png"
            alt="Logo"
            className="w-24 sm:w-28 md:w-30 object-contain"
          />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-600 mb-4">
          Welcome to PrepPal! 👋
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Username"
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" checked={termsChecked} onClick={() => setTermsChecked(!termsChecked)} />
              I agree to &nbsp;
              <a
                href="/privacy-policy"
                className="text-cyan-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy
              </a>
              &nbsp; and &nbsp;
              <a
                href="/terms-and-conditions"
                className="text-cyan-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms
              </a>
            </label>
          </div>
          {showLoader ? (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              className={`w-full text-white ${logoBtnColor} font-medium px-4 py-2 rounded`}
            >
              Sign Up
            </button>
          )}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button type="button" onClick={onSwitchToSignIn} className="font-bold text-cyan-600 hover:underline">
              Sign in instead
            </button>
          </p>

          <div className="flex items-center  ">
            <div className={`${text2} flex-grow border-t`} />
            <span className={`${text1} mx-4`}>OR</span>
            <div className={`${text2} flex-grow border-t`} />
          </div>
          <GoogleLoginButton onClose={onClose} />
        </form>
        {snackbar.message && (
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            onClose={handleSnackbarClose}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
