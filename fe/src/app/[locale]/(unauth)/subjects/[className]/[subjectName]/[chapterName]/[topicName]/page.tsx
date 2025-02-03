'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';
import CustomCardLoader from '@/components/CustomCardLoader';

const TopicPage = () => {
    const { className, subjectName, topicName, chapterName } = useParams();
    const router = useRouter();
    const formattedChapterName = typeof chapterName === 'string' ? chapterName.replace(/-/g, ' ') : '';
    const [content, setContent] = useState<string | null>(null);
    const [topics, setTopics] = useState<any[]>([]);
    const [relatedChapters, setRelatedChapters] = useState<any[]>([]);
    const [loadingTopics, setLoadingTopics] = useState<boolean>(true);
    const [loadingChapters, setLoadingChapters] = useState<boolean>(true);
    const [, setClickedTopicId] = useState<string | null>(null);

    useEffect(() => {
        // Get the chapterId and content from sessionStorage
        const id = sessionStorage.getItem('TopicId');
        const chapterId = sessionStorage.getItem('chapterId');

        // Fetch Topic Content
        if (id) {
            axios
                .get(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/topicNotes/getTopicNotes?TopicId=${id}`)
                .then((response) => {
                    if (response.data.TopicNotes && response.data.TopicNotes.length > 0) {
                        setContent(response.data.TopicNotes[0].content);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching topic notes:', error);
                });
        }

        // Fetch Topics for the Chapter
        if (chapterId) {
            axios
                .get(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/chapterTopic/getChapterTopic?chapterId=${chapterId}`)
                .then((response) => {
                    // Filter topics by publishStatus === 'published'
                    const filteredTopics = response.data.chapterTopics?.filter(
                        (topic: { publishStatus: string }) => topic.publishStatus === 'published'
                    );
                    setTopics(filteredTopics || []);
                })
                .catch((error) => {
                    console.error('Error fetching related topics:', error);
                })
                .finally(() => {
                    setLoadingTopics(false);
                });
        }

        // Fetch Related Chapters
        const classId = sessionStorage.getItem('classId');
        const subjectId = sessionStorage.getItem('subjectId');

        if (classId && subjectId) {
            axios
                .get(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/chapter/getChapter?subjectId=${subjectId}&classId=${classId}`)
                .then((response) => {
                    // Filter chapters by publishStatus === 'published'
                    const filteredChapters = response.data.chapters?.filter(
                        (chapter: { publishStatus: string; chapterName: string }) =>
                            chapter.publishStatus === 'published' &&
                            chapter.chapterName.replace(/-/g, ' ') !== formattedChapterName
                    );
                    setRelatedChapters(filteredChapters || []);
                })
                .catch((error) => {
                    console.error('Error fetching related chapters:', error);
                })
                .finally(() => {
                    setLoadingChapters(false);
                });
        }
    }, [topicName, chapterName]);

    const handleTopicClick = (topic: { _id: string; chapterTopicName: string }) => {
        setClickedTopicId(topic._id); // Set the clicked topic ID
        const formattedTopicName = topic.chapterTopicName.replace(/\s+/g, '-');
        sessionStorage.setItem('TopicId', topic._id);
        router.push(`/subjects/${className}/${subjectName}/${chapterName}/${formattedTopicName}`);
    };

    const goToChapterPage = (chapter: { chapterName: string; _id: string }) => {
        const formattedChapterName = chapter.chapterName.replace(/\s+/g, '-');
        sessionStorage.setItem('chapterId', chapter._id);
        router.push(`/subjects/${className}/${subjectName}/${formattedChapterName}`);
    };

    return (
        <>
            <Banner notMainPage={true} />
            <div className="min-h-screen bg-gray-50">
                <div className="px-4 sm:px-8 py-12">
                    <div className="w-full flex flex-col lg:flex-row gap-16">
                        <div className="w-full lg:w-2/3">
                            <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 mb-6">
                                Chapter {formattedChapterName} - Topic: {topicName}
                            </h1>

                            {loadingTopics ? (
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
                                <p className="my-4 font-light text-gray-500 text-lg">{content || 'No content available.'}</p>
                            )}
                        </div>

                        <div className="w-full lg:w-1/3">
                            <h2 className="text-xl tracking-tight font-extrabold text-gray-900 mb-4">
                                Related Topics in {formattedChapterName}
                            </h2>
                            <ul className="space-y-2 font-light text-gray-500">
                                {loadingTopics ? (
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
                                ) : topics.length > 0 ? (
                                    topics.map((topic, index) => (
                                        <li key={index}>
                                            <div
                                                className="cursor-pointer"
                                                onClick={() => handleTopicClick(topic)}
                                            >
                                                <span className="hover:underline">{topic.chapterTopicName}</span>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li>No related topics available.</li>
                                )}
                            </ul>

                            <h2 className="text-xl tracking-tight font-extrabold text-gray-900 mb-4 mt-6">
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
