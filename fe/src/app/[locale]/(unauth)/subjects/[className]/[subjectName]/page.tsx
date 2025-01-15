'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
    const { className, subjectName } = useParams();

    const [chapters, setChapters] = useState<any[]>([]);
    const router = useRouter();
    const formattedClassName = className || 'Class 12';
    const classNameString = Array.isArray(formattedClassName) ? formattedClassName.join(' ') : formattedClassName;
    const [classPart, numberPart] = classNameString.includes('-')
        ? classNameString.split('-')
        : classNameString.split(' ');
    const formattedSubjectName = subjectName || 'BIOLOGY';
    useEffect(() => {
        const id = sessionStorage.getItem('subjectId');
        const classId = sessionStorage.getItem('classId');
        if (id && classId) {
            axios
                .get(`/api/chapter/getChapter?subjectId=${id}&classId=${classId}`)
                .then((response) => {
                    console.log("response.data", response.data);

                    if (Array.isArray(response.data.chapters)) {
                        const filteredChapters = response.data.chapters.filter((chapter: { subjectId: string }) => chapter.subjectId === id);
                        setChapters(filteredChapters);
                    } else {
                        console.error("response.data.chapters is not an array:", response.data);
                        setChapters([]);
                    }

                })
                .catch((error) => {
                    console.error('Error fetching chapters:', error);
                });
        }
    }, []);
    const goToChapterPage = (chapter: { chapterName: string; _id: string }) => {
        const formattedChapterName = chapter.chapterName.replace(/\s+/g, '-');
        sessionStorage.setItem('chapterId', chapter._id);
        router.push(`/subjects/${className}/${subjectName}/${formattedChapterName}`);
    };


    return (
        <>
            <Banner notMainPage={true} />
            <div className="min-h-screen">
                <div className="px-4 sm:px-8 mb-8">
                    <div className="w-full pt-8">
                        <div className="flex flex-col md:flex-row gap-16 w-[100%]">
                            <div className="w-[70%]">
                                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900">
                                    NCERT Solutions for {formattedClassName} {formattedSubjectName}
                                </h1>
                                <p className="mt-4 font-light text-gray-500 text-lg">
                                    NCERT Solutions for {formattedClassName} {formattedSubjectName} aims to help a student develop a comprehensive conceptual understanding of all the topics included in the CBSE {formattedClassName} {formattedSubjectName} Syllabus. The CBSE {formattedClassName} {formattedSubjectName} NCERT Solutions is important for {formattedClassName}th board exams preparation. NCERT Solutions for {formattedClassName} {formattedSubjectName} will help you score excellent marks in CBSE {formattedClassName} board exams and help you qualify the engineering entrance exams such as <span className="font-semibold">JEE Main, JEE Advanced, BITSAT, VITEEE, SRMJEEE</span>, etc.
                                </p>
                                <div className="mt-6">
                                    <table className="w-full border border-gray-300 text-left font-light text-gray-500">
                                        <tbody>
                                            <tr className="border-b border-gray-300">
                                                <th className="p-3 font-medium text-gray-700">{classPart}</th>
                                                <td className="p-3 border border-gray-300">{numberPart}</td>
                                            </tr>
                                            <tr className="border-b border-gray-300">
                                                <th className="p-3 font-medium text-gray-700">Subject</th>
                                                <td className="p-3 border border-gray-300">{formattedSubjectName}</td>
                                            </tr>
                                            <tr className="border-b border-gray-300">
                                                <th className="p-3 font-medium text-gray-700">Number of Chapters</th>
                                                <td className="p-3 border border-gray-300">16</td>
                                            </tr>
                                            <tr className="border-b border-gray-300">
                                                <th className="p-3 font-medium text-gray-700">Medium</th>
                                                <td className="p-3 border border-gray-300">English</td>
                                            </tr>
                                            <tr>
                                                <th className="p-3 font-medium text-gray-700">Academic Year</th>
                                                <td className="p-3 border border-gray-300">2023–2024</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-5'>
                                    <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Ncert Syllabus for {formattedClassName} {formattedSubjectName}</h2>
                                    <ul className="list-none py-5 font-light text-gray-500">
                                        {chapters.length > 0 ? (
                                            chapters.map((chapter, index) => (
                                                <li key={index}>
                                                    <div className="flex flex-row items-center gap-2 mb-2 cursor-pointer " onClick={() => goToChapterPage(chapter)}>
                                                        <span className="w-24 shrink-0">Chapter {index + 1}:</span>
                                                        <span className='hover:underline'>{chapter.chapterName}</span>


                                                    </div>
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
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Other subjects for {formattedClassName}</h2>
                                    <ul className="mt-4 font-light text-gray-500 space-y-2 ">
                                        <li>Ncert Solutions for {formattedClassName} MATHS</li>
                                        <li>Ncert Solutions for {formattedClassName} PHYSICS</li>
                                        <li>Ncert Solutions for {formattedClassName} CHEMISTRY</li>
                                        <li>Ncert Solutions for {formattedClassName} HINDI</li>
                                        <li>Ncert Solutions for {formattedClassName} ENGLISH</li>
                                    </ul>
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">Other classes for {formattedSubjectName}</h2>
                                    <ul className="mt-4 font-light text-gray-500 space-y-2 ">
                                        <li>Ncert Solutions for Class 6 {formattedSubjectName}</li>
                                        <li>Ncert Solutions for Class 7 {formattedSubjectName}</li>
                                        <li>Ncert Solutions for Class 8 {formattedSubjectName}</li>
                                        <li>Ncert Solutions for Class 9 {formattedSubjectName}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PreppalFooter />
                <Footer />
            </div>
        </>
    );
};

export default Page;
