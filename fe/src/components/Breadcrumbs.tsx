'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface BreadcrumbsProps {
    selectedBoard: string | null;
    selectedClass: string | null;
    selectedSubject: string | null;
    selectedChapter?: string | null;
    selectedTopic?: string | null;
    setSelectedBoard: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedClass: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedSubject: React.Dispatch<React.SetStateAction<string | null>>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
    selectedBoard,
    selectedClass,
    selectedSubject,
    selectedChapter,
    selectedTopic,
    setSelectedBoard,
    setSelectedClass,
    setSelectedSubject
}) => {
    const router = useRouter();

    // Reset selection on clicking Board
    const handleBoardClick = () => {
        setSelectedBoard(null);
        setSelectedClass(null);
        setSelectedSubject(null);
        sessionStorage.removeItem('boardId');
        sessionStorage.removeItem('classId');
        sessionStorage.removeItem('subjectId');
    };

    // Reset selection on clicking Class
    const handleClassClick = () => {
        setSelectedClass(null);
        setSelectedSubject(null);
        sessionStorage.removeItem('classId');
        sessionStorage.removeItem('subjectId');
    };

    // Navigate to Subject Page
    const handleSubjectClick = () => {
        if (selectedBoard && selectedClass && selectedSubject) {
            router.push(`/boards/${selectedBoard}/classes/${selectedClass}/subjects/${selectedSubject}`);
        }
    };

    // Navigate to Chapter Page
    const handleChapterClick = () => {
        if (selectedBoard && selectedClass && selectedSubject && selectedChapter) {
            router.push(`/boards/${selectedBoard}/classes/${selectedClass}/subjects/${selectedSubject}/chapters/${selectedChapter}`);
        }
    };

    // Navigate to Topic Page
    const handleTopicClick = () => {
        if (selectedBoard && selectedClass && selectedSubject && selectedChapter && selectedTopic) {
            router.push(`/boards/${selectedBoard}/classes/${selectedClass}/subjects/${selectedSubject}/chapters/${selectedChapter}/topics/${selectedTopic}`);
        }
    };

    return (
        <div className="text-lg font-medium text-gray-900 mt-4 flex items-center gap-2">
            {selectedBoard && (
                <>
                    <span
                        onClick={handleBoardClick}
                        className="cursor-pointer hover:underline text-blue-600"
                    >
                        {selectedBoard}
                    </span>
                    <span className="text-gray-500">{'>'}</span>
                </>
            )}

            {selectedClass && (
                <>
                    <span
                        onClick={handleClassClick}
                        className="cursor-pointer hover:underline text-blue-600"
                    >
                        {selectedClass}
                    </span>
                    <span className="text-gray-500">{'>'}</span>
                </>
            )}

            {selectedSubject && (
                <>
                    <span
                        onClick={handleSubjectClick}
                        className="cursor-pointer hover:underline text-blue-600"
                    >
                        {selectedSubject}
                    </span>
                    <span className="text-gray-500">{'>'}</span>
                </>
            )}

            {selectedChapter && (
                <>
                    <span
                        onClick={handleChapterClick}
                        className="cursor-pointer hover:underline text-blue-600"
                    >
                        {selectedChapter}
                    </span>
                    <span className="text-gray-500">{'>'}</span>
                </>
            )}

            {selectedTopic && (
                <span
                    onClick={handleTopicClick}
                    className="cursor-pointer hover:underline text-blue-600"
                >
                    {selectedTopic}
                </span>
            )}
        </div>
    );
};

export default Breadcrumbs;
