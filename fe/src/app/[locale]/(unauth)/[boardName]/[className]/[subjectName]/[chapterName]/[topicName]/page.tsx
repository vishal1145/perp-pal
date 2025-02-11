'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';
import TopicContent from '@/components/TopicContent';

const TopicPage = () => {
    const { boardName, className, subjectName, topicName, chapterName } = useParams();
    const router = useRouter();
    const formattedChapterName = typeof chapterName === 'string' ? chapterName.replace(/-/g, ' ') : '';
    const [content, setContent] = useState<string | null>(null);
    const [topics, setTopics] = useState<any[]>([]);
    const [relatedChapters, setRelatedChapters] = useState<any[]>([]);
    const [loadingTopics, setLoadingTopics] = useState<boolean>(true);
    const [loadingChapters, setLoadingChapters] = useState<boolean>(true);
    const [, setClickedTopicId] = useState<string | null>(null);
    const formattedClassName = className ? className.toString().replace(/-/g, ' ') : 'Class 12';
    const formattedSubjectName = subjectName ? subjectName.toString().replace(/-/g, ' ') : 'BIOLOGY';

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
                    const filteredTopics = response.data.chapterTopics?.filter(
                        (topic: { publishStatus: string; _id: string }) =>
                            topic.publishStatus === 'published' &&
                            topic._id !== String(id)
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
        router.push(`/${boardName}/${className}/${subjectName}/${chapterName}/${formattedTopicName}`);
    };

    const goToChapterPage = (chapter: { chapterName: string; _id: string }) => {
        const formattedChapterName = chapter.chapterName.replace(/\s+/g, '-');
        sessionStorage.setItem('chapterId', chapter._id);
        router.push(`/${boardName}/${className}/${subjectName}/${formattedChapterName}`);
    };

    return (
        <>
            <Banner notMainPage={true} />
            <TopicContent
                formattedChapterName={formattedChapterName}
                topicName={formattedChapterName}
                content={content}
                topics={topics}
                relatedChapters={relatedChapters}
                loadingChapters={loadingChapters}
                loadingTopics={loadingTopics}
                handleTopicClick={handleTopicClick}
                goToChapterPage={goToChapterPage}
                className={formattedClassName}
                subjectName={formattedSubjectName}
            />
            <PreppalFooter />
            <Footer />

        </>
    );
};

export default TopicPage;
