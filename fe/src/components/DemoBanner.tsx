"use client"
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

interface DemoBannerProps {
  notMainPage: boolean;  
}

export const DemoBanner: React.FC<DemoBannerProps> = (props) => {
  const { notMainPage } = props;
  const [searchText, setSearchText] = useState('');

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
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Navigate to the assessment page when Enter is pressed
      window.location.href = '/assessment';
    }
  };

  return(
  <header className="sticky top-0 z-50 bg-white p-4 text-lg font-normal text-gray-900 flex items-center justify-between border-b border-gray-200">
    
    
    <div className="flex justify-between w-full">



    <div className="flex items-center space-x-3">
    <a
      href="http://localhost:3000/"
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8"
        alt="Flowbite Logo"
      />
      <span className="self-center text-2xl hidden sm:flex font-semibold whitespace-nowrap dark:text-white">
        Prepal
      </span>
    </a>
 
    </div>


{
  notMainPage === true && 
  <div className="relative flex items-center w-2/4  ">
  <span className="absolute inset-y-0 left-3 flex items-center">
    <FaSearch className="text-gray-400" />
  </span>
  <input
    ref={searchInputRef}
    type="text"
    placeholder="Search..."
    className="bg-gray-100 w-full pl-10 pr-10 h-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    onKeyDown={handleKeyDown} // Add onKeyDown event handler
  />
  <span className="absolute inset-y-0 right-3 flex items-center">
    <FaMicrophone className="text-gray-400 cursor-pointer" onClick={handleMicClick} />
  </span>
</div>
}
 
    <div className="flex items-center space-x-3 hidden sm:flex">
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>

    </div>

  </header>
  )
  }