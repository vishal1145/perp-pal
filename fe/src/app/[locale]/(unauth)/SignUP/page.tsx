"use client"
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { logoBtnColor } from '@/data/data';
const SignUp = ({ onClose,onSwitchToSignIn}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/signup `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      setSuccessMessage('Sign up successful!');
      onClose(); // Close the modal if sign-up is successful
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalWrapper') {
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20" id="modalWrapper"  onClick={handleOutsideClick}>
      <div className="relative w-full max-w-md p-5 bg-white rounded-lg shadow-lg space-y-1"
      >
        
        

        {/* Logo */}
        <div className="flex justify-center">
          <img src="/assets/images/logo1.png" alt="Logo" className="w-30 h-20" />
        </div>

        <h3 className="text-xl font-semibold text-center text-gray-600">Welcome to PrepPal! 👋</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600" style={{marginBottom:"3px"}}>Username</label>
            <input
              type="text"
              name="username"
              style={{fontSize:"14px"}}
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Username"
              className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" style={{marginBottom:"3px"}}>Email</label>
            <input
              type="email"
              name="email"
              style={{fontSize:"14px"}}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" style={{marginBottom:"3px"}}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                style={{fontSize:"14px"}}
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
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
              I agree to &nbsp;<span className='text-cyan-600'> privacy policy & terms</span>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full text-white   ${logoBtnColor} font-medium px-4 py-2 rounded`}
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
            <button type="button" onClick={onSwitchToSignIn} className="font-bold text-cyan-600 hover:underline">
            Sign in instead
            </button>
          </p>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
