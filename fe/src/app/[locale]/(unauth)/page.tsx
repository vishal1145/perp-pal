'use client';
import Image from 'next/image';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/global.css';
import ContentLoader from 'react-content-loader'; // Import React Content Loader
import logo from '../../../images/logo1.png';
import Footer from './Footer/page';
import { Banner } from '@/components/Banner';
import { initGA, trackGAEvent } from '../(unauth)/googleAnalytics';
import { initMixpanel, trackEvent } from './mixpanel';
import { first_card } from "./mixpanelEventConstent";
import axios from 'axios';
import Head from 'next/head';


export default function Layout() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(null); // State for user data
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


  const getHomeData =  async()=>{
    try {
      const {data} = await axios.get('https://prep-pal.algofolks.com/api/Prompt?page=1&pageSize=8');
      setCardData(data.records);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
    initMixpanel();
    initGA();
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}users/me`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        debugger
      } else if (response.status === 400) {
        console.warn('User is not logged in or session has expired');
        setUser(null); // Show login button
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null); // Show login button on error
    }
  };
 
  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
       getHomeData()
       fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
     
    }
  }, []);

  const handleCardClick = (promptText: string) => {
    const formattedText = promptText.replace(/\s+/g, '--');
    router.push(`/e-paper/${formattedText}`);
    trackEvent(first_card);
    trackGAEvent('Card', 'cardClick', promptText); 
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      const formattedText = searchText.trim().replace(/\s+/g, '--');  
      router.push(`/e-paper/${formattedText}`); 
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
  <rect x="15" y="30" rx="5" ry="20" width="260" height="20" /> {/* Smaller text */}
  <rect x="15" y="60" rx="5" ry="20" width="260" height="20" /> {/* Smaller text */}
</ContentLoader>
);
  return (
    <div className="flex flex-col min-h-screen">
       <Head>
        <title>Create and Practice Online Papers | Customizable Student Practice Tests</title>
        <meta name="description" content="Empower students to create customizable online papers and practice tests by topic. Enhance learning with tailored questions and topics. Start practicing now!" />
        <meta name="keywords" content="Online paper creation, student practice tests, customizable practice papers, study aid for students, online quiz creation, subject-based practice papers, topic-specific tests, student learning platform, practice exams for students" />
     
        <meta property="og:title" content="Create and Practice Online Papers | Customizable Student Practice Tests" />
        <meta property="og:description" content="Empower students to create customizable online papers and practice tests by topic. Start practicing and enhance learning with tailored questions." />
        <meta property="og:image" content="URL_TO_YOUR_IMAGE" />
        <meta property="og:url" content="YOUR_APPLICATION_URL" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Create and Practice Online Papers | Customizable Student Practice Tests" />
        <meta name="twitter:description" content="Create customizable online papers and practice tests by topic. A perfect tool for students to practice and learn!" />
        <meta name="twitter:image" content="URL_TO_YOUR_IMAGE" />

        <meta name="robots" content="index, follow" />
      </Head>


       <Banner notMainPage={false} user={user}  />
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
{/* Search Bar */}
<div className="flex justify-center items-center mb-6 px-4 sm:px-6 lg:px-8">
  <div className="relative w-full max-w-xl sm:max-w-2xl">
    <span className="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5">
      <FaSearch className="text-gray-400" />
    </span>
    <input
      ref={searchInputRef}
      type="text"
      placeholder="Search..."
      className="bg-gray-100 w-full h-10 py-2 sm:py-3 pl-12 sm:pl-14 pr-10 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <span className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-5">
      <FaMicrophone className="text-gray-400 cursor-pointer" onClick={handleMicClick} />
    </span>
  </div>
</div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-8 mb-6 flex-grow">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex justify-center items-center h-10 mt-2">
                  <CustomCardLoader />
                </div>
              ))
          : cardData.map((card: any) => (
              <div
                key={card.prompt_text}
                className="relative group bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCardClick(card.prompt_text)}
              >
                <p className="text-gray-600">{card.prompt_text}</p>
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-700 rounded-md px-2">
                  <span className="tooltiptext text-gray-50 text-sm rounded py-1 z-10">
                    {card.prompt_Description}
                  </span>
                  <span className="absolute w-2 h-2 bg-gray-700 rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" />
                </div>
              </div>
            ))}
      </div>
      <Footer />
    </div>
  );
}