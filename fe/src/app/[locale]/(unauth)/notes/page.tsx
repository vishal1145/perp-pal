'use client';
import React, { useState } from 'react';
import { Banner } from '@/components/Banner';
import Image from 'next/image';
import UPBoardLogo from '../../../../../public/assets/images/UP State Board Icon.png'
import CBSEBoardLogo from '../../../../../public/assets/images/cbsclogo.jpg'
import StateBoardLogo from '../../../../../public/assets/images/stateboard.jpg'
import BiharBoardLogo from '../../../../../public/assets/images/bihar.png'
import ICSEBoardLogo from '../../../../../public/assets/images/icse.jpg'
const BoardPage = () => {
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [loadingUserData, setLoadingUserData] = useState();

    const boardData = {
        "UP Board": {
            image: UPBoardLogo,
            subjects: ["Hindi", "English", "Maths", "Science", "Social Studies"],
        },
        "CBSE Board": {
            image: CBSEBoardLogo,
            subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
        },
        "Bihar Board": {
            image: BiharBoardLogo,
            subjects: ["Hindi", "Sanskrit", "History", "Geography", "Political Science"],
        },
        "ICSE Board": {
            image: ICSEBoardLogo,
            subjects: ["English Literature", "Mathematics", "Environmental Science", "History & Civics", "Physics"],
        },
        "State Board": {
            image: StateBoardLogo,
            subjects: ["Economics", "Accountancy", "Business Studies", "Statistics", "Computer Applications"],
        },
    };

    return (
        <div className="min-h-screen p-5">
            <Banner notMainPage={true} loadingUserData={loadingUserData} />
            <h1 className="text-3xl font-bold text-center mt-6 mb-6">Education Boards</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.keys(boardData).map((board, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedBoard(board)}
                        className="cursor-pointer bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className='flex items-center justify-center'>
                            <Image
                                src={boardData[board].image}
                                alt={`${board} Logo`}
                                className="w-14 h-14 object-contain mr-6"
                                priority
                            />
                            <h2 className="text-xl font-semibold text-center text-gray-600">{board}</h2>
                        </div>

                    </div>
                ))}
            </div>

            {selectedBoard && (
                <div className="mt-10 bg-gray-100 p-5 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">{selectedBoard} - Subjects</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">#</th>
                                <th className="border border-gray-300 px-4 py-2">Subject Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boardData[selectedBoard].subjects.map((subject, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{subject}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => setSelectedBoard(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default BoardPage;
