"use client"; // Ensure the component is a client component
import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"; // Import from chart.js
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";

import { Banner } from "@/components/Banner";
import CustomCardLoader from "@/components/CustomCardLoader";
// import { DemoBanner } from "@/components/DemoBanner";
import { yourQuestions } from "@/data/functions";
// import { setUserProfile, userProfile } from "@/data/functions";
import { SubmitAssessment } from "@/types/type";
// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const ResultPage = () => {
  const searchParams = useSearchParams();
  const [submitAssessment, setSubmitAssessment] = useState<SubmitAssessment[]>(
    []
  );
  const [correct, setCorrect] = useState(0);
  const [inCorrect, setInCorrect] = useState(0);
  const [notAttempt, setNotAttempt] = useState(0);
  const [cardData, setCardData] = useState([]);
  const router = useRouter();
  const id = searchParams.get("id");
  const hasFetched = useRef(false);
  const [loadingUserData, setLoadingUserData] = useState();
  const [questionloading, setQuestionLoading] = useState(true);
  const title = searchParams.get("title");
  const getSubmitAssessment = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URI}/assessments/${id}`
      );
      const questions = data?.questions;
      setSubmitAssessment(questions);
      setQuestionLoading(false);
      const total = questions.length;
      let totalAttempt = 0;
      let correct = 0;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i]?.userSelectAns != "") {
          totalAttempt++;
          if (
            questions[i]?.questionId?.correctAnswer ==
            questions[i]?.userSelectAns
          ) {
            correct++;
          }
        }
      }

      setCorrect(correct);
      setInCorrect(totalAttempt - correct);
      setNotAttempt(total - totalAttempt);
    } catch (error) {
      console.log(error);
    }
  };

  const getHomeData = async () => {
    try {
      const { data } = await axios.get(
        "https://prep-pal.algofolks.com/api/Prompt?page=1&pageSize=8"
      );
      setCardData(data.records);
    } catch (err) {}
  };

  useEffect(() => {
    if (id && !hasFetched.current) {
      hasFetched.current = true;
      getSubmitAssessment();
      getHomeData();
    }
  }, [id]);

  const data = {
    labels: ["correct", "incorrect", "not attempted"],
    datasets: [
      {
        data: [correct, inCorrect, notAttempt],
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
        hoverBackgroundColor: ["#66BB6A", "#EF5350", "#42A5F5"],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const [openIndex, setOpenIndex] = useState(null);

  const handleFaqToggle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCardClick = (promptText: string) => {
    const formattedText = promptText.replace(/\s+/g, "--");
    router.push(`/e-paper/${formattedText}`);
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
      <Banner notMainPage={true} loadingUserData={loadingUserData} />
      {/* <DemoBanner notMainPage={true} /> */}
      <div className="container mx-auto px-3">
        <div className="py-4 grid lg:grid-cols-[70%_30%]">
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <div className="font-medium mb-1">Your Questions</div>
                <div className="text-gray-500">
                  {title ? title : yourQuestions}
                </div>
                <div className="text-gray-500"></div>
              </div>
              <div
                className="py-2"
                style={{ borderBottom: "1px solid #E2E2E2" }}
              ></div>
              <div className="mt-4">
                {/* Pie Chart */}
                {questionloading ? (
                  <div className="flex items-center rounded-lg bg-gray-100 p-4 text-center shadow-lg">
                    <CustomCardLoader
                      viewBox="0 0 380 75"
                      className="text-3xl text-gray-700"
                      rectW="100%"
                      rectH="150"
                    />
                  </div>
                ) : (
                  <div className="flex size-52">
                    <Pie data={data} options={options} />
                  </div>
                )}
              </div>
              <div className="mt-5">
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
                  : submitAssessment.map((item, index) => {
                      const question = item.questionId;
                      const userSelectAnsString = item.userSelectAnsString;
                      const userSelectAns = item.userSelectAns;
                      const correctAnswer = question.correctAnswer;

                      return (
                        <div
                          key={question.questionId}
                          className={`w-full flex flex-col ${index !== submitAssessment.length - 1 ? "mb-4" : ""}`}
                        >
                          <div className="mb-2">
                            <h2 className="text-sm font-medium">
                              Q{index + 1}. {question.question}
                            </h2>
                            <ul className="mt-2 text-sm font-normal text-gray-500">
                              {question.options.map((option, idx) => {
                                const isUserSelected =
                                  userSelectAnsString == option.optionText;
                                const isCorrect =
                                  idx + 1 === Number(correctAnswer);
                                const notSelected = userSelectAnsString == "";

                                let bgColor = "";
                                if (isUserSelected && isCorrect) {
                                  bgColor = "bg-green-500";
                                } else if (isUserSelected && !isCorrect) {
                                  bgColor = "bg-red-300";
                                } else if (isCorrect) {
                                  bgColor = "bg-green-300";
                                } else if (notSelected) {
                                  bgColor = "bg-gray-200";
                                }

                                return (
                                  <li
                                    key={idx}
                                    className={`mt-1.5 flex items-center ${bgColor} p-2 rounded`}
                                  >
                                    <span className="mr-2 font-normal">
                                      {option.optionFlag}.
                                    </span>
                                    <span>{option.optionText}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div
                            className=""
                            style={{ borderBottom: "1px solid #E2E2E2" }}
                          ></div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>

          <div className="lg:ml-8">
            <div className="flex flex-col">
              <div className="text-sm font-medium leading-[3.25rem]">
                Your Next Adapting Path
              </div>
              {questionloading ? (
                <div className="bg-gray-100 rounded-lg shadow-lg p-4 text-center flex items-center">
                  <CustomCardLoader
                    viewBox="0 0 480 300"
                    className="text-9xl text-gray-700"
                    rectW="100%"
                    rectH="950"
                  />
                </div>
              ) : (
                cardData.map((item) => (
                  <p
                    className="mb-2 mt-0 cursor-pointer pt-0 text-sm text-gray-500 transition hover:text-indigo-500"
                    onClick={() => handleCardClick(item.prompt_text)}
                  >
                    {item.prompt_text}
                  </p>
                ))
              )}
              <div className="">
                <div
                  className="pb-2"
                  style={{ borderBottom: "1px solid #E2E2E2" }}
                ></div>
                <h3 className="text-sm  font-medium leading-[3.25rem]">
                  Key Points to Remember
                </h3>
                <div className="">
                  <div
                    className="accordion-group"
                    data-accordion="default-accordion"
                  >
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className={`accordion faq-border rounded-xl transition duration-500 ${
                          openIndex == index
                            ? "accordion-active:bg-indigo-50 accordion-active:border-cyan-600"
                            : ""
                        } mb-2 py-2 px-2`}
                      >
                        <button
                          type="button"
                          className="accordion-toggle accordion-active:font-medium accordion-active:text-indigo-600 group inline-flex w-full items-center text-left text-lg font-normal leading-8 text-gray-900 transition-all duration-500 ease-in-out hover:text-cyan-600"
                          onClick={() => handleFaqToggle(index)}
                        >
                          {openIndex == index ? (
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
                          <p className="ml-2 text-sm text-gray-500 transition duration-500">
                            {faq.question}
                          </p>
                        </button>
                        {openIndex === index && (
                          <div
                            className="accordion-content transition-all duration-500"
                            style={{
                              transition: "max-height 0.5s ease-in-out",
                            }}
                          >
                            <p className="text-sm text-gray-500 font-normal leading-5">
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
        </div>
      </div>
    </>
  );
};

export default ResultPage;
