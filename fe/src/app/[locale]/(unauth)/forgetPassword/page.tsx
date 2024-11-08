"use client"
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ForgetPassword = ({ onClose, onSwitchToSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/reset/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Password reset successful. Please check your email.');
      } else {
        setErrorMessage(data.message || 'Password reset failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalWrapper') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50" id="modalWrapper" onClick={handleOutsideClick}>
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 bg-white rounded-lg shadow-lg space-y-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-700 text-2xl sm:text-3xl md:text-4xl"
        >
          &times;
        </button>

        {/* Logo */}
        <div className="flex justify-center ">
          <img src="/assets/images/logo1.png" alt="Logo" className="w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-20" />
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-gray-600 mb-4" style={{marginTop:"1px" , marginBottom:"2rem"}}>
          Welcome to PrepPal! 👋
        </h3>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form className="space-y-4" onSubmit={handleResetPassword}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:border-blue-500"
                required
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
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
