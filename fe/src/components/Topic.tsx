'use client';

import React from 'react';
import CustomCardLoader from '@/components/CustomCardLoader';
import Loader from '@/components/Loader';

interface TopicContentProps {
    boardName?: string;
    className: string;
    subjectName: string;
    chapterName: string;
    content: string | null;
    topics: any[];
    relatedChapters: any[];
    loadingChapters: boolean;
    loadingTopic: boolean;
    clickedTopicId: string | null;
    classPart: string;
    numberPart: string;
    goToTopicPage: (topic: { chapterTopicName: string; _id: string }) => void;
    goToChapterPage: (chapter: { chapterName: string; _id: string }) => void;
}

const TopicPage: React.FC<TopicContentProps> = ({
    className,
    subjectName,
    chapterName,
    content,
    topics,
    relatedChapters,
    loadingChapters,
    loadingTopic,
    clickedTopicId,
    goToTopicPage,
    goToChapterPage,
    classPart,
    numberPart
}) => {

    const formattedChapterName = chapterName.replace(/-/g, ' ');
    return (
        <div className=" bg-gray-50">
            <div className="px-4 sm:px-8 py-12">
                <div className="w-full flex flex-col lg:flex-row gap-16">
                    <div className="w-full lg:w-2/3">
                        <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 mb-6">
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
                            <p
                                className="my-4 font-light text-gray-500 text-lg"
                                dangerouslySetInnerHTML={{ __html: content || 'No content available.' }}
                            ></p>
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
                            <h1 className="text-xl tracking-tight font-extrabold text-gray-900">
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
                        {/* Render "Related Chapters" section only if related chapters are available */}
                        {relatedChapters.length > 0 && (
                            <>
                                <h2 className="text-xl tracking-tight font-extrabold text-gray-900 mb-4">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicPage;
