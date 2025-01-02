'use client';
import React from "react";
import Button from "../Button/page";


import CheckIcon  from '../../../../../public/svgs/checkmark.svg';

const Confirmation = () => {
  return (
    <div className="min-h-screen relative">
     
      <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-50"></div>

      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl text-center z-10">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center">
            
              <CheckIcon width={32} height={32} strokeWidth={2} className="text-cyan-500 "/>
            
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

        <div className="mt-8">
        <Button 
            label="Go To Dashboard" 
            
          />
      
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
