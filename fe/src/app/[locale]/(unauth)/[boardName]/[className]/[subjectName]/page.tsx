'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ChapterPage from '../../../../../../components/Chapter';
interface ClassObj {
    className: string;
    classId: string;
    content: string;
}

const Page = () => {
    const { boardName, className, subjectName } = useParams();
    const [chapters, setChapters] = useState<any[]>([]);
    const [content, setContent] = useState<string | null>(null);
    const [allClasses, setAllClasses] = useState<ClassObj[]>([]);

    const [allSubjects, setAllSubjects] = useState<{ _id: string; subjectName: string; content: string }[]>([]);
    const router = useRouter();
    // const formattedClassName = Array.isArray(className)
    //     ? className.join(' ').replace(/-/g, ' ')
    //     : (className || 'Class 12').replace(/-/g, ' ');
    const formattedBoardName = boardName ? boardName.toString() : '';
    const formattedClassName = className ? className.toString().replace(/-/g, ' ') : 'Class 12';
    const formattedSubjectName = subjectName ? subjectName.toString().replace(/-/g, ' ') : 'BIOLOGY';

    const classNameString = Array.isArray(formattedClassName) ? formattedClassName.join(' ') : formattedClassName;
    const [classPart, numberPart] = classNameString.includes('-')
        ? classNameString.split('-')
        : classNameString.split(' ');
    const safeClassPart = classPart || '';
    const safeNumberPart = numberPart || '';
    // const formattedSubjectName = subjectName || 'BIOLOGY';
    const [loadingChapters, setLoadingChapters] = useState<boolean>(true);
    const [loadingSubject, setLoadingSubject] = useState<boolean>(true);
    const [clickChapterId, setClickChapterId] = useState<string | null>(null);


    useEffect(() => {
        const id = sessionStorage.getItem('subjectId');
        const classId = sessionStorage.getItem('classId');
        const storedContent = sessionStorage.getItem('content');
        const boardId = sessionStorage.getItem('boardId');
        setContent(storedContent);

        // Fetch chapters
        if (id && classId) {
            let url = `${process.env.NEXT_PUBLIC_Tutor_API_URI}/chapter/getChapter?subjectId=${id}&classId=${classId}`;

            if (boardId) {
                url += `&boardId=${boardId}`;
            }

            axios
                .get(url)
                .then((response) => {
                    if (Array.isArray(response.data.chapters)) {
                        // Filter chapters with publishStatus 'published'
                        const publishedChapters = response.data.chapters.filter(
                            (chapter: { publishStatus: string; }) => chapter.publishStatus === 'published'
                        );
                        setChapters(publishedChapters);
                    } else {
                        setChapters([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching chapters:', error);
                })
                .finally(() => {
                    setLoadingChapters(false);
                });
        }

        axios
            .get(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/subject/getAllSubject`)
            .then((response) => {
                if (response.data && Array.isArray(response.data.subject)) {
                    const subjects = response.data.subject.filter(
                        (subject: {
                            publishStatus: string; classIds: Array<{ className: string }>; subjectName: string; boardId: { _id: string };
                        }) =>
                            subject.classIds.some((classObj) => classObj.className === formattedClassName) && subject.boardId._id === boardId &&
                            !formattedSubjectName.includes(subject.subjectName) &&
                            subject.publishStatus === "published" // Filter subjects with publishStatus 'published'
                    );

                    setAllSubjects(
                        subjects.map((subject: { _id: string; subjectName: string; content: string }) => ({
                            _id: subject._id,
                            subjectName: subject.subjectName,
                            content: subject.content,
                        }))
                    );

                    const processedData: { content: string; classId: string; className: string }[] = [];

                    response.data.subject
                        .filter((subject: {
                            publishStatus: string; subjectName: string; boardId: { _id: string };
                        }) =>
                            formattedSubjectName.includes(subject.subjectName) && subject.publishStatus === "published" && subject.boardId._id === boardId
                        )
                        .forEach((subject: { content: string; classIds: Array<{ _id: string; className: string }> }) => {
                            subject.classIds.forEach((classObj) => {
                                if (classObj.className !== formattedClassName) {
                                    processedData.push({
                                        content: subject.content,
                                        classId: classObj._id,
                                        className: classObj.className,
                                    });
                                }
                            });
                        });

                    setAllClasses(processedData);
                } else {
                    console.error('Unexpected API response structure:', response.data);
                    setAllSubjects([]);
                    setAllClasses([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
            })
            .finally(() => {
                setLoadingSubject(false);
            });
    }, [formattedSubjectName, formattedClassName]);

    const handleSubjectClick = (subject: { _id: string; subjectName: string; content: string }) => {
        const selectedClass = formattedClassName;
        const selectedClassId = sessionStorage.getItem('classId');
        const selectedBoard = sessionStorage.getItem('boardName');
        const content = subject.content || '';

        if (selectedClass && selectedClassId) {
            sessionStorage.setItem('subjectId', subject._id);
            sessionStorage.setItem('className', selectedClass);
            sessionStorage.setItem('classId', selectedClassId);
            sessionStorage.setItem('content', content);
            const classNameFormatted = selectedClass.replace(/\s+/g, '-');
            const boardNameFormatted = (selectedBoard ?? "").replace(/\s+/g, '-');
            const subjectNameFormatted = subject.subjectName.replace(/\s+/g, '-');
            router.push(`/${boardNameFormatted}/${classNameFormatted}/${subjectNameFormatted}`);
        } else {
            console.log('No class selected or class ID missing');
        }
    };

    const handleClassClick = (classItem: { classId: string; className: string; content: string }) => {
        const selectedSubject = formattedSubjectName;
        const selectedBoard = sessionStorage.getItem('boardName');
        const selectedSubjectId = sessionStorage.getItem('subjectId');

        if (selectedSubject && selectedSubjectId) {
            sessionStorage.setItem('classId', classItem.classId);
            sessionStorage.setItem('className', classItem.className);
            sessionStorage.setItem('subjectId', selectedSubjectId);
            sessionStorage.setItem('content', classItem.content);
            const subjectNameFormatted = selectedSubject;
            const boardNameFormatted = (selectedBoard ?? "").replace(/\s+/g, '-');
            const classNameFormatted = classItem.className.replace(/\s+/g, '-');
            router.push(`/${boardNameFormatted}/${classNameFormatted}/${subjectNameFormatted}`);
        } else {
            console.log('No class selected or class ID missing');
        }
    };

    const goToChapterPage = (chapter: { chapterName: string; _id: string; content: string }) => {
        setClickChapterId(chapter._id);
        const formattedChapterName = chapter.chapterName.replace(/\s+/g, '-');
        sessionStorage.setItem('chapterId', chapter._id);
        sessionStorage.setItem('chapterContent', chapter.content);
        router.push(`/${boardName}/${className}/${subjectName}/${formattedChapterName}`);
    };

    return (
        <>
            <ChapterPage
                boardName={formattedBoardName}
                className={formattedClassName}
                subjectName={formattedSubjectName}
                content={content}
                chapters={chapters}
                allClasses={allClasses}
                allSubjects={allSubjects}
                loadingChapters={loadingChapters}
                loadingSubjects={loadingSubject}
                clickChapterId={clickChapterId}
                handleSubjectClick={handleSubjectClick}
                handleClassClick={handleClassClick}
                goToChapterPage={goToChapterPage}
                classPart={safeClassPart}
                numberPart={safeNumberPart}
                formattedClassName={formattedClassName}
                formattedSubjectName={formattedSubjectName}
            />
        </>
    );
};

export default Page;
