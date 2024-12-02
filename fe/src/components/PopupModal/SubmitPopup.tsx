"use client";
import React from "react";
import AssessmentCard from "./AssessmentCard";
import { logoBtnColor, text1, text2 } from "@/data/data";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export type SubmitPopupProps = {
  title: string;
  subTitle: string;
  message: string;
  setIsModalOpen: (open: boolean) => void;
  loaderShow: boolean;
  total: number;
  atemmpt: number;
  correct: number;
  incorrect: number;
  submitAssessmentId: string;
};

const SubmitPopup: React.FC<SubmitPopupProps> = ({
  title,
  subTitle,
  message,
  setIsModalOpen,
  loaderShow,
  total,
  atemmpt,
  correct,
  incorrect,
  submitAssessmentId,
}) => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      const formattedText = searchText.trim().replace(/\s+/g, "-"); // Format the text
      router.push(`/e-paper/${formattedText}`); // Navigate to the formatted URL
    }
  };

  const handleStartPracticeClick = () => {
    const formattedText = searchText.trim().replace(/\s+/g, "--");
    console.log("Formatted URL:", `/e-paper/${formattedText}`);
    router.push(`/e-paper/${formattedText}`);
  };

  const resultPage = () => {
    router.push(`/result-screen?id=${encodeURIComponent(submitAssessmentId)}`);
  };

  const handleMicClick = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      let timeoutId: NodeJS.Timeout;

      recognition.start();

      recognition.onresult = (event: any) => {
        const results = event.results;
        const transcript = results[results.length - 1][0].transcript; // Get the latest result
        setSearchText(transcript);

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          recognition.stop();
        }, 2000);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        console.log("Speech recognition service disconnected");
        clearTimeout(timeoutId);
      };
    } else {
      alert("Your browser does not support speech recognition.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="fixed left-0 top-0 z-[80] flex size-full items-center justify-center overflow-hidden bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="modal-label"
      tabIndex={-1}
    >
      <div className="m-2 lg:w-[40%]">
        <div className="flex flex-col rounded-xl border bg-white p-3 shadow-lg">
          <div className="flex flex-col">
            <div id="modal-label" className="text-sm font-medium text-black">
              {title}
            </div>
            <div className={`${text2} mt-1 text-left`}>{subTitle}</div>
          </div>

          <div className="mt-2">
            <div className="flex justify-between gap-4">
              <div className="w-full">
                <AssessmentCard title="Total" value={String(total)} />
              </div>

              <div className="w-full">
                <AssessmentCard title="Attempted" value={String(atemmpt)} />
              </div>

              <div className="w-full">
                <AssessmentCard
                  title="Correct / Incorrect"
                  value={`${String(correct)} / ${String(incorrect)}`}
                />
              </div>
            </div>

            {/* <div className="mt-4 block sm:hidden" style={{ width: "48%" }}>
              <AssessmentCard
                title="Correct / Incorrect"
                value={`${String(correct)} / ${String(incorrect)}`}
              />
            </div> */}

            <div className="mb-1 mt-4 flex gap-2">
              <div
                className={`${text2} cursor-pointer hover:text-gray-700`}
                onClick={resultPage}
              >
                View Detail Summary
              </div>

              <svg
                className="h-6 w-4 text-gray-800 dark:text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </div>

            <div className="flex items-center  ">
              <div className={`${text2} flex-grow border-t`} />
              <span className={`${text1} mx-4`}>OR</span>
              <div className={`${text2} flex-grow border-t`} />
            </div>

            <div className={`${text2} mt-2`}>
              <div>
                <b> Don't let your last attempt discourage you!</b>
                <p className="">
                  It’s perfectly normal to face challenges while studying.
                  Remember, every question is an opportunity to learn and
                  improve!
                </p>
              </div>
              <div className="mt-3">
                <b>Ready to tackle more?</b>
                <p className="">
                  Generate a new MCQ-based test on Life Processes for Class 10
                  Biology and sharpen your skills. Each practice session brings
                  you one step closer to mastery.
                </p>
              </div>

              <div className="mt-2">
                <b> Click below to start your next practice test!</b>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStartPracticeClick();
              }}
            >
              <div
                className="col-span-8 lg:col-span-6 relative flex items-center mt-4"
                id="div2"
              >
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <FaSearch className="text-gray-400" />
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type a text to generate practice questions."
                  className="bg-gray-100 w-full pl-10 pr-10 h-8 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  value={searchText}
                  required
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <span className="absolute inset-y-0 right-3 flex items-center">
                  <FaMicrophone
                    className="text-gray-400 cursor-pointer"
                    onClick={handleMicClick}
                  />
                </span>
              </div>
              <button
                type="submit"
                className={`text-white ${logoBtnColor} w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4`}
              >
                Start Practice
              </button>
            </form>

            {/* <button
        type="button"
        className="border border-gray-500  bg-transparent cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none hover:bg-gray-200 w-full"
        style={{
          border:"1px solid rgb(226, 226, 226)",
          color:"rgb(107 114 128)"
        }}
      >
        Home     
      </button> */}
          </div>
          {/* <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
               
               {
                
                loaderShow === false && 
                <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                style={{
                border:"1px solid rgb(226, 226, 226)",
                color:"rgb(107 114 128)"
                 }} 
                 onClick={closeModal}
              >
                Close
              </button>

               }
               
             



                {
                  loaderShow === true ?
                  (
                  <Loader/>
                  ):(
                    <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 hover:bg-blue-700 focus:outline-none"
                    onClick={submitFn}
                  >
                    {submitBtn}
                  </button>
                  )
                }
               
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default SubmitPopup;
