'use client';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { DemoBanner } from '@/components/DemoBanner';


export default function Layout() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://prep-pal.algofolks.com/api/Prompt?page=1&pageSize=10');
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

  return (
    <>

    <DemoBanner notMainPage={false} /> 
<div className="flex justify-center items-center mb-7 mt-7"> 
        <div className="relative w-full max-w-lg">
          <Image
            src="/assets/images/image1.webp" 
            alt="Google Logo"
            width={400} 
            height={150}
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
    />
  </div>
</div>


  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 md:mx-8">
        {cardData.map((card: any) => (
          <div key={card.id}  onClick={() => window.location.href = `/assessment`} className="relative group bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-500 mb-4">{card.prompt_text}</p>
            
           
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

