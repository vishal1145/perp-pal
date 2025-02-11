'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';

import Topic from '../../../../../../../components/Topic';
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
        const id = sessionStorage.getItem('chapterId');
        const storedContent = sessionStorage.getItem('chapterContent');
        setContent(storedContent);

        if (id) {
            axios
                .get(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/chapterTopic/getChapterTopic?chapterId=${id}`)
                .then((response) => {
                    const filteredTopics = response.data.chapterTopics?.filter(
                        (topic: { publishStatus: string; }) => topic.publishStatus === 'published'
                    );
                    setTopics(filteredTopics || []);
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
                    const filteredChapters = response.data.chapters?.filter(
                        (chapter: { publishStatus: string; chapterName: string; }) => chapter.publishStatus === 'published' &&
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
    }, [chapterName]); 

    const goToTopicPage = (chapterTopic: { chapterTopicName: string; _id: string }) => {
        setClickedTopicId(chapterTopic._id); // Set the clicked topic ID
        const formattedTopicName = chapterTopic.chapterTopicName.replace(/\s+/g, '-');
        sessionStorage.setItem('TopicId', chapterTopic._id);
        router.push(`/class/${className}/${subjectName}/${chapterName}/${formattedTopicName}`);
    };

    const goToChapterPage = (chapter: { chapterName: string; _id: string }) => {
        const formattedChapterName = chapter.chapterName.replace(/\s+/g, '-');
        sessionStorage.setItem('chapterId', chapter._id);
        router.push(`/class/${className}/${subjectName}/${formattedChapterName}`);
    };
    const formattedClassName = className ? className.toString().replace(/-/g, ' ') : 'Class 12';
    const formattedSubjectName = subjectName ? subjectName.toString().replace(/-/g, ' ') : 'BIOLOGY';

    const classNameString = Array.isArray(formattedClassName) ? formattedClassName.join(' ') : formattedClassName;
    const [classPart, numberPart] = classNameString.includes('-')
        ? classNameString.split('-')
        : classNameString.split(' ');
    const safeClassPart = classPart || '';
    const safeNumberPart = numberPart || '';
    return (
        <>
            <Banner notMainPage={true} />
            <Topic
                // boardName={boardName || 'Board'}
                className={formattedClassName}
                subjectName={formattedSubjectName}
                chapterName={formattedChapterName}
                content={content}
                topics={topics}
                relatedChapters={relatedChapters}
                loadingChapters={loadingChapters}
                loadingTopic={loadingTopic}
                clickedTopicId={clickedTopicId}
                goToTopicPage={goToTopicPage}
                goToChapterPage={goToChapterPage}
                classPart={safeClassPart}
                numberPart={safeNumberPart}
            />
            <PreppalFooter />
            <Footer />

        </>
    );
};

export default TopicPage;
