"use client";
import React, { useState, useEffect } from "react";

import {
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
interface FBShareResponse {
  error_message?: string;
}
const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleFaqToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I start a practice session?",
      answer:
        "Learn how to begin your practice session after the paper is generated.",
    },
    {
      question: "Can I change the number of questions in a practice paper?",
      answer:
        "Understand how to modify the number of questions before starting your session.",
    },
    {
      question: "How do I navigate between questions during practice?",
      answer:
        "A guide on moving between questions, flagging questions for review, and submitting answers.",
    },
    {
      question: "How is my performance evaluated in real-time?",
      answer:
        "Find out how results are calculated and displayed immediately after completing the session.",
    },
    {
      question: "Can I retake the practice paper to improve my score?",
      answer:
        "Information on how to retake the same practice paper and track your progress.",
    },
  ];

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "2034775726987397",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v21.0",
      });
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const shareOnFacebook = () => {
    const urlToShare = window.location.href;
    window.FB.ui(
      {
        method: "share",
        href: urlToShare,
      },
      (response: FBShareResponse) => {
        if (response && !response.error_message) {
          console.log("Post was shared successfully.");
        } else {
          console.error("Error while sharing:", response.error_message);
        }
      }
    );
  };

  const shareOnWhatsapp = () => {
    const currentUrl = window.location.href;
    const message = `${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };



  return (
    <section className="">
      <div className="rounded-md">
        <h2 className="pb-2 text-sm font-bold">Share us</h2>
        <div className="ml-1 mt-1 flex flex-wrap gap-4">

          <button
            type="button"
            onClick={shareOnWhatsapp}
            className="flex items-center"
          >
            <FaWhatsapp
              className="text-gray-900 transition hover:text-cyan-600"
              size={24}
            />
          </button>

          <button
            type="button"
            onClick={shareOnFacebook}
            className="flex items-center"
          >
            <FaFacebook
              className="text-gray-900 transition hover:text-cyan-600"
              size={24}
            />
          </button>
        </div>
      </div>

      <div className="py-2" style={{ borderBottom: "1px solid #e2e2e2" }}></div>

      <div>
        <h2 className="text-sm font-bold leading-[3.25rem]">
          Frequently asked questions
        </h2>

        <div
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="accordion-group"
          data-accordion="default-accordion"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`accordion faq-border rounded-xl transition duration-500 ${isOpen
                  ? "accordion-active:bg-indigo-50 accordion-active:border-cyan-600"
                  : ""
                  } mb-2 py-2 pl-2 pr-4`}
              >
                <button
                  type="button"
                  className="accordion-toggle accordion-active:font-medium accordion-active:text-cyan-600 group inline-flex w-full items-center text-left text-lg font-normal leading-8 text-gray-900 transition duration-500 hover:text-cyan-600"
                  onClick={() => handleFaqToggle(index)}
                >
                  {isOpen ? (
                    <svg
                      className="size-6 text-gray-900 transition duration-500"
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
                      className="size-6 text-gray-900 transition duration-500"
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
                <div
                  className={`accordion-content w-full overflow-hidden transition-all duration-500 ${isOpen ? "max-h-40" : "max-h-0"
                    }`}
                  style={{ transition: "max-height 0.5s ease-in-out" }}
                >
                  {isOpen && (
                    <p className="text-sm font-normal leading-5 text-gray-500">
                      {faq.answer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps() {
  const title = "prep_pal";
  const description =
    "A brief explanation about the difference between speed and velocity.";
  const imageUrl = "https://via.placeholder.com/600x400";
  return {
    props: {
      title,
      description,
      imageUrl,
    },
  };
}

export default Faq;
