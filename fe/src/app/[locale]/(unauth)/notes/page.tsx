'use client';
import React, { useState, useEffect } from 'react';
import { Banner } from '@/components/Banner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '../../../../../public/assets/images/logo1.png';
import { FaMicrophone, FaSearch } from "react-icons/fa";
import CustomCardLoader from "@/components/CustomCardLoader";
const BoardPage = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [boards, setBoards] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const colors = ['#1b4f72', '#283747', '#4a235a', '#196f3d', '#116466', '#d35400'];
  const router = useRouter();


  const handleClassClick = (className) => setSelectedClass(className);
  const handleSubjectClick = (subject) => setSelectedSubject(subject);

  const classes = ['Class 12', 'Class 11', 'Class 10', 'Class 9'];

  useEffect(() => {
    const fetchBoards = async () => {
      setLoadingUserData(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/board/getBoard`);
        const data = await res.json();
        setBoards(data.board);
      } catch (error) {
        console.error('Error fetching boards:', error);
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchBoards();
  }, []);

  const handleImageClick = (subject) => router.push(`/subjects`);


  const renderNavigation = () => {
    let navigationText = '';
    if (selectedBoard) navigationText += `${selectedBoard} > `;
    if (selectedClass) navigationText += `${selectedClass} > `;
    if (selectedSubject) navigationText += selectedSubject;

    return (
      <div className="text-lg font-medium text-blue-700 mt-4">
        {selectedBoard && (
          <span
            onClick={() => setSelectedBoard(null)}
            className="cursor-pointer hover:underline"
          >
            {selectedBoard} &gt;
          </span>
        )}
        {selectedClass && (
          <span
            onClick={() => setSelectedClass(null)}
            className="cursor-pointer hover:underline"
          >
            {selectedClass} &gt;
          </span>
        )}
        {selectedSubject && (
          <span
            className="cursor-pointer"
          >
            {selectedSubject}
          </span>
        )}
      </div>
    );
  };


  return (
    <div className="min-h-screen">
      <Banner notMainPage={false} loadingUserData={loadingUserData} />
      <div className="pb-14 mb-10 bg-cyan-700">
        <div className="py-9 flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <Image
              src={Logo}
              alt="Logo"
              width={270}
              height={100}
              className="mx-auto h-[100px] object-contain"
            />
          </div>
        </div>
        <div className="text-center mb-6 px-4">
          <h1 className="text-3xl font-extrabold text-white">India’s Trusted Platform for Doubt Solving & Practice</h1>
          <p className="text-lg text-white mt-2">Unlock the best learning experience with tailored practice questions.</p>
        </div>
        <div className="mb-6 flex items-center justify-center sm:px-4 lg:px-12">
          <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-[52.8%]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Type a text to generate practice questions."
              className="h-14 w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-12 pr-10 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:py-3 sm:pl-14 md:text-base"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-5">
              <FaMicrophone className="cursor-pointer text-gray-400" />
            </span>
          </div>
        </div>
      </div>



      <div className="container mx-auto px-10 mb-8">

        {renderNavigation()}
        {!selectedBoard && (
          <>
            <h1 className="text-2xl font-bold mb-6">Select Boards</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">

              {boards.map((board, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedBoard(board.name)}
                  className="cursor-pointer p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-white flex flex-col items-center justify-center"
                  style={{
                    backgroundImage: "url('/print_icon.png')",
                    backgroundColor: colors[index % colors.length],
                    backgroundRepeat: 'repeat',
                  }}
                >
                  <Image
                    src={board.image}
                    alt={`${board.name} Logo`}
                    className="w-20 h-20 object-contain"
                    width={80}
                    height={80}
                  />
                  <h2 className="text-xl font-semibold text-center mt-3">{board.name}</h2>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedBoard && !selectedSubject && !selectedClass && (
          <div>
            <h2 className="mt-8 text-2xl font-bold">Select Class</h2>
            <div className="flex gap-2 p-2 mt-3 w-full">
              {classes.map((className) => (
                <div
                  key={className}
                  onClick={() => handleClassClick(className)}
                  className={`px-6 py-3 rounded-xl w-[320px] cursor-pointer transition-colors duration-300 ease-in-out ${selectedClass === className
                    ? className === 'Class 12'
                      ? 'bg-gradient-to-r from-blue-200 to-blue-400'
                      : className === 'Class 11'
                        ? 'bg-gradient-to-r from-green-200 to-green-400'
                        : className === 'Class 10'
                          ? 'bg-gradient-to-r from-yellow-200 to-yellow-400'
                          : 'bg-gradient-to-r from-pink-200 to-pink-400'
                    : className === 'Class 12'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-800'
                      : className === 'Class 11'
                        ? 'bg-gradient-to-r from-green-500 to-green-800'
                        : className === 'Class 10'
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-800'
                          : 'bg-gradient-to-r from-pink-500 to-pink-800'
                    }`}
                >
                  <div className="flex items-center justify-center">

                    <img
                      src="/12Logo.png"
                      alt="Class Icon"
                      className="w-20 h-16 object-contain"
                    />
                  </div>
                  <p className="text-center text-xl font-serif text-white">{className}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedClass && (
          <div>

            <h2 className='mt-8 text-2xl font-bold'>Select Subject</h2>
            <div className="flex flex-wrap  gap-7 mt-7 mb-10">
              <div className="flex flex-col px-16 py-5 rounded-lg shadow-lg  transition-transform duration-300 ease-in-out hover:scale-110 bg-sky-200 cursor-pointer w-[260px] items-center justify-center" onClick={handleImageClick}>
                <img src="/mathLogo.png" alt="math" className="w-16 h-16 object-cover rounded-t-lg" />
                <p className="text-center text-sm font-semibold text-gray-500">Maths</p>
              </div>
              <div className="flex flex-col px-16 py-5 rounded-lg shadow-lg  transition-transform duration-300 ease-in-out hover:scale-110 bg-indigo-200 cursor-pointer w-[260px] items-center justify-center" onClick={handleImageClick}>
                <img src="/physicsLogo.png" alt="physics" className="w-16 h-16 object-cover rounded-t-lg" />
                <p className="text-center text-sm font-semibold text-gray-500">Physics</p>
              </div>
              <div className="flex flex-col px-16 py-5 rounded-lg shadow-lg  transition-transform duration-300 ease-in-out hover:scale-110 bg-amber-200 cursor-pointer w-[260px] items-center justify-center" onClick={handleImageClick}>
                <img src="/chemistryLogo.png" alt="chemistry" className="w-16 h-16 object-cover rounded-t-lg" />
                <p className="text-center text-sm font-semibold text-gray-500">Chemistry</p>
              </div>
              <div className="flex flex-col px-16 py-5 rounded-lg shadow-lg  transition-transform duration-300 ease-in-out hover:scale-110 bg-lime-200 cursor-pointer w-[260px] items-center justify-center" onClick={handleImageClick}>
                <img src="/biologyLogo.png" alt="biology" className="w-16 h-16 object-cover rounded-t-lg" />
                <p className="text-center text-sm font-semibold text-gray-500">Biology</p>
              </div>
              <div className="flex flex-col px-16 py-5 rounded-lg shadow-lg  transition-transform duration-300 ease-in-out hover:scale-110 bg-red-200 cursor-pointer w-[260px] items-center justify-center" onClick={handleImageClick}>
                <img src="/englishLogo.png" alt="english" className="w-16 h-16 object-cover rounded-t-lg" />
                <p className="text-center text-sm font-semibold text-gray-500">English</p>
              </div>
              <div className="flex flex-col px-16 py-5 rounded-lg shadow-lg  transition-transform duration-300 ease-in-out hover:scale-110 bg-lime-100 cursor-pointer w-[260px] items-center justify-center" onClick={handleImageClick}>
                <img src="/geography.png" alt="Geography" className="w-16 h-16 object-cover rounded-t-lg" />
                <p className="text-center text-sm font-semibold text-gray-500">Geography</p>
              </div>
              <div className="flex flex-col px-16 py-5 rounded-lg shadow-lg  transition-transform duration-300 ease-in-out hover:scale-110 bg-indigo-200 cursor-pointer w-[260px] items-center justify-center" onClick={handleImageClick}>
                <img src="/Economics.png" alt="Geography" className="w-16 h-16 object-cover rounded-t-lg" />
                <p className="text-center text-sm font-semibold text-gray-500">Economics</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardPage;
