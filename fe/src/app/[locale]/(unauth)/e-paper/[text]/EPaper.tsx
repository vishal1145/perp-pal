"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Banner } from "@/components/Banner";
import CustomCardLoader from "@/components/CustomCardLoader";
import Faq from "@/components/FAQ/Faq";
import Loader from "@/components/Loader";
import QuestionOptions from "@/components/QuestionOptions";
import { logoBtnColor } from "@/data/data";
import { 
  freePrompt,
  setFreePrompt,
  userProfile, 
} from "@/data/functions";
import type { McqQuestion } from "@/types/type";
import SharePreppal from "@/components/SharePreppal";

const EPaper: React.FC = () => {
  const [questionloading, setQuestionLoading] = useState(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [formattedText, setFormattedText] = useState<string>("");
  const [alreadyCall, setAlreadyCall] = useState<boolean>(false);
  const [loadingUserData, setLoadingUserData] = useState();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setFreePrompt()
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getQuestions = async (text: string) => {
    setQuestionLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/get/questions`,
        { prompt: text }
      );
      const mcqQuestions = data.filter(item => 
        item.questionType === "Single Choice" && 
        Object.values(item.options).every(option => option.value !== null)
      );
      setQuestions(mcqQuestions);
      setQuestionLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    
    if (typeof window !== "undefined") {
      let text = window.location?.pathname.split("/").pop();
      text = text?.split("--").join(" ");
      if (text) {
        setFormattedText(text);
        getQuestions(text);

        const titleElement = document.getElementById(
          "nextjs-tile"
        ) as HTMLTitleElement;
        if (titleElement) {
          titleElement.textContent = `${text} | Create and practice online papers`;
        }
      }
    }
  }, []);

  const router = useRouter();
  const handlePracticeClick = async () => {
    
    const storedPrompt = localStorage.getItem('promptdate');
    const prompt = storedPrompt ? JSON.parse(storedPrompt) : { date: Date.now(), count: 1 };
    
    prompt.count -= 1;
    prompt.date = Date.now();  
    
    localStorage.setItem('promptdate', JSON.stringify(prompt));

    if (alreadyCall) {
      return;
    }

    setAlreadyCall(true);
    try {
      setShowLoader(true);

      const userId = userProfile?._id ?? null;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/questions`,
         {questions, userId:userId}
      );
 
      const saveStartAssesmentId = response.data?.saveStartAssesment._id; 
      const text = formattedText.trim().replace(/\s+/g, "--");
      router.push(
        `/practice-screen?paper=${
          text
        }&id=${saveStartAssesmentId}`
      );
    } catch (error) {
      console.error("Error generating practice:", error);
      setAlreadyCall(false);
    }
  };

  return (
    <>
    <Banner notMainPage={true} loadingUserData={loadingUserData} />
   { freePrompt == false?  
    <SharePreppal setSharePreppal={() => {
      router.push('/');
    }}/>
    :
    <div className=" p-4   md:p-8">
      <div id="e-paper" className="min-h-screen">
        <div
          id="maidiv"
          className="practixe-main grid grid-cols-1 gap-4 sm:grid-cols-12"
        >
          <div className="col-span-12 bg-white sm:col-span-9 md:col-span-9 lg:col-span-9">
            <div className="relative flex justify-between">
              {questionloading === false ? (
                <>
                  <div id="qsn-text-main-id" className="mt-1 md:mt-0">
                    <div className="text-md font-medium">Your Questions</div>
                    <div className="font-sm text-md mt-4 h-auto  max-w-full break-words pr-2 text-gray-500 md:mt-0">
                      {formattedText}
                    </div>
                  </div>

                  {showLoader === true ? (
                    <Loader />
                  ) : (
                    <div className="h-100  absolute right-0 -mt-[5px] md:static md:mt-0">
                      <button
                        type="button"
                        className="mb-2 me-2 h-[42px] w-[132px] cursor-pointer rounded-lg border border-gray-500 bg-transparent px-5 py-2.5 text-sm font-medium hover:bg-gray-200 focus:outline-none "
                        onClick={handlePracticeClick}
                        style={{
                          border: "1px solid rgb(226, 226, 226)",
                          color: "rgb(107 114 128)",
                        }}
                      >
                        Start Practice
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="flex w-full"
                  style={{ height: isMobile ? "50px" : "80px" }}
                >
                  <div style={{ width: isMobile ? "70%" : "77%" }}>
                    <div
                      className="h-4"
                      style={{ width: isMobile ? "60%" : "30%" }}
                    >
                      <CustomCardLoader
                        viewBox={`0 0 380 45`}
                        className="rounded-lg"
                        rectW="100%"
                        rectH={isMobile ? "130" : "40"}
                      />
                    </div>

                    <div
                      style={{
                        width: isMobile ? "100%" : "95%",
                        marginTop: "20px",
                      }}
                    >
                      <CustomCardLoader
                        viewBox={`0 0 380 25`}
                        className="rounded-lg"
                        rectW="100%"
                        rectH={isMobile ? "100" : "15"}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      width: isMobile ? "30%" : "15%",
                      marginLeft: isMobile ? "10px" : "70px",
                    }}
                  >
                    <CustomCardLoader
                      viewBox={`0 0 280 105`}
                      className="rounded-lg"
                      rectW="100%"
                      rectH={isMobile ? "80" : "80"}
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              className="mt-2 py-2"
              style={{ borderBottom: "1px solid #e2e2e2" }}
            ></div>

            <div className="mb-0 mt-3">
              {questionloading
                ? Array.from({ length: 20 }, (_, i) => (
                    <CustomCardLoader
                      key={i}
                      viewBox={`0 0 380 80`}
                      className={"mt-2"}
                      rectW="100%"
                      rectH="70"
                    />
                  ))
                : questions.map((item, index) => (
                    <QuestionOptions
                      _id={item._id}
                      questionId={item.questionId}
                      question={item.question}
                      options={item.options}
                      key={item.questionId}
                      answer={item.answer}
                      index={index + 1}
                      minTime={item.minTime}
                      maxTime={item.maxTime}
                      avgTime={item.avgTime}
                      showHints={item.showHints}
                    />
                  ))}
            </div>

            {showLoader === true ? (
              <Loader className="flex justify-center" />
            ) : (
              <button
                type="button"
                className={`text-white ${logoBtnColor} w-full rounded-lg px-5 py-2.5 md:mb-2 lg:mb-0 text-sm font-medium focus:ring-4 focus:ring-blue-300`}
                disabled={showLoader}
                onClick={handlePracticeClick}
              >
                Start Practice
              </button>
            )}
          </div>

          <div className="col-span-12 sm:col-span-3">
            <Faq title={""} description={""} imageUrl={""} />
          </div>
        </div>
      </div>
    </div>}
  </>
);
};

export default EPaper;
