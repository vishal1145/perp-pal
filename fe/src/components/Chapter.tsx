'use client';

import React from 'react';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';
import CustomCardLoader from '@/components/CustomCardLoader';
import Loader from '@/components/Loader';

interface ClassObj {
    className: string;
    classId: string;
    content: string;
}

interface Subject {
    _id: string;
    subjectName: string;
    content: string;
}

interface Chapter {
    _id: string;
    chapterName: string;
    content: string;
}

interface LearningPageProps {
    boardName?: string;
    className: string;
    subjectName: string;
    content: string | null;
    chapters: Chapter[];
    allClasses: ClassObj[];
    allSubjects: Subject[];
    loadingChapters: boolean;
    loadingSubjects: boolean;
    clickChapterId: string | null;
    handleSubjectClick: (subject: Subject) => void;
    handleClassClick: (classItem: ClassObj) => void;
    goToChapterPage: (chapter: Chapter) => void;
    classPart: string;
    numberPart: string;
    formattedClassName: string;
    formattedSubjectName: string
}

const ChapterPage: React.FC<LearningPageProps> = ({
    boardName,
    className,
    subjectName,
    content,
    chapters,
    allClasses,
    allSubjects,
    loadingChapters,
    loadingSubjects,
    clickChapterId,
    handleSubjectClick,
    handleClassClick,
    goToChapterPage,
    classPart,
    numberPart,
    formattedClassName,
    formattedSubjectName
}) => {
    return (
        <>

            <Banner notMainPage={true} />
            <div className=" px-4 sm:px-8 mb-8">
                <div className="w-full pt-8">
                    <div className="flex flex-col md:flex-row gap-16 w-full">
                        <div className="w-[70%]">
                            <h1 className="text-2xl tracking-tight font-extrabold text-gray-900">
                                {boardName && boardName.trim() !== ""
                                    ? `${boardName} ${className} ${subjectName}`
                                    : `NCERT Solutions for ${className} ${subjectName}`}
                            </h1>


                            {loadingChapters ? (
                                <div>
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <CustomCardLoader
                                            key={index}
                                            viewBox="0 0 380 10"
                                            className="text-3xl text-gray-800 mt-3 bg-gray-200"
                                            rectW="100%"
                                            rectH="10"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="my-4 font-light text-gray-500 text-lg" dangerouslySetInnerHTML={{ __html: content || 'No content available.' }}></p>
                            )}

                            <div className="mt-6">
                                <table className="w-full border border-gray-300 text-left font-light text-gray-500">
                                    <tbody>
                                        <tr className="border-b border-gray-300">
                                            <th className="p-3 font-medium text-gray-700">{classPart}</th>
                                            <td className="p-3 border border-gray-300">{numberPart}</td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <th className="p-3 font-medium text-gray-700">Subject</th>
                                            <td className="p-3 border border-gray-300">{subjectName}</td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <th className="p-3 font-medium text-gray-700">Number of Chapters</th>
                                            <td className="p-3 border border-gray-300">{chapters.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-5">
                                <h2 className="text-xl font-bold tracking-tight text-gray-900">Ncert Syllabus for {formattedClassName} {formattedSubjectName}</h2>

                                <ul className="list-none py-5 font-light text-gray-500">
                                    {loadingChapters ? (
                                        <div>
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <CustomCardLoader
                                                    key={index}
                                                    viewBox="0 0 380 10"
                                                    className="text-3xl text-gray-800 mt-3 bg-gray-200"
                                                    rectW="100%"
                                                    rectH="10"
                                                />
                                            ))}
                                        </div>

                                    ) :
                                        chapters.length > 0 ? (
                                            chapters.map((chapter, index) => (
                                                <li key={index}>
                                                    {clickChapterId === chapter._id ? (
                                                        <Loader />
                                                    ) : (
                                                        <div className="flex flex-row items-center gap-2 mb-2 cursor-pointer " onClick={() => goToChapterPage(chapter)}>
                                                            <span className="w-24 shrink-0">Chapter {index + 1}:</span>
                                                            <span className="hover:underline">{chapter.chapterName}</span>
                                                        </div>
                                                    )}
                                                </li>

                                            ))
                                        ) : (
                                            <li>No chapters available for this subject.</li>
                                        )}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-start">
                            <div className="mt-0">
                                {/* Render only if there are subjects or classes available */}
                                {(allSubjects.length > 0 || allClasses.length > 0) && (
                                    <>
                                        {/* Render "Other subjects" section only if there are subjects */}
                                        {allSubjects.length > 0 && (
                                            <>
                                                <h2 className="text-xl font-bold tracking-tight text-gray-900">Other subjects for {formattedClassName}</h2>
                                                <ul className="mt-4 font-light text-gray-500 space-y-2">
                                                    {loadingSubjects ? (
                                                        <div>
                                                            {Array.from({ length: 6 }).map((_, index) => (
                                                                <CustomCardLoader
                                                                    key={index}
                                                                    viewBox="0 0 380 20"
                                                                    className="text-3xl text-gray-800 mt-3 bg-gray-200"
                                                                    rectW="100%"
                                                                    rectH="20"
                                                                />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        allSubjects.map((subject, index) => (
                                                            <li key={index} className="cursor-pointer hover:underline">
                                                                <span onClick={() => handleSubjectClick(subject)}>
                                                                    Ncert Solutions for {formattedClassName} {subject.subjectName}
                                                                </span>
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            </>
                                        )}

                                        {/* Render "Other classes" section only if there are classes */}
                                        {allClasses.length > 0 && (
                                            <>
                                                <h2 className="text-xl font-bold tracking-tight text-gray-900 mt-8">Other classes for {formattedSubjectName}</h2>
                                                <ul className="mt-4 font-light text-gray-500 space-y-2">
                                                    {loadingSubjects ? (
                                                        <div>
                                                            {Array.from({ length: 6 }).map((_, index) => (
                                                                <CustomCardLoader
                                                                    key={index}
                                                                    viewBox="0 0 380 20"
                                                                    className="text-3xl text-gray-800 mt-3 bg-gray-200"
                                                                    rectW="100%"
                                                                    rectH="20"
                                                                />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        allClasses.map((classItem) => (
                                                            <li key={classItem.classId} className="cursor-pointer hover:underline" onClick={() => handleClassClick(classItem)}>
                                                                Ncert Solutions for {classItem.className} {formattedSubjectName}
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <PreppalFooter />
            <Footer />
        </>
    );
};

export default ChapterPage;
