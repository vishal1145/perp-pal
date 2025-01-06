'use client'
import React from 'react'

const page = ({ handleClassClick, handleImageClick, selectedClass, classes }) => {
    return (
        <div>
            <h2 className="m-0 mb-4 text-2xl font-medium sm:text-2xl">Subject wise learning</h2>
            <div className="bg-gray-100 gap-14 shadow-2xl rounded-2xl inline-flex justify-between items-center p-4">
                {classes.map((classItem) => (
                    <p
                        key={classItem._id}
                        onClick={() => handleClassClick(classItem.className)}
                        className={`text-lg font-medium cursor-pointer text-gray-800 rounded-xl transition-all duration-300 ease-in-out ${selectedClass === classItem.className
                            ? 'bg-blue-300 text-white px-4 py-2'
                            : 'hover:bg-gray-700 hover:text-white px-3 py-1'
                            }`}
                    >
                        {classItem.className}
                    </p>
                ))}
            </div>
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
            <div className="mt-6">
                <p className="text-lg text-gray-700">
                    Access a curated collection of subject-specific study materials tailored for your class. Dive into detailed explanations and examples for complex topics. Get personalized learning recommendations based on your progress. Explore practice exercises and mock tests to boost your confidence. Join a community of learners to discuss doubts and share insights.
                </p>
            </div>
        </div>
    )
}

export default page