"use client";
import React, { useState } from 'react';
import Link from "next/link";
import {   FaTelegramPlane, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track the open FAQ index

  const handleFaqToggle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the FAQ
  }

  const faqs = [
    {
      question: "How can I reset my password?",
      answer: "To reset your password, go to the login page and click on 'Forgot Password?' Follow the prompts to reset it."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform."
    },

    {
      question: "How do I create an account?",
      answer: "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform."
    },

    {
      question: "How do I create an account?",
      answer: "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform."
    },
    // Add more FAQs as needed
  ];

  return (
    <section className="px-4 hidden lg:block lg:col-span-3">
      <div className="rounded-md     ">
        <h2 className="text-sm font-medium  font-bold    pb-2">
          Share use
        </h2>

      <div className='flex gap-4 flex-wrap ml-1  mt-1 '>
        <Link href="https://t.me/your-telegram-link" target="_blank" rel="noopener noreferrer">
          <FaTelegramPlane className="text-gray-900 hover:text-indigo-500 transition" size={24} />
        </Link>
        <Link href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="text-gray-900 hover:text-indigo-500 transition" size={24} />
        </Link>
        <Link href="https://instagram.com/your-instagram-link" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-gray-900 hover:text-indigo-500 transition" size={24} />
        </Link>
        <Link href="https://facebook.com/your-facebook-link" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-gray-900 hover:text-indigo-500 transition" size={24} />
        </Link>
      </div>
      </div>


      <div className='py-2' style={{borderBottom: '1px solid #e2e2e2'}}></div>

      <div className="">

        <h2 className="text-sm  font-medium   font-bold leading-[3.25rem]">
          Frequently asked questions
        </h2>

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


    </section>
  );
}

export default Faq;
