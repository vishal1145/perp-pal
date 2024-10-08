'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import '@/styles/global.css';

export default function Layout(props: {  
  children: React.ReactNode;
  params: { locale: string };
}) {
  const t = useTranslations('RootLayout');
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true; 
      recognition.interimResults = true; 
      recognition.lang = 'en-US';
  
      let timeoutId: NodeJS.Timeout;
  
      recognition.start();
  
      recognition.onresult = (event) => {
        const results = event.results;
        const transcript = results[results.length - 1][0].transcript; // Get the latest result
        setSearchText(transcript);
        
        clearTimeout(timeoutId);
  
        timeoutId = setTimeout(() => {
          recognition.stop();
        }, 2000); 
      };
  
      recognition.onerror = (event) => {
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
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Function to handle card click
  const handleCardClick = () => {
    // Navigate to the assessment page without any parameters
    window.location.href = '/assessment';
  };

  return (
    <>
      <div className="flex justify-center items-center mb-5 mt-5"> 
        <div className="relative w-full max-w-lg">
          <Image
            src="/assets/images/image1.webp" 
            alt="Google Logo"
            width={400} 
            height={130}
            className="mx-auto" 
          />
        </div>
      </div>

      <div className="flex justify-center items-center mb-6">
        <div className="relative w-full max-w-xl sm:max-w-2xl">
          <span className="absolute inset-y-0 left-0 flex items-center pl-5 sm:pl-7">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 w-full p-3 sm:p-4 pl-12 sm:pl-16 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} 
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-5 sm:pr-7">
            <FaMicrophone className="text-gray-400 cursor-pointer" onClick={handleMicClick} />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 md:mx-8 mb-6">
        {cardData.map((card: any) => (
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
        ))}
      </div>
    </>
  );
}
