"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Head from 'next/head';
import { FaTelegramPlane, FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa';

const Faq = ({ title, description, imageUrl }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track the open FAQ index

  const handleFaqToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the FAQ
  };

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

  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '2034775726987397',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v21.0'
      });
    };

    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script if needed
      document.body.removeChild(script);
    };
  }, []);
// console.log(window.location.href)
  const shareOnFacebook = () => {
    const urlToShare = window.location.href; ;
    window.FB.ui({
      method: 'share',
      href: urlToShare,
    }, (response) => {
      if (response && !response.error_message) {
        console.log('Post was shared successfully.');
      } else {
        console.error('Error while sharing:', response.error_message);
      }
    });
  };

   // Function to share on WhatsApp
   const shareOnWhatsapp = () => {
    const currentUrl = window.location.href; 
    const message = `Check out this page: ${currentUrl}`; 
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`; 
  
    window.open(whatsappUrl, '_blank'); 
  };
  
  const shareOnTelegram = () => {
    const currentUrl = window.location.href;
    const message = `Check out this page: ${currentUrl}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(message)}`; // Telegram share link
  
    window.open(telegramUrl, '_blank'); 
  };

  const shareOnTwitter = () => {
    const currentUrl = window.location.href; 
    const message = `Check out this page: ${currentUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`; 
  
    window.open(twitterUrl, '_blank'); // Open Twitter share link
  };
  
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:url" content="" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        
        <meta property="og:image" content={imageUrl} />
      </Head>

      <section className="px-4 hidden lg:block lg:col-span-3">
        <div className="rounded-md">
          <h2 className="text-sm font-medium font-bold pb-2">Share us</h2>
          <div className='flex gap-4 flex-wrap ml-1 mt-1'>
            {/* <Link href="https://t.me/your-telegram-link" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane className="text-gray-900 hover:text-indigo-500 transition" size={24} />
            </Link> */}
            {/* <button onClick={shareOnTelegram} className="flex items-center">
            <FaTelegramPlane className="text-gray-900 hover:text-indigo-500 transition" size={24} />
            </button>
            */}
            <button onClick={shareOnWhatsapp} className="flex items-center">
              <FaWhatsapp className="text-gray-900 hover:text-indigo-500 transition" size={24} />
            </button>
          
            {/* <button onClick={shareOnTwitter} className="flex items-center">
            <FaTwitter className="text-gray-900 hover:text-indigo-500 transition" size={24} />
            </button> */}

            <button onClick={shareOnFacebook} className="flex items-center">
              <FaFacebook className="text-gray-900 hover:text-indigo-500 transition" size={24} />
            </button>
          </div>
        </div>

        <div className='py-2' style={{ borderBottom: '1px solid #e2e2e2' }}></div>

        <div>
          <h2 className="text-sm font-medium font-bold leading-[3.25rem]">Frequently asked questions</h2>

          <div className="accordion-group h-60" data-accordion="default-accordion">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`accordion faq-border rounded-xl transition duration-500 ${isOpen ? 'accordion-active:bg-indigo-50 accordion-active:border-indigo-600' : ''} mb-2 py-2 pl-2 pr-4`}
                >
                  <button
                    className="accordion-toggle group inline-flex items-center text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600 accordion-active:font-medium accordion-active:text-indigo-600"
                    onClick={() => handleFaqToggle(index)}
                  >
                    {isOpen ? (
                      <svg
                        className="w-6 h-6 text-gray-900 transition duration-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 12H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-900 transition duration-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 12H18M12 18V6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <p className='text-sm text-gray-500 ml-2 transition duration-500'>{faq.question}</p>
                  </button>
                  <div
                    className={`accordion-content w-full overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-40' : 'max-h-0'}`}
                    style={{ transition: 'max-height 0.5s ease-in-out' }}
                  >
                    {isOpen && (
                      <p className="text-sm text-gray-500 font-normal leading-6">
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
    </>
  );
};

export async function getServerSideProps() {
  const title = "prep_pal";
  const description = "A brief explanation about the difference between speed and velocity.";
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
