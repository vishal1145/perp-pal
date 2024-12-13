'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { courses } from "@/data/course";
import { videos } from "@/data/video";

const Tuitions = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/classes');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 bg-gray-100 flex flex-wrap items-center p-5 rounded-lg">
          <img src="assets/images/logo1.png" className="h-14 mr-4 sm:mr-8" alt="Logo" />
          <div>
            <h1 className="text-2xl font-bold">Good Afternoon, Yash Gupta!</h1>
            <p className="text-gray-500 mt-2">Get the PrepPal Learning Advantage</p>
          </div>
        </div>

     
        <div className="mb-12">
        
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-gray-100 shadow-md rounded-lg p-4 flex-shrink-0 transition-transform transform hover:scale-105"
                  onClick={handleClick}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-40 w-full object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                  <p className="text-gray-600 mb-1">{course.description}</p>
                  <span className="text-gray-500 mb-1">⭐ ⭐ ⭐ ⭐ {course.rating}</span>
                  <p className="text-gray-600 font-bold mb-3">{course.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No courses available at the moment.</p>
          )}
        </div>

        
        <div>
          <h2 className="text-xl text-gray-700 mb-6">Watch Videos - Learn with PrepPal</h2>
          {videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col text-left transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <video
                    src={video.videoSrc}
                    controls
                    className="h-40 w-full object-cover rounded-lg mb-4"
                  ></video>
                  <div className="flex items-center mb-2">
                    <img
                      src={video.subjectImage}
                      className="h-6 w-6 mr-5"
                      alt={video.subject}
                    />
                    <p className="text-gray-500 text-sm font-medium">{video.subject}</p>
                  </div>
                  <p className="text-md font-semibold text-gray-700 truncate">{video.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No videos available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tuitions;
