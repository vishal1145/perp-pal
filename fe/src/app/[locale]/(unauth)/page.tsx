'use client';
import Image from 'next/image';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/global.css';
import ContentLoader from 'react-content-loader'; // Import React Content Loader
import logo from '../../../images/logo.jpg';
import Footer from './Footer/page';
import { Banner } from '@/components/Banner';
export default function Layout() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
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
        const transcript = results[results.length - 1][0].transcript;
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
        clearTimeout(timeoutId);
      };
    } else {
      alert('Your browser does not support speech recognition.');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://prep-pal.algofolks.com/api/Prompt?page=1&pageSize=8');
        const data = await res.json();
        setCardData(data.records);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  const handleCardClick = (promptText: string) => {
    const formattedText = promptText.replace(/\s+/g, '-');
    router.push(`/e-paper/${formattedText}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      const formattedText = searchText.trim().replace(/\s+/g, '-'); // Format the text
      router.push(`/e-paper/${formattedText}`); // Navigate to the formatted URL
    }
  };
 // Custom Content Loader for Cards with reduced height
const CustomCardLoader = () => (
  <ContentLoader
  speed={2}
  width={300}
  height={100}  // Overall height reduced
  viewBox="0 0 300 100"
  backgroundColor="#F0F0F0"
  foregroundColor="#DEDEDE"
>
  <rect x="15" y="30" rx="5" ry="5" width="260" height="8" /> {/* Smaller text */}
  <rect x="15" y="40" rx="5" ry="5" width="260" height="8" /> {/* Smaller text */}
</ContentLoader>
);
  return (
    <div className="flex flex-col min-h-screen">
       <Banner/>
      <div className="flex justify-center items-center mb-5 mt-5">
  <div className="relative w-full max-w-lg">
    <Image
      src={logo}
      alt="Google Logo"
      width={270}
      height={100}
      className="mx-auto h-[100px] object-contain"
    />
  </div>
</div>
<div className="flex justify-center items-center mb-6">
  <div className="relative w-full max-w-xl sm:max-w-xl">
    <span className="absolute inset-y-0 left-0 flex items-center pl-5 sm:pl-7">
      <FaSearch className="text-gray-400" />
    </span>
    <input
      ref={searchInputRef}
      type="text"
      placeholder="Search..."
      className="bg-gray-100 w-full p-2 sm:p-3 pl-12 sm:pl-14 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" // Adjusted padding and font size
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <span className="absolute inset-y-0 right-0 flex items-center pr-5 sm:pr-7">
      <FaMicrophone className="text-gray-400 cursor-pointer" onClick={handleMicClick} />
    </span>
  </div>
</div>
      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 md:mx-8 mb-6 flex-grow">
        {loading ? (
          Array(8).fill(0).map((_, index) => (
            <div key={index} className="flex justify-center items-center h-10 mt-2">
              <CustomCardLoader />
            </div>
          ))
        ) : (
          cardData.map((card: any) => (
            <div
              key={card.prompt_text}
              className="relative group bg-gray-100 p-3 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleCardClick(card.prompt_text)}
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
      <Footer />
    </div>
  );
}