"use client"; 
import React, { useState } from "react";
import { DemoBanner } from "@/components/DemoBanner";

const PracticeScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Specify the type as string[]

  const options = ["Red", "Blue", "Pink", "Green"];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (selectedOptions.includes(value)) {
      // Remove from selected options if already selected
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      // Add to selected options
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <DemoBanner notMainPage={true} />
        <div className="flex flex-grow overflow-hidden p-4">
          <div className="flex-1 mr-4 space-y-4 overflow-hidden p-4">
            <div className="mb-4 bg-gray-100 p-4">
              <h2 className="text-sm text-gray-500">
                Q1. What are your favorite colors?
              </h2>
              <ul className="mt-2 text-sm text-gray-500 fs-700 font-normal">
                {options.map((option, index) => (
                  <li key={index}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded">
                Back
              </button>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded">
                Next
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow text-sm text-gray-500 fs-700 font-normal">
              <p>show hints</p>
            </div>
          </div>
          <div className="w-1/3 space-y-4 overflow-hidden p-4">
            <div className="">
              <h3 className="text-sm font-medium ">
                Timer
              </h3>
              <div className='py-2' style={{ borderBottom: '1px solid #e2e2e2' }}></div>
            </div>

            <div className="">
              <h3 className="text-sm font-medium ">
                Statistics
              </h3>
              <div className='py-2' style={{ borderBottom: '1px solid #e2e2e2' }}></div>
              <p className="text-sm text-gray-500 fs-700 font-normal py-2">Average time</p>
              <p className="text-sm text-gray-500 fs-700 font-normal">Min time</p>
              <p className="text-sm text-gray-500 fs-700 font-normal">Max time</p>
            </div>

            <div className="">
              <h3 className="text-sm font-medium ">
                Doubt Buddy Chat Bot
              </h3>
              <div className='py-2' style={{ borderBottom: '1px solid #e2e2e2' }}></div>
              <p className="text-sm text-gray-500 fs-700 font-normal py-2">Integration / discuss</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PracticeScreen;
