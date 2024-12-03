"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaArrowLeft } from 'react-icons/fa';
import { DemoBanner } from "@/components/DemoBanner";
import axios from 'axios';
import { McqQuestion, McqTestQuestion, UserPracticePaper } from "@/types/type";
import CustomCardLoader from "@/components/CustomCardLoader";
import ResultPage from "../result-screen/page";
import SubmitPopup, { SubmitPopupProps } from "@/components/PopupModal/SubmitPopup";
import Timer from "@/components/Timer";
import { getTotalSeconds,  setYourQuestions, yourQuestions    } from "@/data/functions";
import Statics from "./Statics";
import { logoBtnColor } from "@/data/data";
import Loader from "@/components/Loader";
import { Banner } from '@/components/Banner';
import { setUserProfile, userProfile } from '@/data/functions';
import dynamic from 'next/dynamic';

const Latex = dynamic(() => import('react-latex-next'), { ssr: false });
const PracticeScreen = () => {
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const[loaderShow, setLoaderShow] = useState<boolean>(false);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [qsnChange, setQsnChange] = useState(-1);
  const [userPracticePaper, setUserPracticePaper] = useState<UserPracticePaper[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const[resultScreen, setResultScreen] = useState<boolean>(false);
  const[isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const[totalSeconds, setTotalSeconds] = useState(0);
  const[totalMinutes, setTotalMinutes] = useState(0);
  const[totalHours, setTotalHours] = useState(0);
  const[alreadySaveCall, setAlreadySaveCall] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState();

  const[submitPopupValue, setsubmitPopupValue] = useState<SubmitPopupProps>({
    title:"Assessment Score",
    subTitle:"subTitle",
    message:"",
    setIsModalOpen:setIsModalOpen,
    total:0,
    atemmpt:0,
    correct:0,
    incorrect:0,
    loaderShow:false,
    submitAssessmentId:''
  })
    
  const [id, setId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let paperValue = params.get('paper');
    const idValue = params.get('id');

    if (paperValue) {
      paperValue =  paperValue.split("--").join(" ") 
      setYourQuestions(paperValue);
      setsubmitPopupValue(prev=>({
        ...prev,
        subTitle:String(paperValue)
      }))
    }
    if (idValue) {
      setId(idValue);
      getPracticePaper(idValue)
    }
  }, []);
  
  const getPracticePaper = async (id:string) => {
    try { 
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/startassesment/${id}`);
      setQuestions(response?.data?.questions);
      setLoading(false);
      const initialPracticePaper = response?.data?.questions.map((q: McqTestQuestion) => ({
        McqQuestion: q,
        userSelectAns: '',
        submitTimeInSeconds:null 
      }));
      setUserPracticePaper(initialPracticePaper);
    } catch (error) {
      console.error("Error fetching questions:", error);
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

  const submitPaper = async()=>{
    if(alreadySaveCall){
      return;
    }
    setAlreadySaveCall(true);
    setSubmitLoading(true);

    try { 
      const totalSubmitTime = getTotalSubmitTime();
      const userId = userProfile?._id ?? null; 
    
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/assessments`, {
        userId:userId,
        questions:userPracticePaper,
        totalSubmitTime:totalSubmitTime,
        paperTitle:yourQuestions
      });

      setSubmitLoading(false);
      showModal(data._id);
   
    } catch (error) {
      console.log(error);
      setAlreadySaveCall(false);
    }

   }
   

  const showModal=(id:string):void=>{
    const total = userPracticePaper.length;
    let totalAttempt = 0;
    let correct = 0;
    
    for(let i=0;i<userPracticePaper.length; i++){
      if(userPracticePaper[i]?.userSelectAns != ""){
        totalAttempt++;
        if(userPracticePaper[i]?.McqQuestion?.answer == userPracticePaper[i]?.userSelectAns){
          correct++;
        }
      }
    }

    const incorrect = totalAttempt-correct;

    setsubmitPopupValue(prev=>({
      ...prev,
      total:total,
      atemmpt:totalAttempt,
      correct:correct,
      incorrect:totalAttempt-correct,
      submitAssessmentId:id
    }))
     
    setIsModalOpen(true);
  }

  
  
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
    if(index < userPracticePaper.length-1){
      setIndex(index + 1);
    }
      setQsnChange(qsnChange+1);
  };

  const handleCheckboxChange = ( event: React.ChangeEvent<HTMLInputElement>, idx:number) => {
    const value = event?.target.value;

    const newPracticePaper = [...userPracticePaper];
    const currentQuestion = newPracticePaper[index];

    if(currentQuestion){
      if (currentQuestion?.userSelectAns === idx) {
        currentQuestion.userSelectAns = ''; 
        currentQuestion.userSelectAnsString = ''; 
      } else {
        currentQuestion.userSelectAns = idx;  
        currentQuestion.userSelectAnsString = value;  
      }
    }

  setUserPracticePaper(newPracticePaper);
  };


  const setSubmitTime=(timeInSeconds:number, qsnChange:number,   totalTimeInSeconds:number, totalTimeInMinutes:number, totalTimeInHours:number)=>{
    if(qsnChange == -1){
      return;
    }

    const newPracticePaper = [...userPracticePaper];
    let currentQuestion;
    currentQuestion = newPracticePaper[qsnChange];
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
    setTotalHours(totalHours+totalTimeInHours);
    if(qsnChange === userPracticePaper.length-1){
      submitPaper();
    }
  }

  return (
    <>
    {
        resultScreen === true ?   <ResultPage userPracticePaper={userPracticePaper} />
        :  <div className="flex flex-col min-h-screen bg-white  ">
        {/* <DemoBanner notMainPage={true} /> */}
        <Banner notMainPage={true} loadingUserData={loadingUserData}/>
        <div className="flex flex-col w-100 md:flex-row   overflow-hidden p-2 md:p-8 ">
          {  isModalOpen && 
            <SubmitPopup title={submitPopupValue.title} subTitle={submitPopupValue.subTitle} total={submitPopupValue.total} atemmpt={submitPopupValue.atemmpt} correct={submitPopupValue.correct} incorrect={submitPopupValue.incorrect}  message={submitPopupValue.message} setIsModalOpen={submitPopupValue.setIsModalOpen}  submitAssessmentId={submitPopupValue.submitAssessmentId}
            loaderShow={loaderShow}  
            />
          }

         <div className="flex-1 md:mr-4 space-y-4 overflow-hidden p-2">
            {
              loading ? <CustomCardLoader viewBox={`0 0 380 80`} className={' rounded-lg'} rectW='100%' rectH='68'/> :
                <div className="mb-4 text-sm font-medium bg-gray-100 p-4 rounded-lg shadow ">
                  {
                    questions.length > 0 && index < questions.length &&
                    <h2 className="text-sm text-black questions">
                    <Latex>{`Q${index + 1}. ${questions[index]?.question}`}</Latex>   
                 </h2>
                  }
                  <ul className="mt-1 text-sm text-gray-500 fs-700 font-normal ">
                    {questions.length > 0 && questions[index]?.options.map((option, idx) => (
                      <li key={idx}>
                        <label className="flex items-center mt-1">
                          <input
                            type="checkbox"
                            value={option.optionText}
                            checked={userPracticePaper[index]?.userSelectAns === idx+1}
                            onChange={(e)=>handleCheckboxChange(e,idx+1)}
                            className="mr-2"
                          />
                          <Latex>{option.optionText}</Latex>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
            }
            <div className={`flex ${(loading === true || index === 0 || submitLoading === true ) ? `justify-end` : `justify-between` }`}>
       
           
            <button className={`flex items-center ${(index === 0 || submitLoading === true) ? 'hidden' : ''}`} onClick={prevQuestion} >
                <FaArrowLeft className="mr-2" />
                Back
              </button> 
              {
              loading ? 
              <div className="w-20 h-11" >
              <CustomCardLoader
                viewBox={`0 0 170 100`}
                className={'rounded-lg   h-full w-full'}
                rectW='100%'
                rectH='100'
              />
                </div>
                :
              index < questions.length - 1 ?
                <button className={`text-white   ${logoBtnColor} font-medium px-4 py-2 rounded`} onClick={nextQuestion}>
                  Next
                </button> :

                submitLoading ? <Loader/>
                   :
                   <button className={`text-white   ${logoBtnColor} font-medium px-4 py-2 rounded`} onClick={nextQuestion} disabled={loaderShow}>
                  Submit
                </button>
              }
            </div>
            {
              loading ? <CustomCardLoader viewBox={`0 0 380 80`} className={' rounded-lg'} rectW='100%' rectH='20'/> :
              questions[index]?.showHints > 0 ?
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
                  <p>{questions[index]?.showHints}</p>
                </div>
              </div>

            </div> : null
}
          </div>

          <div className="flex-none md:w-1/3 w-full  pt-4 pl-4 md:pt-1 md:pl-0 ">

            <div className="pb-2">
              <h3 className="text-sm font-medium ">
                Timing
              </h3>

                <Timer   qsnChange={qsnChange} setSubmitTime={setSubmitTime} loading={loading}/>

              <div className='py-2' style={{ borderBottom: '1px solid #E2E2E2' }}></div>
            </div>
            <div className="pt-2">
            <h3 className="text-sm font-medium ">
                Statistics
              </h3>
             
             {
              loading ?  <CustomCardLoader viewBox={`0 0 200 40`} className={'mt-2'} rectW='100%' rectH='40'/>
              :  <Statics minTime={Number(questions[index]?.minTime)  } maxTime={Number(questions[index]?.maxTime)} avgTime={Number(questions[index]?.avgTime)} />
             }
              
            </div>
            <div className='py-2' style={{ borderBottom: '1px solid #E2E2E2' }}></div>
            <div className="py-4" style={{display:"none"}}>
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
