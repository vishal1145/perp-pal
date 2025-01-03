"use client";
import SharePreppal from "@/components/SharePreppal";
import { freePrompt, setFreePrompt } from "@/data/functions";
import { useRouter } from "next/navigation";
import { useEffect, useRef,useState } from "react";
import { FaMicrophone,FaSearch } from "react-icons/fa";

const HowItWorks=()=> {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const[sharePreppal, setSharePreppal] = useState(false);
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
        const transcript = results[results.length - 1][0].transcript;
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
        clearTimeout(timeoutId);
      };
    } else {
      alert("Your browser does not support speech recognition.");
    }
  };
  useEffect(() => {
    setFreePrompt()
    const titleElement = document.getElementById(
      "nextjs-tile"
    ) as HTMLTitleElement;
    if (titleElement) {
      titleElement.textContent = "How it works";
    }

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      if(freePrompt == false){
        setSharePreppal(true);
        return
     }
      const formattedText = searchText.trim().replace(/\s+/g, "--"); // Format the text
      router.push(`/e-paper/${formattedText}`); // Navigate to the formatted URL
    }
  };

  const handleClick = () => {
    if(freePrompt == false){
       setSharePreppal(true);
       return;
    }
    const formattedText = searchText.trim().replace(/\s+/g, "--"); // Format the text
    router.push(`/e-paper/${formattedText}`); // Navigate to the formatted URL
  };
  return (
    <>
    {
      sharePreppal && <SharePreppal setSharePreppal={setSharePreppal}/>
    }
      <div className="container mx-auto px-3 py-4">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-600">
        Adaptive Learning System: Step-by-Step Guide
      </h1>
      <p className="mb-6 leading-relaxed text-gray-500">
        Welcome to our smart adaptive learning platform, where you can create
        personalized practice papers, get immediate feedback, and follow a
        tailored learning path for better academic growth. Below is a detailed
        guide on how the system works from start to finish.
      </p>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 1: Describe Your Practice Paper
        </h3>
        <p className="mb-5 text-gray-500">
          To get started, users are prompted to input a detailed description of
          the paper they want to generate. This description can include:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">
            <strong className="text-black ">Subject</strong>: Choose from a wide
            variety of subjects (e.g., Mathematics, Science, History).
          </li>
          <li className="mb-1">
            <strong className="text-black">Class/Grade Level</strong>: Indicate
            the academic level (e.g., Grade 6, High School, Undergraduate).
          </li>
          <li className="mb-1">
            <strong className="text-black">Topics/Chapters</strong>: Specify
            chapters or topics to focus on (e.g., Algebra, Photosynthesis).
          </li>
          <li className="mb-1">
            <strong className="text-black">Question Type</strong>: Choose
            multiple-choice questions (MCQs) as the format.
          </li>
          <li className="mb-1">
            <strong className="text-black">Difficulty Level</strong>: Define the
            difficulty level (easy, medium, hard).
          </li>
          <li className="mb-1">
            <strong className="text-black">Number of Questions</strong>:
            Indicate how many questions you want (e.g., 10, 20, 50).
          </li>
        </ul>
        <p className="my-4 text-gray-600">
          Once the description is entered, our system analyzes it and creates a
          custom paper within seconds, perfectly aligned with your
          specifications.
        </p>
      </div>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 2: Review and Customize the Paper
        </h3>
        <p className="mb-5 text-gray-500">
          After generating the initial version of the paper, users can review
          the questions. At this stage, you can:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">
            <strong className="text-black">Preview the Questions</strong>: See
            each question and its answer options.
          </li>
          <li className="mb-1">
            <strong className="text-black">Edit/Refine the Paper</strong>:
            Modify questions, adjust the difficulty, or change the number of
            questions.
          </li>
          <li className="mb-1">
            <strong className="text-black">Regenerate Questions</strong>: If
            you're not satisfied with the questions, regenerate the paper for a
            fresh set.
          </li>
        </ul>
      </div>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 3: Start the Practice Session
        </h3>
        <p className="mb-5 text-gray-500">
          Once the paper is finalized, students can begin their practice
          session. Choose between two practice modes:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">
            <strong className="text-black">Timed Mode</strong>: Take the test
            with a countdown timer to simulate exam conditions.
          </li>
          <li className="mb-1">
            <strong className="text-black">Untimed Mode</strong>: Practice at
            your own pace, allowing for a more relaxed learning experience.
          </li>
        </ul>
        <p className="my-4 text-gray-600">
          Users can navigate between questions and bookmark specific ones for
          later review.
        </p>
      </div>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 4: Submit the Paper for Evaluation
        </h3>
        <p className="mb-5 text-gray-500">
          After completing the paper, users submit their responses for
          evaluation. The system instantly provides:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">
            <strong className="text-black">Immediate Results</strong>: A score
            breakdown, including correct, incorrect, and unanswered questions.
          </li>
          <li className="mb-1">
            <strong className="text-black">Detailed Feedback</strong>: Correct
            answers with explanations or links to resources for further study.
          </li>
        </ul>
      </div>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 5: Analyze Performance Metrics
        </h3>
        <p className="mb-5 text-gray-500">
          Users receive a detailed analysis of their performance:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">
            <strong className="text-black">Section-wise Analysis</strong>:
            Highlights strengths and weaknesses by topic.
          </li>
          <li className="mb-1">
            <strong className="text-black">Time Spent</strong>: A breakdown of
            time spent on each question.
          </li>
          <li className="mb-1">
            <strong className="text-black">
              Comparison with Past Attempts
            </strong>
            : Track progress by comparing current results with previous tests.
          </li>
          <li className="mb-1">
            <strong className="text-black">Accuracy Rate</strong>: Shows the
            percentage of correct answers to measure overall performance.
          </li>
        </ul>
      </div>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 6: Personalized Adaptive Learning Path
        </h3>
        <p className="mb-5 text-gray-500">
          Based on the analysis, our system creates an{" "}
          <strong>Adaptive Learning Path</strong> to target areas for
          improvement. Features include:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">
            <strong className="text-black">Customized Topic Suggestions</strong>
            : Recommendations on weak areas for further practice.
          </li>
          <li className="mb-1">
            <strong className="text-black">Resource Recommendations</strong>:
            Study material and resources based on performance.
          </li>
          <li className="mb-1">
            <strong className="text-black">Goal Setting</strong>: Encourages
            users to set learning goals for the next session.
          </li>
        </ul>
      </div>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 7: Retake or Create New Papers
        </h3>
        <p className="mb-5 text-gray-500">
          After following the learning path, users can:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">
            <strong className="text-black">Retake the Same Paper</strong> to
            test improvement.
          </li>
          <li className="mb-1">
            <strong className="text-black">Create a New Paper</strong> for fresh
            questions or a different topic.
          </li>
        </ul>
      </div>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 8: Track Progress Over Time
        </h3>
        <p className="mb-5 text-gray-500">
          As users complete more practice papers, the system tracks:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">
            <strong className="text-black">Performance Over Time:</strong> A
            visual graph to show progress.
          </li>
          <li className="mb-1">
            <strong className="text-black">Adaptive Recommendations: </strong>{" "}
            Refines learning paths based on updated performance data.
          </li>
        </ul>
      </div>

      <div className="mb-6 border-l-4 border-blue-500 bg-gray-100 p-4">
        <h3 className="mb-5 text-xl font-semibold text-gray-600">
          Step 9: Achieve Mastery
        </h3>
        <p className="mb-5 text-gray-500">
          By following the personalized learning path, students can:
        </p>
        <ul className="ml-5 list-disc pl-6 text-gray-500 marker:text-black ">
          <li className="mb-1">Achieve higher scores on practice papers.</li>
          <li className="mb-1">
            Gain a deeper understanding of subject material.
          </li>
          <li className="mb-1">Build confidence for real exams.</li>
        </ul>
      </div>

      <h2 className="mb-5 mt-10 text-2xl font-semibold text-gray-600">
        Conclusion
      </h2>
      <p className="text-gray-500">
        Our system is designed to offer structured, personalized, and adaptive
        learning experiences. Start now and see how you can improve your
        academic performance with our tailored papers and guided learning paths!
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <div className="mt-10 flex w-full flex-col items-center">
          {/* <h2 className="text-2xl font-semibold text-gray-600 mt-10 mb-5 w-full text-left">
    Let's start learning
  </h2> */}

          <div className="relative flex w-full max-w-xl items-center justify-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-5 sm:pl-7">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              required
              placeholder="Type a text to generate practice questions."
              className="w-full rounded-full border border-gray-300 bg-gray-100 p-2 pl-12 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:p-3 sm:pl-14"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-5 sm:pr-7">
              <FaMicrophone
                className="cursor-pointer text-gray-400"
                onClick={handleMicClick}
              />
            </span>
          </div>
          <button
            type="submit"
            className="relative mt-6 flex w-full max-w-xl items-center justify-center rounded bg-cyan-600 px-4 py-2 font-medium text-white  hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300"
          >
            Start Practice
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
export default HowItWorks;