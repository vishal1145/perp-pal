"use client"; // Ensure the component is a client component
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"; // Import from chart.js
import { DemoBanner } from "@/components/DemoBanner";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { SubmitAssessment } from "@/types/type";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const ResultPage  = ( ) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const[submitAssessment, setSubmitAssessment] = useState<SubmitAssessment[]>([]);
  const getSubmitAsseessment = async()=>{
      try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/assessment/${id}`)
        setSubmitAssessment(data?.questions);
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
     getSubmitAsseessment();
  }, []);

  const data = {
    labels: ["High", "Low", "Average"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
        hoverBackgroundColor: ["#66BB6A", "#EF5350", "#42A5F5"],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // This will hide the legend
      },
    },
  };
  const [openIndex, setOpenIndex] = useState(null); // Track the open FAQ index

  const handleFaqToggle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the FAQ
  };

  const faqs = [
    {
      question: "How do I start a practice session?",
      answer: "Learn how to begin your practice session after the paper is generated.",
    },
    {
      question: "Can I change the number of questions in a practice paper?",
      answer: "Understand how to modify the number of questions before starting your session.",
    },
    {
      question: "How do I navigate between questions during practice?",
      answer: "A guide on moving between questions, flagging questions for review, and submitting answers.",
    },
    {
      question: "How is my performance evaluated in real-time?",
      answer: "Find out how results are calculated and displayed immediately after completing the session.",
    },
    {
      question: "Can I retake the practice paper to improve my score?",
      answer: "Information on how to retake the same practice paper and track your progress.",
    },
  ];
 
  return (
    <>
      <DemoBanner notMainPage={true} />
     
   
      <div className="flex flex-col md:flex-row h-screen ">

        {/* Left Side - Pie Chart */}
        <div className="w-full md:w-9/12 p-10 flex ">
        
          <div className="w-full">
          <div className="">
      <div className='text-md font-medium'>Your Questions</div>
      <div className='text-gray-500 font-sm text-md'>{"formattedText"}</div>
      </div>
      <div className="py-2 mb-4" style={{ borderBottom: "1px solid #E2E2E2" }}></div>
            <div className="w-full flex flex-col ">
              {/* Pie Chart */}
              <div className="flex w-52 h-52">
                <Pie data={data} options={options}/>
              </div>
            </div>
            <div className="mt-5">
              {submitAssessment.map((item, index) => {
                const question = item.questionId;
                const userSelectAns = item.userSelectAns; // Accessing the user's selected answer
                const correctAnswer = question.correctAnswer; // Accessing the correct answer

                return (
                  <div key={question.questionId} className="w-full flex flex-col mb-4">
                    <div className="mb-2">
                      <h2 className="text-sm font-medium"> 
                        Q{index + 1}. {question.question}
                      </h2>
                      <ul className="mt-2 text-sm text-gray-500 font-normal">
                        {question.options.map((option, idx) => {
                         
                          const isUserSelected = userSelectAns === option.optionText;
                          const isCorrect = option.optionText === correctAnswer;
                          const notSelected = userSelectAns === ''; 
                       
                          let bgColor = "";
                          if (isUserSelected && isCorrect) {
                            bgColor = "bg-green-500"; 
                          } else if (isUserSelected && !isCorrect) {
                            bgColor = "bg-red-300"; 
                          } else if (isCorrect) {
                            bgColor = "bg-green-300"; 
                          }else if (notSelected) {
                            bgColor = "bg-gray-200"; 
                        }

                          return (
                            <li key={idx} className={`mt-1.5 flex items-center ${bgColor} p-2 rounded`}>
                              
                              <span className="mr-2 font-normal">{option.optionFlag}.</span>
                              <span>{option.optionText}</span>
                              
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="py-2 mb-4" style={{ borderBottom: "1px solid #E2E2E2" }}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Right Side - Information */}
        <div className="w-full md:w-3/12 p-6">
          <h2 className="text-sm  font-medium leading-[3.25rem]">Your Next Adapting Path</h2>
          <p className="text-sm  text-gray-500 ">detail</p>
          <div className="mb-4">
            <div className="py-2" style={{ borderBottom: "1px solid #E2E2E2" }}></div>
            <h3 className="text-sm  font-medium leading-[3.25rem]">Key Points to Remember</h3>
            <div className="">
              <div className="accordion-group h-60  " data-accordion="default-accordion">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`accordion faq-border  rounded-xl transition duration-500 ${openIndex === index ? "accordion-active:bg-indigo-50 accordion-active:border-indigo-600" : ""
                      } mb-2  py-2 pl-2 pr-4`}
                  >
                    <button
                      className="accordion-toggle group inline-flex items-center   text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
                      onClick={() => handleFaqToggle(index)}
                    >
                      {openIndex === index ? (
                        <svg
                          className="w-6 h-6 text-gray-900 transition duration-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12H18"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-gray-900 transition duration-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12H18M12 18V6"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      <p className="text-sm  text-gray-500 ml-2">{faq.question}</p>
                    </button>
                    {openIndex === index && (
                      <div
                        className="accordion-content w-full overflow-hidden pr-4"
                        style={{ maxHeight: 250 }}
                      >
                        <p className="text-sm   text-gray-500 fs-700 font-normal leading-6">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
