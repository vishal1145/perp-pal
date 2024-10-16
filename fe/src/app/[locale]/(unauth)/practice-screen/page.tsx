"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaArrowLeft } from 'react-icons/fa';
import { DemoBanner } from "@/components/DemoBanner";
import axios from 'axios';
import { McqQuestion, McqTestQuestion, UserPracticePaper } from "@/types/type";
import CustomCardLoader from "@/components/CustomCardLoader";
import { useRouter } from 'next/navigation';
import ResultPage from "../result-screen/page";
import SubmitPopup from "@/components/PopupModal/SubmitPopup";
import Timer from "@/components/Timer";
import { getTotalSeconds, makeDate } from "@/data/functions";

const PracticeScreen = () => {
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState(true);
  const[loaderShow, setLoaderShow] = useState<boolean>(false);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [qsnChange, setQsnChange] = useState(1);
  const [userPracticePaper, setUserPracticePaper] = useState<UserPracticePaper[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const[resultScreen, setResultScreen] = useState<boolean>(false);
  const[isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const[totalSeconds, setTotalSeconds] = useState(0);
  const[totalMinutes, setTotalMinutes] = useState(0);
  const[totalHours, setTotalHours] = useState(0);
  const[alreadySaveCall, setAlreadySaveCall] = useState(false);
  const router = useRouter();
  
  const getPracticePaper = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/questions`);
      setQuestions(response.data);
      setLoading(false);
      const initialPracticePaper = response.data.map((q: McqTestQuestion) => ({
        McqQuestion: q,
        userSelectAns: '',
        submitTimeInSeconds:null 
      }));
      setUserPracticePaper(initialPracticePaper);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const getTotalSubmitTime = ():number=>{
      let totalSec = totalSeconds % 60;
      let extraMin = totalSec / 60;

      let totalMin = totalMinutes % 60;
      let extraHours = totalMinutes / 60;
     
      let totalHr = totalHours + extraHours;
      totalMin += extraMin;
      
      const totalTimeInSeconds = getTotalSeconds(totalSec, totalMin, totalHr);
      return totalTimeInSeconds;
  }

   const save = async()=>{
    if(alreadySaveCall){
      return;
    }
    setAlreadySaveCall(true);

    try { 
      const totalSubmitTime = getTotalSubmitTime();
      await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/assessment`, {
        userId:"uyg34b43nbh43r34nb4rb3br",
        questions:userPracticePaper,
        totalSubmitTime:totalSubmitTime
      });
      setLoaderShow(false);
      router.push(`/result-screen`);
      setResultScreen(true);
    } catch (error) {
      console.log(error);
      setAlreadySaveCall(false);
    }

   }

  const newPage = () => {
    console.log(userPracticePaper);
    setQsnChange(qsnChange+1);
    setIsModalOpen(true);
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
      setQsnChange(qsnChange-1);
    }
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setQsnChange(qsnChange+1);
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

  const setSubmitTime=(timeInSeconds:number,   totalTimeInSeconds:number, totalTimeInMinutes:number, totalTimeInHours:number)=>{
    const newPracticePaper = [...userPracticePaper];
    let currentQuestion;
    currentQuestion = newPracticePaper[index];
    if(currentQuestion){
      if(currentQuestion?.submitTimeInSeconds){
      }else{
          currentQuestion.submitTimeInSeconds = timeInSeconds; 
       }
    }

    setUserPracticePaper(newPracticePaper);
     
    //total Time 
    setTotalSeconds(totalSeconds+totalTimeInSeconds);
    setTotalMinutes(totalMinutes+totalTimeInMinutes);
    setTotalHours(totalMinutes+totalTimeInMinutes);
  }

  return (
    <>
    {
        resultScreen === true ?   <ResultPage userPracticePaper={userPracticePaper} />
        :  <div className="flex flex-col min-h-screen bg-white px-2 md:px-4">
        <DemoBanner notMainPage={true} />
        <div className="flex flex-col md:flex-row   overflow-hidden p-2 md:p-4">


          {  isModalOpen && 
            <SubmitPopup title="Assessment" message="Are you sure you want to submit the exam"  setIsModalOpen={setIsModalOpen} submitBtn="Submit" submitFn={save} 
            loaderShow={loaderShow}  
            />
          }
         <div className="flex-1 md:mr-4 space-y-4 overflow-hidden p-2">

            {
              loading ? <CustomCardLoader viewBox={`0 0 380 80`} className={' rounded-lg'} rectW='100%' rectH='68'/> :
                <div className="mb-4 text-sm font-medium bg-gray-100 p-4 rounded-lg shadow ">
                  {
                    questions.length > 0 && index < questions.length &&
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
            <div className={`flex ${index == 0 ? `justify-end` : `justify-between` }`}>
             <button className={`flex items-center ${index == 0 ? 'hidden' : ''}`} onClick={prevQuestion} >
                <FaArrowLeft className="mr-2" />
                Back
              </button> 
              {index < questions.length - 1 ?
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded" onClick={nextQuestion}>
                  Next
                </button> :
                index === questions.length - 1 ?
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium px-4 py-2 rounded" onClick={newPage} disabled={loaderShow}>
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
          <div className="flex-none md:w-1/3 w-full  p-1 ">

            <div className="">
              <h3 className="text-sm font-medium ">
                Timer
              </h3>

              {
                loading === false && 
                <Timer   qsnChange={qsnChange} setSubmitTime={setSubmitTime}/>
              }

              <div className='py-2' style={{ borderBottom: '1px solid #E2E2E2' }}></div>
            </div>
            <div className="pt-4">
              <h3 className="text-sm font-medium ">
                Statistics
              </h3>
              <p className="text-sm text-gray-500 fs-700 font-normal pt-2">Average time</p>
              <p className="text-sm text-gray-500 fs-700 font-normal">Min time</p>
              <p className="text-sm text-gray-500 fs-700 font-normal">Max time</p>
            </div>
            <div className='py-2' style={{ borderBottom: '1px solid #E2E2E2' }}></div>
            <div className="py-4">
              <h3 className="text-sm font-medium ">
                Prepal Chat Bot
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