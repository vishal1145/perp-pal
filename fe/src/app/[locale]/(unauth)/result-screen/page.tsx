"use client"; // Ensure the component is a client component
import React, {useEffect, useState} from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"; // Import from chart.js
import { DemoBanner } from "@/components/DemoBanner";
import { UserPracticePaper } from "@/types/type";
// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);


interface ResultPageProps {
  userPracticePaper: UserPracticePaper[];  
}

const ResultPage: React.FC<ResultPageProps> = (props) => {
  // Sample data for the pie chart
 useEffect(()=>{
  console.log(props);
  debugger
 }, [])
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
  const [openIndex, setOpenIndex] = useState(null); // Track the open FAQ index
  const handleFaqToggle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the FAQ
  }
  const faqs = [
    {
      question: "How do I start a practice session?",
      answer: "Learn how to begin your practice session after the paper is generated."
    },
    {
      question: "Can I change the number of questions in a practice paper?",
      answer: "Understand how to modify the number of questions before starting your session."
    },
    {
      question: "How do I navigate between questions during practice?",
      answer: "A guide on moving between questions, flagging questions for review, and submitting answers."
    },
    {
      question: "How is my performance evaluated in real-time?",
      answer: "Find out how results are calculated and displayed immediately after completing the session."
    },
    {
      question: "Can I retake the practice paper to improve my score?",
      answer: "Information on how to retake the same practice paper and track your progress."
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Red", "Blue", "Pink", "Green"];
  const handleCheckboxChange = (event: any) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      // Remove from selected options if already selected
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      // Add to selected options
      setSelectedOptions([...selectedOptions, value]);
    }
  };
  return (
    <>
  <DemoBanner notMainPage={true} />
    <div className="flex flex-col md:flex-row h-screen ">
      {/* Left Side - Pie Chart */}
      <div className="w-full md:w-9/12 p-10 flex  ">
        <div className="w-full">
          <div className=" w-full flex flex-col ">
            {/* Display Percentages Above the Chart */}
            {/* <div className="absolute top-0 flex flex-col items-center">
              <div className="flex space-x-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-green-600">70%</p>
                  <p className="text-sm text-gray-600">High</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-red-600">20%</p>
                  <p className="text-sm text-gray-600">Low</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-blue-600">10%</p>
                  <p className="text-sm text-gray-600">Average</p>
                </div>
              </div>
            </div> */}
            {/* Pie Chart */}
            <div className="flex w-52 h-52">
              <Pie data={data} />
            </div>
          </div>
<div className="mt-5">
          <div className='w-full flex flex-col'>
              <div className="mb-2 ">
                <h2 className="text-sm  font-medium">Q1. What are your favorite colors?</h2>
                <ul className="mt-2 text-sm text-gray-500 font-normal">
                  {options.map((option, index) => (
                    <li key={index} className="mt-1.5">
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
            </div>
            <div className='py-2 mb-4'  style={{borderBottom: '1px solid #E2E2E2'}}></div>
            <div className='w-full flex flex-col'>
              <div className="mb-2 ">
                <h2 className="text-sm  font-medium">Q1. What are your favorite colors?</h2>
                <ul className="mt-2 text-sm text-gray-500 font-normal">
                  {options.map((option, index) => (
                    <li key={index} className="mt-1.5">
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
            </div>
            </div>
        </div>
      </div>
      {/* Right Side - Information */}
      <div className="w-full md:w-3/12 p-6">
        <h2 className="text-sm  font-medium leading-[3.25rem]">Your Next Adapting Path</h2>
        <p className="text-sm  text-gray-500 ">detail</p>
        <div className="mb-4">
        <div className='py-2' style={{borderBottom: '1px solid #E2E2E2'}}></div>
        <h3 className="text-sm  font-medium leading-[3.25rem]">Key Points to Remember</h3>
        <div className="">
<div className="accordion-group h-60  " data-accordion="default-accordion">
  {faqs.map((faq, index) => (
    <div
      key={index}
      className={`accordion faq-border  rounded-xl transition duration-500 ${openIndex === index ? 'accordion-active:bg-indigo-50 accordion-active:border-indigo-600' : ''} mb-2  py-2 pl-2 pr-4`}
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
        <p className='text-sm  text-gray-500 ml-2'>{faq.question}</p>
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






