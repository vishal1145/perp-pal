'use client';
import React from "react";

const Confirmation = () => {
  return (
    <div className="min-h-screen flex flex-col">
  
      <div className="bg-cyan-50 w-full py-4 h-full">
        <div className="text-center">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto ">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-8 h-8 text-cyan-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

           
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Yay! Class Confirmed! 🎉
            </h1>
            <p className="text-gray-600 mb-2">
              Your teacher will be waiting for you to start your creative journey.
            </p>
            <p className="text-cyan-500 font-bold text-lg">
              12th December, Thursday
            </p>
            <p className="text-gray-600 font-medium">2:00 PM - 3:00 PM</p>
          </div>
        </div>
      </div>

  
     

      <div className="flex-grow bg-white py-8">
        <div className="max-w-4xl mx-auto text-center">
        
          <button className="bg-cyan-500 text-white px-12 py-3 rounded-lg shadow-md font-medium hover:bg-cyan-600">
            Go To Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;