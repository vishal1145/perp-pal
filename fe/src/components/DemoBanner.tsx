"use client"
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import logo from "../images/logo1.png"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { text2 } from '@/data/data';

interface DemoBannerProps {
  notMainPage: boolean;  
}

export const DemoBanner: React.FC<DemoBannerProps> = (props) => {
  const router = useRouter();
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
    if (e.key === 'Enter' && searchText.trim() !== '') {
      const formattedText = searchText.trim().replace(/\s+/g, '-'); // Format the text
      router.push(`/e-paper/${formattedText}`); // Navigate to the formatted URL
    }
  };

  return(
    <header className="sticky top-0 z-50 bg-white p-4 text-lg font-normal text-gray-900 border-b border-gray-200">
    <div className="grid grid-cols-12 gap-4">
      {/* Div 1: Colspan 3 */}
      <div className="col-span-3 flex items-center" id="div1">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={logo}
            className="h-10 w-full"
            alt="Flowbite Logo"
          />
        </a>
      </div>
  
      {/* Div 2: Colspan 6 (conditional rendering) */}
      {notMainPage === true && (
        <div className="col-span-8 lg:col-span-6 relative flex items-center" id="div2">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            className="bg-gray-100 w-full pl-10 pr-10 h-9 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown} // Add onKeyDown event handler
          />
          <span className="absolute inset-y-0 right-3 flex items-center">
            <FaMicrophone className="text-gray-400 cursor-pointer" onClick={handleMicClick} />
          </span>
        </div>
      )}
  
      {/* Div 3: Colspan 3 */}
      <div className="col-span-1 lg:col-span-3 flex items-center justify-end" id="div3">
 

          <a href="/how-it-work" target='_blank' className={`flex ${text2} items-center space-x-3 rtl:space-x-reverse`}>
          How It Works
        </a>

       
      </div>
      
    </div>
  </header>
  
  )
  }