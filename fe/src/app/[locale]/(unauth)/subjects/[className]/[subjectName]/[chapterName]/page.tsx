'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import CustomCardLoader from '@/components/CustomCardLoader';

const TopicPage = () => {
    const { className, subjectName, chapterName } = useParams();
    const formattedChapterName = typeof chapterName === 'string' ? chapterName.replace(/-/g, ' ') : '';
    const [content, setContent] = useState<string | null>(null);
    const [topics, setTopics] = useState<any[]>([]);
    const [relatedChapters, setRelatedChapters] = useState<any[]>([]);
    const router = useRouter();
    const [loadingChapters, setLoadingChapters] = useState<boolean>(true);
    const [loadingTopic, setLoadingTopic] = useState<boolean>(true);
    const [clickedTopicId, setClickedTopicId] = useState<string | null>(null);

    useEffect(() => {
        // Get the chapterId and content from sessionStorage
        const id = sessionStorage.getItem('chapterId');
        const storedContent = sessionStorage.getItem('chapterContent');
        setContent(storedContent);

        if (id) {
            axios
                .get(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/chapterTopic/getChapterTopic?chapterId=${id}`)
                .then((response) => {
                    setTopics(response.data.chapterTopics || []);
                })
                .catch((error) => {
                    console.error('Error fetching topics:', error);
                })
                .finally(() => {
                    setLoadingTopic(false);
                });
        }

        const classId = sessionStorage.getItem('classId');
        const subjectId = sessionStorage.getItem('subjectId');

        if (classId && subjectId) {
            axios
                .get(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/chapter/getChapter?subjectId=${subjectId}&classId=${classId}`)
                .then((response) => {
                    const filteredChapters = response.data.chapters.filter(
                        (chapter: { chapterName: string }) =>
                            chapter.chapterName.replace(/-/g, ' ') !== formattedChapterName
                    );
                    setRelatedChapters(filteredChapters);
                })
                .catch((error) => {
                    console.error('Error fetching related chapters:', error);
                })
                .finally(() => {
                    setLoadingChapters(false);
                });
        }
    }, [chapterName]);

    const goToTopicPage = (chapterTopic: { chapterTopicName: string; _id: string }) => {
        setClickedTopicId(chapterTopic._id); // Set the clicked topic ID
        const formattedTopicName = chapterTopic.chapterTopicName.replace(/\s+/g, '-');
        sessionStorage.setItem('TopicId', chapterTopic._id);
        router.push(`/subjects/${className}/${subjectName}/${chapterName}/${formattedTopicName}`);
    };

    const goToChapterPage = (chapter: { chapterName: string; _id: string }) => {
        const formattedChapterName = chapter.chapterName.replace(/\s+/g, '-');
        sessionStorage.setItem('chapterId', chapter._id);
        router.push(`/subjects/${className}/${subjectName}/${formattedChapterName}`);
    };

    const formattedClassName = className || 'Class 12';
    const classNameString = Array.isArray(formattedClassName) ? formattedClassName.join(' ') : formattedClassName;
    const [classPart, numberPart] = classNameString.includes('-')
        ? classNameString.split('-')
        : classNameString.split(' ');

    return (
        <>
            <Banner notMainPage={true} />
            <div className="min-h-screen bg-gray-50">
                <div className="px-4 sm:px-8 py-12">
                    <div className="w-full flex flex-col lg:flex-row gap-16">
                        <div className="w-full lg:w-2/3">
                            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 mb-6">
                                Chapter {formattedChapterName} NCERT Solutions
                            </h1>
                            {loadingChapters ? (
                                <div>
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <CustomCardLoader
                                            key={index}
                                            viewBox="0 0 380 10"
                                            className="text-3xl text-gray-800 my-3 bg-gray-200"
                                            rectW="100%"
                                            rectH="10"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="my-4 font-light text-gray-500 text-lg">{content}</p>
                            )}

                            <table className="table-auto w-full text-left font-light text-gray-500 border-collapse border border-gray-200">
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-2 px-4 font-medium text-gray-700">{classPart}</td>
                                        <td className="py-2 px-4 border border-gray-200">{numberPart}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="py-2 px-4 font-medium text-gray-700">Chapter</td>
                                        <td className="py-2 px-4 border border-gray-200">{formattedChapterName}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="w-full mt-6">
                                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900">
                                    Topics in {chapterName}
                                </h1>
                                <ul className="mt-6 space-y-4 font-light text-gray-500">
                                    {loadingTopic ? (
                                        <div>
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <CustomCardLoader
                                                    key={index}
                                                    viewBox="0 0 380 10"
                                                    className="text-3xl text-gray-800 my-3 bg-gray-200"
                                                    rectW="100%"
                                                    rectH="10"
                                                />
                                            ))}
                                        </div>
                                    ) : topics.length > 0 ? (
                                        topics.map((topic, index) => (
                                            <li key={index}>
                                                {clickedTopicId === topic._id ? (
                                                    <Loader />
                                                ) : (
                                                    <div
                                                        className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
                                                        onClick={() => goToTopicPage(topic)}
                                                    >
                                                        <span className="w-24 shrink-0 font-medium text-gray-700">
                                                            Topic {index + 1}:
                                                        </span>
                                                        <span className="hover:underline">{topic.chapterTopicName}</span>
                                                    </div>
                                                )}
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
                                {loadingChapters ? (
                                    <div>
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <CustomCardLoader
                                                key={index}
                                                viewBox="0 0 380 20"
                                                className="text-3xl text-gray-800 my-3 bg-gray-200"
                                                rectW="100%"
                                                rectH="20"
                                            />
                                        ))}
                                    </div>
                                ) : relatedChapters.length > 0 ? (
                                    relatedChapters.map((chapter, index) => (
                                        <li key={index}>
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => goToChapterPage(chapter)}
                                            >
                                                <span className="hover:underline">{chapter.chapterName}</span>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li>No related chapters available.</li>
                                )}
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
