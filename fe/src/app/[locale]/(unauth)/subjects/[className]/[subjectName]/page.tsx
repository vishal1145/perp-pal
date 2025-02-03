'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loader from "@/components/Loader";
import CustomCardLoader from '@/components/CustomCardLoader';

interface ClassObj {
    className: string;
    classId: string;
    content: string;
}

const Page = () => {
    const { className, subjectName } = useParams();
    const [chapters, setChapters] = useState<any[]>([]);
    const [content, setContent] = useState<string | null>(null);
    const [allClasses, setAllClasses] = useState<ClassObj[]>([]);

    const [allSubjects, setAllSubjects] = useState<{ _id: string; subjectName: string; content: string }[]>([]);
    const router = useRouter();
    const formattedClassName = Array.isArray(className)
        ? className.join(' ').replace(/-/g, ' ')
        : (className || 'Class 12').replace(/-/g, ' ');

    const classNameString = Array.isArray(formattedClassName) ? formattedClassName.join(' ') : formattedClassName;
    const [classPart, numberPart] = classNameString.includes('-')
        ? classNameString.split('-')
        : classNameString.split(' ');
    const formattedSubjectName = subjectName || 'BIOLOGY';
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
                            publishStatus: string; classIds: Array<{ className: string }>; subjectName: string
                        }) =>
                            subject.classIds.some((classObj) => classObj.className === formattedClassName) &&
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
                            publishStatus: string; subjectName: string
                        }) =>
                            formattedSubjectName.includes(subject.subjectName) && subject.publishStatus === "published" // Filter subjects with publishStatus 'published'
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

        const content = subject.content || '';

        if (selectedClass && selectedClassId) {
            sessionStorage.setItem('subjectId', subject._id);
            sessionStorage.setItem('className', selectedClass);
            sessionStorage.setItem('classId', selectedClassId);
            sessionStorage.setItem('content', content);
            const classNameFormatted = selectedClass.replace(/\s+/g, '-');
            const subjectNameFormatted = subject.subjectName.replace(/\s+/g, '-');
            router.push(`/subjects/${classNameFormatted}/${subjectNameFormatted}`);
        } else {
            console.log('No class selected or class ID missing');
        }
    };

    const handleClassClick = (classItem: { classId: string; className: string; content: string }) => {
        const selectedSubject = formattedSubjectName;
        const selectedSubjectId = sessionStorage.getItem('subjectId');

        if (selectedSubject && selectedSubjectId) {
            sessionStorage.setItem('classId', classItem.classId);
            sessionStorage.setItem('className', classItem.className);
            sessionStorage.setItem('subjectId', selectedSubjectId);
            sessionStorage.setItem('content', classItem.content);
            const subjectNameFormatted = selectedSubject;
            const classNameFormatted = classItem.className.replace(/\s+/g, '-');
            router.push(`/subjects/${classNameFormatted}/${subjectNameFormatted}`);
        } else {
            console.log('No class selected or class ID missing');
        }
    };

    const goToChapterPage = (chapter: { chapterName: string; _id: string; content: string }) => {
        setClickChapterId(chapter._id);
        const formattedChapterName = chapter.chapterName.replace(/\s+/g, '-');
        sessionStorage.setItem('chapterId', chapter._id);
        sessionStorage.setItem('chapterContent', chapter.content);
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
                                <h1 className="text-2xl tracking-tight font-extrabold text-gray-900">
                                    {sessionStorage.getItem("boardName")
                                        ? `${sessionStorage.getItem("boardName")} ${formattedClassName} ${formattedSubjectName}`
                                        : `NCERT Solutions for ${formattedClassName} ${formattedSubjectName}`}
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
                                    <p className="mt-4 font-light text-gray-500 text-lg">{content}</p>
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
                                                <td className="p-3 border border-gray-300">{formattedSubjectName}</td>
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
                                    <h2 className="text-xl font-bold tracking-tight text-gray-900">Other subjects for {formattedClassName}</h2>
                                    <ul className="mt-4 font-light text-gray-500 space-y-2">
                                        {loadingSubject ? (
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
                                        ) :
                                            allSubjects.length > 0 ? (
                                                allSubjects.map((subject, index) => (
                                                    <li key={index} className="cursor-pointer hover:underline">
                                                        <span onClick={() => handleSubjectClick(subject)}>
                                                            Ncert Solutions for {formattedClassName} {subject.subjectName}
                                                        </span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No subjects available for this class.</li>
                                            )}
                                    </ul>
                                    <h2 className="text-xl font-bold tracking-tight text-gray-900 mt-8">Other classes for {formattedSubjectName}</h2>
                                    <ul className="mt-4 font-light text-gray-500 space-y-2">
                                        {loadingSubject ? (
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
                                        ) :
                                            allClasses.length > 0 ? (
                                                allClasses.map((classItem) => (
                                                    <li key={classItem.classId} className="cursor-pointer hover:underline" onClick={() => handleClassClick(classItem)}>
                                                        Ncert Solutions for {classItem.className} {formattedSubjectName}
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No classes available for this subject.</li>
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <PreppalFooter />
            <Footer />
        </>
    );
};

export default Page;
