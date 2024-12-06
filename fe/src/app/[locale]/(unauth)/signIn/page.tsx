'use client';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { logoBtnColor } from '@/data/data';
import { setUserProfile } from '@/data/functions';
import Loader from '@/components/Loader';
import Snackbar from "@/components/snackbar";

const SignIn = ({ onClose, onSwitchToSignUp, onForgotPassword, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState(true); 
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setShowLoader(true);
    setSnackbar({ message: "", type: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
     
      if (response.ok) {
        console.log('Login successful:', data);
        
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/me`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const userData = await userResponse.json();
        setUserProfile(userData.data);
        onLogin(userData);
      
        onClose();
        setSnackbar({ message: "Login successful!", type: "success" });
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
        setErrorMessage('An unexpected error occurred. Please try again later.');
        setSnackbar({ message: data.message || 'Login failed. Please try again.', type: "error" });
      
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setSnackbar({ message: 'An unexpected error occurred. Please try again later.', type: "error" });
    }
    finally {
      setShowLoader(false); // Stop the loader after the API call finishes
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalWrapper') {
      onClose();
    }
  };
  const handleSnackbarClose = () => {
    setSnackbar({ message: "", type: "" }); // Clear the snackbar message
  };


  return (
    <div
    
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20"
      id="modalWrapper"
      onClick={handleOutsideClick}
    >
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-5 bg-white rounded-lg shadow-lg space-y-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-700 text-3xl md:text-4xl px-2 md:px-4"
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

        <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-600 mb-4" style={{marginBottom:"2rem",marginTop:"1px"}}>
          Welcome to PrepPal! 👋
        </h3>
       
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <input type="checkbox" className="mr-2"  checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}/>
              Remember Me
            </label>
            <a href="#" className="text-sm text-cyan-600 hover:underline" onClick={onForgotPassword}>
              Forgot Password?
            </a>
          </div>
          {
                    showLoader == true ?
                    <div className="flex items-center justify-center h-full">
                    <Loader /> 
                  </div> :
                      (
          <button
            type="submit"
            className={`w-full text-white ${logoBtnColor} font-medium px-4 py-2 rounded`}
          >
            Sign In
          </button>
                      )}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button type="button" onClick={onSwitchToSignUp} className="font-bold text-cyan-600 hover:underline">
              Create an account
            </button>
          </p>
        </form>
        {snackbar.message && (
          <Snackbar message={snackbar.message} type={snackbar.type} onClose={handleSnackbarClose}/>
        )}
      </div>
    </div>
  );
};

export default SignIn;
