"use client"; 
import React, { useState ,useRef,useEffect} from "react";
import { FaChevronDown, FaChevronUp ,FaArrowLeft} from 'react-icons/fa';
import { DemoBanner } from "@/components/DemoBanner";
import axios from 'axios';
import { McqTestQuestion } from "@/types/type";
import CustomCardLoader from "@/components/CustomCardLoader";
import { useRouter } from 'next/navigation';
const PracticeScreen = () => {
  const [showHints, setShowHints] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<McqTestQuestion[]>([]);
  const [index, setIndex] = useState(0);

  const getPracticePaper = async () => {
    try {
      const response = await axios.get(`https://prep-pal.algofolks.com/api/Question`);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };
  const [panelHeight, setPanelHeight] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const newPage = ()=>{
    router.push(`/result-screen`);
  }
    
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

  useEffect(() => {
    getPracticePaper();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setSelectedOptions([]);
    }
  }, [index, questions]);

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOptions((prev) => 
      prev.includes(value) ? prev.filter(option => option !== value) : [value]
    );
  };

 

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <DemoBanner notMainPage={true} />
        <div className="flex flex-grow overflow-hidden p-4">
          <div className="flex-1 mr-4 space-y-4 overflow-hidden p-4">
            {
              loading ? <CustomCardLoader/> :

            <div className="mb-4 text-sm font-medium bg-gray-100 p-4 rounded-lg shadow ">
            {
              questions.length > 0 &&
              <h2 className="text-sm text-black">
             {`Q${index+1}. ${questions[index].question}`}
              </h2>
            }  
              <ul className="mt-1 text-sm text-gray-500 fs-700 font-normal ">
              {questions.length > 0 &&  questions[index].options.map((option, idx) => (
                    <li key={idx}>
                      <label className="flex items-center mt-1">
                        <input
                          type="checkbox"
                          value={option.optionText}  
                          checked={selectedOptions.includes(option.optionText)}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        {option.optionText} 
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
}
            <div className="flex justify-between">
              {
                index > 0 &&  <button className="flex items-center" onClick={prevQuestion}>
                <FaArrowLeft className="mr-2" /> 
                Back
              </button>
              }
           
               {
                index < questions.length-1 ? 
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded" onClick={nextQuestion}>
                Next
              </button> :

              index ==questions.length-1 ?
                 <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded" onClick={newPage}>
                 Submit
               </button>:null
               }
        
            </div>

          

            <div className="mb-4 rounded-lg shadow ">
      {/* Dropdown Button */}
      <button
        onClick={() => setShowHints(!showHints)}
        className="bg-gray-100   rounded font-normal px-4 py-2  inline-flex justify-between items-center text-sm fs-700 w-full transition-all duration-300 ease-in-out"
      >
        <span className="text-sm font-medium text-black">{showHints ? "Hide hints" : "Show hints"}</span>
        {showHints ? (
          <FaChevronUp className="transition-transform duration-300" />
        ) : (
          <FaChevronDown className="transition-transform duration-300" />
        )}
      </button>

      {/* Hints Section */}
      <div
        ref={panelRef}
        className="bg-gray-100 text-gray-500  rounded font-normal overflow-hidden transition-all duration-700 ease-in-out"
        style={{ height: panelHeight }}
      >
        <div className="px-4 pb-4 text-sm text-gray-500  ">
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
