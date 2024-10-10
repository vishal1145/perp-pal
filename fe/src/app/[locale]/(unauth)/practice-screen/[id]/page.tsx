"use client"; 
import React, { useState ,useRef,useEffect} from "react";
import { DemoBanner } from "@/components/DemoBanner";
import { FaChevronDown, FaChevronUp ,FaArrowLeft} from 'react-icons/fa';
const PracticeScreen = () => {
  const [showHints, setShowHints] = useState(false);
 // const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Specify the type as string[]
 const [selectedOption, setSelectedOption] = useState<string | null>(null); // Track single selected option
  const options = ["Red", "Blue", "Pink", "Green"];

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;

  //   if (selectedOptions.includes(value)) {
  //     // Remove from selected options if already selected
  //     setSelectedOptions(selectedOptions.filter((option) => option !== value));
  //   } else {
  //     // Add to selected options
  //     setSelectedOptions([...selectedOptions, value]);
  //   }
  // };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    

    if (selectedOption === value) {
      setSelectedOption(null); 
    } else {
      setSelectedOption(value);
    }
  };

  const [panelHeight, setPanelHeight] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (panelRef.current) {
      if (showHints) {
        // Set the height to the scroll height to create the slide effect
        setPanelHeight(panelRef.current.scrollHeight);
      } else {
        // Reset the height when hidden
        setPanelHeight(0);
      }
    }
  }, [showHints]);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <DemoBanner notMainPage={true} />
        <div className="flex flex-grow overflow-hidden p-4">
          <div className="flex-1 mr-4 space-y-4 overflow-hidden p-4">
            <div className="mb-4 bg-gray-100 p-4 rounded-lg shadow ">
              <h2 className="text-sm text-black">
                Q1. What are your favorite colors?
              </h2>
              <ul className="mt-2 text-sm text-gray-500 fs-700 font-normal ">
                {options.map((option, index) => (
                  <li key={index} className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value={option}
                        //checked={selectedOptions.includes(option)}
                         checked={selectedOption === option}
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
            <button className="flex items-center">
  <FaArrowLeft className="mr-2" /> 
  Back
</button>

              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded">
                Next
              </button>
            </div>

          

            <div className="mb-4 rounded-lg shadow ">
      {/* Dropdown Button */}
      <button
        onClick={() => setShowHints(!showHints)}
        className="bg-gray-100 text-gray-500 rounded font-normal px-4 py-2  inline-flex justify-between items-center text-sm fs-700 w-full transition-all duration-300 ease-in-out"
      >
        <span>{showHints ? "Hide hints" : "Show hints"}</span>
        {showHints ? (
          <FaChevronUp className="transition-transform duration-300" />
        ) : (
          <FaChevronDown className="transition-transform duration-300" />
        )}
      </button>

      {/* Hints Section */}
      <div
        ref={panelRef}
        className="bg-gray-100 text-gray-500 rounded font-normal overflow-hidden transition-all duration-700 ease-in-out"
        style={{ height: panelHeight }}
      >
        <div className="p-4 text-gray-500">
          <p>Your hints content goes here.</p>
        </div>
      </div>
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
              
              <p className="text-sm text-gray-500 fs-700 font-normal pt-2">Average time</p>
              <p className="text-sm text-gray-500 fs-700 font-normal">Min time</p>
              <p className="text-sm text-gray-500 fs-700 font-normal">Max time</p>
            </div>

            <div className='py-2' style={{ borderBottom: '1px solid #e2e2e2' }}></div>

            <div className="">
              <h3 className="text-sm font-medium ">
                Doubt Buddy Chat Bot
              </h3>
              <p className="text-sm text-gray-500 fs-700 font-normal py-2">Integration / discuss</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PracticeScreen;
