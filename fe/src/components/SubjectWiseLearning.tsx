'use client';

import React, { useState, useEffect } from 'react';
import CustomCardLoader from '@/components/CustomCardLoader';
import { useRouter } from 'next/navigation';

interface ClassItem {
    _id: string;
    className: string;
}

interface Subject {
    _id: string;
    subjectName: string;
    color: string;
    image: string;
    classIds: { className: string }[];
    content: string
}

interface SubjectPageProps {
    selectedClass: string | null;
    classes?: ClassItem[]; // Optional
    loading: boolean;
}

const SubjectWiseLearning: React.FC<SubjectPageProps> = ({
    selectedClass,
    classes = [],
    loading,
}) => {

    const [subjectLoading, setSubjectLoading] = useState<boolean>(true);
    const [currentClass, setCurrentClass] = useState<string>(
        selectedClass || (classes[0]?.className ?? 'defaultClassName')
    );
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!selectedClass && classes.length > 0) {
            const firstClass = classes[0];
            if (firstClass) {
                setCurrentClass(firstClass.className);
                sessionStorage.setItem('classId', firstClass._id);
            }
        }
    }, [selectedClass, classes]);


    const handleClassSelection = (className: string, classId: string) => {
        setCurrentClass(className);
        sessionStorage.setItem('classId', classId);

    };


    const handleSubjectClick = (subject: Subject) => {
        if (currentClass) {
            sessionStorage.setItem('subjectId', subject._id);
            sessionStorage.setItem('className', currentClass);
            sessionStorage.setItem('content', subject.content || '')
            const classNameFormatted = currentClass.replace(/\s+/g, '-');
            const subjectNameFormatted = subject.subjectName.replace(/\s+/g, '-');

            router.push(`/subjects/${classNameFormatted}/${subjectNameFormatted}`);
        } else {
            console.error('No class selected');
        }
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_Tutor_API_URI}/subject/getAllSubject`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch subjects');
                }
                const data = await response.json();
                setSubjects(data.subject ?? []);
                setSubjectLoading(false);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setSubjectLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    const filteredSubjects = subjects.filter(
        (subject) =>
            Array.isArray(subject.classIds) &&
            subject.classIds.some((classItem) => classItem.className === currentClass)
    );

    return (
        <div>
            <h2 className="m-0 mb-4 mt-6 text-2xl font-bold tracking-tight text-gray-900">
                Subject Wise Learning
            </h2>

            <div className="bg-gray-100 gap-14 shadow-2xl rounded-2xl inline-flex justify-between items-center p-4">
                {loading ? (
                    Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="text-lg font-medium cursor-pointer rounded-xl px-3 py-1"
                                style={{ height: '20px', width: '100px' }}
                            >
                                <CustomCardLoader
                                    className="h-full w-full"
                                    viewBox="0 0 100 20"
                                    rectW="100%"
                                    rectH="100%"
                                />
                            </div>
                        ))
                ) : (
                    classes.map((classItem) => (
                        <p
                            key={classItem._id}
                            onClick={() => handleClassSelection(classItem.className, classItem._id)}
                            className={`text-lg font-medium cursor-pointer text-gray-800 rounded-xl transition-all duration-300 ease-in-out ${currentClass === classItem.className
                                ? 'bg-gray-700 text-white hover:text-white px-3 py-1'
                                : 'hover:bg-gray-700 hover:text-white px-3 py-1'
                                }`}
                        >
                            {classItem.className}
                        </p>
                    ))
                )}
            </div>

            <div className="flex flex-wrap gap-7 mt-7 mb-10">
                {subjectLoading ? (
                    Array(7)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col px-20 py-5 rounded-lg shadow-lg transition-transform duration-300 ease-in-out cursor-pointer"
                                style={{ backgroundColor: '#f3f3f3' }}
                            >
                                <CustomCardLoader
                                    className="w-16 h-16 object-cover rounded-t-lg"
                                    viewBox="0 0 100 50"
                                    rectW="90%"
                                    rectH="90%"
                                />
                            </div>
                        ))
                ) : filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject) => (
                        <div
                            key={subject._id}
                            className="flex flex-col px-20 py-5 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                            style={{ backgroundColor: subject.color }}
                            onClick={() => handleSubjectClick(subject)}
                        >
                            <img
                                src={`http://localhost:5000${subject.image}`}
                                alt={subject.subjectName}
                                className="w-16 h-16 object-cover rounded-t-lg"
                            />
                            <p className="text-center text-sm font-semibold text-gray-500">
                                {subject.subjectName}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No subjects available for this class.</p>
                )}
            </div>

            <div className="mt-6">
                <p className="font-light text-gray-500 text-lg">
                    Access a curated collection of subject-specific study materials
                    tailored for your class. Dive into detailed explanations and examples
                    for complex topics. Get personalized learning recommendations based
                    on your progress. Explore practice exercises and mock tests to boost
                    your confidence. Join a community of learners to discuss doubts and
                    share insights.
                </p>
            </div>
        </div>
    );
};

export default SubjectWiseLearning;
