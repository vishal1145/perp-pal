"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaArrowLeft } from 'react-icons/fa';
import { DemoBanner } from "@/components/DemoBanner";
import axios from 'axios';
import { McqQuestion, McqTestQuestion, UserPracticePaper } from "@/types/type";
import CustomCardLoader from "@/components/CustomCardLoader";
// import { useRouter } from 'next/navigation';
import ResultPage from "../result-screen/page";

const PracticeScreen = () => {
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [userPracticePaper, setUserPracticePaper] = useState<UserPracticePaper[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const[resultScreen, setResultScreen] = useState<boolean>(false);
  // const router = useRouter();
  
  const getPracticePaper = async () => {
    try {
      const response = await axios.get(`https://prep-pal.algofolks.com/api/Question`);
      setQuestions(response.data);
      setLoading(false);
      const initialPracticePaper = response.data.map((q: McqTestQuestion) => ({
        McqQuestion: q,
        userSelectAns: ''
      }));
      setUserPracticePaper(initialPracticePaper);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const newPage = () => {
    console.log(userPracticePaper);
    setResultScreen(true);
    // router.push(`/result-screen`);
  };

  useEffect(() => {
    getPracticePaper();
  }, []);

  useEffect(() => {
    if (panelRef.current) {
      setPanelHeight(showHints ? panelRef.current.scrollHeight : 0);
    }
  }, [showHints]);

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
    const newPracticePaper = [...userPracticePaper];
    const currentQuestion = newPracticePaper[index];

    if(currentQuestion){
      if (currentQuestion?.userSelectAns === value) {
        currentQuestion.userSelectAns = ''; 
      } else {
        currentQuestion.userSelectAns = value;  
      }
    }

  setUserPracticePaper(newPracticePaper);

  };

  return (
    <>
    {

      resultScreen === true ?   <ResultPage userPracticePaper={userPracticePaper} />
        :   <div className="flex flex-col min-h-screen bg-white">
        <DemoBanner notMainPage={true} />
        <div className="flex flex-grow overflow-hidden p-4">
          <div className="flex-1 mr-4 space-y-4 overflow-hidden p-4">
            {
              loading ? <CustomCardLoader /> :
                <div className="mb-4 text-sm font-medium bg-gray-100 p-4 rounded-lg shadow ">
                  {
                    questions.length > 0 &&
                    <h2 className="text-sm text-black">
                      {`Q${index + 1}. ${questions[index]?.question}`}
                    </h2>
                  }
                  <ul className="mt-1 text-sm text-gray-500 fs-700 font-normal ">
                    {questions.length > 0 && questions[index]?.options.map((option, idx) => (
                      <li key={idx}>
                        <label className="flex items-center mt-1">
                          <input
                            type="checkbox"
                            value={option.optionText}
                            checked={userPracticePaper[index]?.userSelectAns === option.optionText}
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
              {index > 0 && <button className="flex items-center" onClick={prevQuestion}>
                <FaArrowLeft className="mr-2" />
                Back
              </button>}
              {index < questions.length - 1 ?
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded" onClick={nextQuestion}>
                  Next
                </button> :
                index === questions.length - 1 ?
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded" onClick={newPage}>
                    Submit
                  </button> : null
              }
            </div>
            <div className="mb-4 rounded-lg shadow ">
              <button
                onClick={() => setShowHints(!showHints)}
                className="bg-gray-100 rounded font-normal px-4 py-2 inline-flex justify-between items-center text-sm fs-700 w-full transition-all duration-300 ease-in-out"
              >
                <span className="text-sm font-medium text-black">{showHints ? "Hide hints" : "Show hints"}</span>
                {showHints ? (
                  <FaChevronUp className="transition-transform duration-300" />
                ) : (
                  <FaChevronDown className="transition-transform duration-300" />
                )}
              </button>
              <div
                ref={panelRef}
                className="bg-gray-100 text-gray-500 rounded font-normal overflow-hidden transition-all duration-700 ease-in-out"
                style={{ height: panelHeight }}
              >
                <div className="px-4 pb-2 text-sm text-gray-500">
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
              <div className='py-2' style={{ borderBottom: '1px solid #E2E2E2' }}></div>
            </div>
            <div className="">
              <h3 className="text-sm font-medium ">
                Statistics
              </h3>
              <p className="text-sm text-gray-500 fs-700 font-normal pt-2">Average time</p>
              <p className="text-sm text-gray-500 fs-700 font-normal">Min time</p>
              <p className="text-sm text-gray-500 fs-700 font-normal">Max time</p>
            </div>
            <div className='py-2' style={{ borderBottom: '1px solid #E2E2E2' }}></div>
            <div className="">
              <h3 className="text-sm font-medium ">
                Doubt Buddy Chat Bot
              </h3>
              <p className="text-sm text-gray-500 fs-700 font-normal py-2">Integration / discuss</p>
            </div>
          </div>
        </div>
      </div>
    }
    
    </>
  );
};

export default PracticeScreen;