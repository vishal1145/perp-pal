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
  userProfile, 
} from "@/data/functions";
import type { FilterOption, McqQuestion } from "@/types/type";

const useFetchData = (
  url: string,
  setData: React.Dispatch<React.SetStateAction<any>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dataType?: string | null
) => {
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        if (dataType === "Questions") {
          setData(data);
        } else {
          setData(
            data.map((item: any) => ({ id: item.id, name: item.className }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, setData, setLoading]);
};

const EPaper: React.FC = () => {
  const [questionloading, setQuestionLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [classFilter, setClassFilter] = useState<FilterOption[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<FilterOption[]>([]);
  const [chapterFilter, setChapterFilter] = useState<FilterOption[]>([]);
  const [levelFilter, setLevelFilter] = useState<FilterOption[]>([]);
  const [formattedText, setFormattedText] = useState<string>("");
  const [alreadyCall, setAlreadyCall] = useState<boolean>(false);
  const [loadingUserData, setLoadingUserData] = useState();
  const [selectedFilters, setSelectedFilters] = useState({
    classId: null as string | null,
    subjectId: null as string | null,
    chapterId: null as string | null,
    levelId: null as string | null,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
    if (alreadyCall) {
      return;
    }

    setAlreadyCall(true);
    try {
      setShowLoader(true);

      const userId = userProfile?._id ?? null;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/questions`,
        questions
      );
      const quetionsIds = response.data?.quetionsIds;

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/startassesment`,
        { quetionsIds: quetionsIds, userId: userId }
      );
      const text = formattedText.trim().replace(/\s+/g, "--");

      router.push(
        `/practice-screen?paper=${encodeURIComponent(
          text
        )}&id=${encodeURIComponent(data.saveStartAssesment._id)}`
      );
    } catch (error) {
      console.error("Error generating practice:", error);
      setAlreadyCall(false);
    }
  };

  useFetchData(
    `https://prep-pal.algofolks.com/api/Education/class`,
    setClassFilter,
    setLoading
  );

  const fetchFilterOptions = async (type: string, id: string) => {
    try {
      const endpoint =
        type === "subject"
          ? `https://prep-pal.algofolks.com/api/Education/subject/class/67069f86fc430151577d39fd`
          : type === "chapter"
            ? `https://prep-pal.algofolks.com/api/Education/chapter/subject/670786588730a1e5d31aa614`
            : `https://prep-pal.algofolks.com/api/Education/level`;

      const { data } = await axios.get(endpoint);

      return data.map((item: any) => ({
        id: item.subjectId || item.chapterId || item.id,
        name: item.subjectName || item.chapterName || item.levelName,
      }));
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return [];
    }
  };

  useEffect(() => {
    fetchFilterOptions("subject", "67069f86fc430151577d39fd").then(
      setSubjectFilter
    );
    fetchFilterOptions("chapter", "670788242e0e06e67865a429").then(
      setChapterFilter
    );
    fetchFilterOptions("level", "chapterId").then(setLevelFilter);
    // fetchUserData();
  }, []);
  const handleFilterChange = (
    filter: "classId" | "subjectId" | "chapterId" | "levelId",
    value: string | null
  ) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: value }));
  };

  return (
    <>
      <Banner notMainPage={true} loadingUserData={loadingUserData} />
      <div className="container mx-auto px-3">
        <div id="e-paper" className="min-h-screen py-4">
          {/* <DemoBanner notMainPage={true} /> */}
          <div
            id="maidiv"
            className="practixe-main grid lg:grid-cols-[70%_30%]"
          >
            <div className="">
              <div className="w-full">
                {questionloading === false ? (
                  <div className="w-full">
                    <div className="flex justify-between">
                      <div className="font-medium">Your Questions</div>

                      {showLoader === true ? (
                        <Loader />
                      ) : (
                        <div className="">
                          <button
                            type="button"
                            className="cursor-pointer rounded-md border border-gray-500 bg-transparent px-3 py-1.5 text-sm font-medium hover:bg-gray-200 focus:outline-none "
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
                    </div>
                    <div className="font-sm break-words text-gray-500 mt-1 lg:mt-0">
                      {formattedText}
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex w-full"
                    style={{ height: isMobile ? "50px" : "60px" }}
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
                className="py-2"
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
                        correctAnswer={item.correctAnswer}
                        key={item.questionId}
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
                  className={`text-white ${logoBtnColor} w-full rounded-lg px-5 py-2.5 text-sm font-medium focus:ring-4 focus:ring-blue-300`}
                  disabled={showLoader}
                  onClick={handlePracticeClick}
                >
                  Start Practice
                </button>
              )}
            </div>

            <div className="lg:ml-8 pt-4 lg:py-0">
              <Faq title={""} description={""} imageUrl={""} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EPaper;
