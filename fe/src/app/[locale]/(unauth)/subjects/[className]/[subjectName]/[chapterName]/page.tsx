'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';

const TopicPage = () => {
    const { className, subjectName, chapterName } = useParams();
    const [topics, setTopics] = useState<any[]>([]);
    const router = useRouter();
    useEffect(() => {
        const id = sessionStorage.getItem('chapterId');
        if (id) {
            axios
                .get(`/api/chapterTopic/getChapterTopic?chapterId=${id}`)
                .then((response) => {
                    console.log('API response:', response.data);
                    setTopics(response.data.chapterTopics || []);
                })
                .catch((error) => {
                    console.error('Error fetching topics:', error);
                });
        }
    }, []);
    const formattedClassName = className || 'Class 12';
    const classNameString = Array.isArray(formattedClassName) ? formattedClassName.join(' ') : formattedClassName;
    const [classPart, numberPart] = classNameString.includes('-')
        ? classNameString.split('-')
        : classNameString.split(' ');
    const goToTopicPage = (chapterTopic: { chapterTopicName: string; _id: string }) => {
        const formattedChapterName = chapterTopic.chapterTopicName.replace(/\s+/g, '-');
        sessionStorage.setItem('TopicId', chapterTopic._id);
        router.push(`/subjects/${className}/${subjectName}/${chapterName}/${formattedChapterName}`);
    };
    return (
        <>
            <Banner notMainPage={true} />
            <div className="min-h-screen bg-gray-50">
                <div className=" px-4 sm:px-8 py-12">
                    <div className="w-full flex flex-col lg:flex-row gap-16">

                        <div className="w-full lg:w-2/3">
                            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 mb-6">
                                Chapter {chapterName} NCERT Solutions
                            </h1>
                            <p className="font-light text-gray-500 text-lg mb-6">
                                Matrices are one of the most powerful tools in mathematics. The evolution of the concept
                                of matrices is the result of an attempt to obtain compact and simple methods of solving
                                a system of linear equations. Matrix notation and operations are used in electronic
                                spreadsheet programs for personal computers, which in turn are used in different areas
                                of business and science like budgeting, sales projection, cost estimation, analyzing the
                                result of an experiment, etc.
                            </p>
                            <button className="text-blue-600 font-semibold hover:underline mb-8">
                                Read More
                            </button>
                            <table className="table-auto w-full text-left font-light text-gray-500 border-collapse border border-gray-200">
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-2 px-4 font-medium text-gray-700">{classPart}</td>
                                        <td className="py-2 px-4 border border-gray-200">{numberPart}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-2 px-4 font-medium text-gray-700">Chapter</td>
                                        <td className="py-2 px-4 border border-gray-200">{chapterName}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-2 px-4 font-medium text-gray-700">Medium</td>
                                        <td className="py-2 px-4 border border-gray-200">English</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-medium text-gray-700">Academic Year</td>
                                        <td className="py-2 px-4 border border-gray-200">2023–2024</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="w-full mt-6">

                                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900">
                                    Topics in {chapterName}
                                </h1>
                                <ul className="mt-6 space-y-4 font-light text-gray-500">
                                    {topics.length > 0 ? (
                                        topics.map((topic, index) => (
                                            <li key={index}>
                                                <div className="flex flex-row items-center gap-2 mb-2 cursor-pointer" onClick={() => goToTopicPage(topic)}>
                                                    <span className="w-24 shrink-0 font-medium text-gray-700">
                                                        Topic {index + 1}:
                                                    </span>
                                                    <span className="hover:underline">{topic.chapterTopicName}</span>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No topics available for this chapter.</li>
                                    )}
                                </ul>
                            </div>

                        </div>

                        <div className="w-full lg:w-1/3">
                            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 mb-4">
                                Related Chapters for NCERT {className} {subjectName}
                            </h2>
                            <ul className="space-y-2 font-light text-gray-500">
                                <li>RELATIONS AND FUNCTIONS for {className} MATHS</li>
                                <li>SETS for {className} MATHS</li>
                                <li>INVERSE TRIGONOMETRIC FUNCTIONS for {className} MATHS</li>
                                <li>MATRICES for {className} MATHS</li>
                                <li>DETERMINANTS for {className} MATHS</li>
                                <li>CONTINUITY AND DIFFERENTIABILITY for {className} MATHS</li>
                                <li>APPLICATION OF DERIVATIVES for {className} MATHS</li>
                                <li>INTEGRALS for {className} MATHS</li>
                                <li>APPLICATION OF INTEGRALS for {className} MATHS</li>
                                <li>DIFFERENTIAL EQUATIONS for {className} MATHS</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <PreppalFooter />
                <Footer />
            </div>
        </>
    );
};

export default TopicPage;
