'use client';
import Image from 'next/image';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import '@/styles/global.css';

import { DemoBanner } from '@/components/DemoBanner';
import Footer from './Footer/page';

export default function Layout() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  // Create a ref for the search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true; 
      recognition.interimResults = true; 
      recognition.lang = 'en-US';
  
      let timeoutId: NodeJS.Timeout;
  
      recognition.start();
  
      recognition.onresult = (event:any) => {
        const results = event.results;
        const transcript = results[results.length - 1][0].transcript; // Get the latest result
        setSearchText(transcript);
        
        clearTimeout(timeoutId);
  
        timeoutId = setTimeout(() => {
          recognition.stop();
        }, 2000); 
      };
  
      recognition.onerror = (event:any) => {
        console.error('Speech recognition error:', event.error);
      };
  
      recognition.onend = () => {
        console.log('Speech recognition service disconnected');
        clearTimeout(timeoutId);
      };
    } else {
      alert('Your browser does not support speech recognition.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://prep-pal.algofolks.com/api/Prompt?page=1&pageSize=12');
        const data = await res.json();
        console.log(data);
        setCardData(data.records); 
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Focus the search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Function to handle card click
  const handleCardClick = () => {
    // Navigate to the assessment page without any parameters
    window.location.href = '/assessment';
  };

  // Function to handle key down event in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Navigate to the assessment page when Enter is pressed
      window.location.href = '/assessment';
    }
  };

  return (
    <>
      <DemoBanner notMainPage={false} /> 
      <div className="flex justify-center items-center mb-5 mt-5"> 
        <div className="relative w-full max-w-lg">
          <Image
            src="/assets/images/image1.webp" 
            alt="Google Logo"
            width={400} 
            height={80}
            className="mx-auto" 
          />
        </div>
      </div>

      <div className="flex justify-center items-center mb-6">
        <div className="relative w-full max-w-xl sm:max-w-xl">
          <span className="absolute inset-y-0 left-0 flex items-center pl-5 sm:pl-7">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            ref={searchInputRef} // Attach the ref here
            type="text"
            placeholder="Search..."
            className="bg-gray-100 w-full p-3 sm:p-4 pl-12 sm:pl-16 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} 
            onKeyDown={handleKeyDown} // Add onKeyDown event handler
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-5 sm:pr-7">
            <FaMicrophone className="text-gray-400 cursor-pointer" onClick={handleMicClick} />
          </span>
        </div>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 md:mx-8 mb-6">
        {loading ? (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center h-32">
            <p>Loading cards...</p>
          </div>
        ) : (
          cardData.map((card: any) => (
            <div 
              key={card.prompt_text} // Use prompt_text as a unique key
              className="relative group bg-gray-100 p-3 rounded-lg shadow-md cursor-pointer"
              onClick={handleCardClick} // Navigate to the assessment page
            >
              <p className="text-gray-500">{card.prompt_text}</p>
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-700 rounded-md px-2">
                <span className="tooltiptext text-gray-50 text-sm rounded py-1 z-10">
                  {card.prompt_Description}
                </span>
                <span className="absolute w-2 h-2 bg-gray-700 rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" />
              </div>
            </div>
          ))
        )}
      </div>
      <Footer/>
    </>
  );
}
