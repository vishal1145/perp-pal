'use client';

import React, { useState, useEffect } from 'react';

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
    content: string,
    publishStatus: string;
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

            router.push(`/class/${classNameFormatted}/${subjectNameFormatted}`);
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
                // Filter subjects based on publishStatus being "published"
                const publishedSubjects = data.subject?.filter((subject: { publishStatus: string; }) => subject.publishStatus === 'published') ?? [];

                setSubjects(publishedSubjects); // Set the filtered subjects
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
        <div className="px-4 sm:px-8 mb-8">
            {/* Header Section */}
            <div className="mb-20 mt-28 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-2">
                    Manage your learning journey
                    <br />
                    simply and fast
                </h2>
                <p className="text-gray-500 text-lg">
                    We're working to make your learning experience smooth and effective
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                {/* Left side - Class list (35% width) */}
                <div className="w-full md:w-[35%] space-y-3">
                    {loading ? (
                        Array(5).fill(0).map((_, index) => (
                            <div key={index} className="animate-pulse flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                                {/* Number circle loader */}
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>

                                {/* Text content loader */}
                                <div className="flex-grow">
                                    <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                </div>

                                {/* Arrow loader */}
                                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                            </div>
                        ))
                    ) : (
                        classes.map((classItem, index) => (
                            <div
                                key={classItem._id}
                                onClick={() => handleClassSelection(classItem.className, classItem._id)}
                                className={`flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md
                                    ${currentClass === classItem.className
                                        ? 'border-teal-500 bg-teal-50'
                                        : 'border-gray-200 hover:border-teal-200'}`}
                            >
                                {/* Number indicator */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                                    ${currentClass === classItem.className
                                        ? 'bg-teal-100 text-teal-600'
                                        : 'bg-gray-100 text-gray-600'}`}
                                >
                                    {index + 1}
                                </div>

                                {/* Class info */}
                                <div className="flex-grow">
                                    <h3 className={`font-medium ${currentClass === classItem.className ? 'text-teal-900' : 'text-gray-900'}`}>
                                        {classItem.className}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {filteredSubjects.filter(subj =>
                                            subj.classIds.some(cls => cls.className === classItem.className)
                                        ).length} subjects available
                                    </p>
                                </div>

                                {/* Arrow icon */}
                                <div className={`${currentClass === classItem.className ? 'text-teal-500' : 'text-gray-400'}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Right side - Subjects grid (65% width) */}
                <div className="w-full md:w-[65%] bg-gray-50 rounded-xl p-6 pt-0">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-medium text-gray-900">
                            {currentClass ? `${currentClass} Subjects` : 'Select a class'}
                        </h3>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-teal-200"></div>
                            <div className="w-3 h-3 rounded-full bg-purple-200"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
                        </div>
                    </div>

                    {subjectLoading ? (
                        <div className="grid grid-cols-2 gap-4">
                            {Array(4).fill(0).map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse p-6 rounded-xl"
                                    style={{ backgroundColor: '#f5f5f5' }}
                                >
                                    {/* Icon loader */}
                                    <div className="w-12 h-12 bg-white rounded-lg mb-4"></div>

                                    {/* Text content loader */}
                                    <div className="space-y-2">
                                        <div className="h-5 bg-white rounded w-24"></div>
                                        <div className="h-4 bg-white rounded w-32"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredSubjects.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {filteredSubjects.map((subject) => (
                                <div
                                    key={subject._id}
                                    onClick={() => handleSubjectClick(subject)}
                                    className="p-6 rounded-xl cursor-pointer transition-transform hover:scale-105"
                                    style={{
                                        backgroundColor: subject.color || '#E8FFF7' // fallback to light teal if no color
                                    }}
                                >
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-lg bg-white/90 flex items-center justify-center mb-4">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${subject.image}`}
                                            alt={subject.subjectName}
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <h4 className="font-medium text-gray-900 mb-1">
                                        {subject.subjectName}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Click to explore study materials
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-gray-500">Select a class to view available subjects</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubjectWiseLearning;
