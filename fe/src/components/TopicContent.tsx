'use client';

import React from 'react';
import CustomCardLoader from '@/components/CustomCardLoader';


interface TopicContentProps {
    className: string;
    subjectName: string;
    formattedChapterName: string;
    topicName: string;
    content: string | null;
    topics: any[];
    relatedChapters: any[];
    loadingTopics: boolean;
    loadingChapters: boolean;
    handleTopicClick: (topic: { chapterTopicName: string; _id: string }) => void;
    goToChapterPage: (chapter: { chapterName: string; _id: string }) => void;
}

const TopicContent: React.FC<TopicContentProps> = ({
    className,
    subjectName,
    formattedChapterName,
    topicName,
    content,
    topics,
    relatedChapters,
    loadingTopics,
    loadingChapters,
    handleTopicClick,
    goToChapterPage,
}) => {
    return (
        <div className=" bg-gray-50">
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
                            <p
                                className="my-4 font-light text-gray-500 text-lg"
                                dangerouslySetInnerHTML={{ __html: content || 'No content available.' }}
                            ></p>

                        )}
                    </div>

                    <div className="w-full lg:w-1/3">
                        {/* Render the related topics section only if topics are available */}
                        {topics.length > 0 || relatedChapters.length > 0 ? (
                            <>
                                {/* Render "Related Topics" only if topics are available */}
                                {topics.length > 0 && (
                                    <>
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
                                    </>
                                )}

                                {/* Render "Related Chapters" only if related chapters are available */}
                                {relatedChapters.length > 0 && (
                                    <>
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
                                    </>
                                )}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicContent;
