"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface BreadcrumbProps {
    selectedBoard: string | null;
    selectedClass: string | null;
    selectedSubject: string | null;
    setSelectedBoard: (board: string | null) => void;
    setSelectedClass: (className: string | null) => void;
    setSelectedSubject: (subject: string | null) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    selectedBoard,
    selectedClass,
    selectedSubject,
    setSelectedBoard,
    setSelectedClass,
    setSelectedSubject,
}) => {
    const router = useRouter();

    const handleNavigation = (level: "board" | "class" | "subject") => {
        if (level === "board") {
            sessionStorage.removeItem("boardId");
            sessionStorage.removeItem("classId");
            sessionStorage.removeItem("subjectId");
            setSelectedBoard(null);
            setSelectedClass(null);
            setSelectedSubject(null);
            router.push("/notes"); // Redirect to Notes (Board Section)
        } else if (level === "class") {
            sessionStorage.removeItem("classId");
            sessionStorage.removeItem("subjectId");
            setSelectedClass(null);
            setSelectedSubject(null);
            router.push("/notes"); // Redirect to Notes (Class Section)
        } else if (level === "subject") {
            sessionStorage.removeItem("subjectId");
            setSelectedSubject(null);
            router.push("/notes"); // Redirect to Notes (Subject Section)
        }
    };

    return (
        <div className="text-lg font-medium text-gray-900 mt-4">
            {selectedBoard && (
                <>
                    <span
                        onClick={() => handleNavigation("board")}
                        className="cursor-pointer hover:underline text-blue-600"
                    >
                        {selectedBoard}
                    </span>
                    <span className="mx-1">&gt;</span>
                </>
            )}

            {selectedClass && (
                <>
                    <span
                        onClick={() => handleNavigation("class")}
                        className="cursor-pointer hover:underline text-blue-600"
                    >
                        {selectedClass}
                    </span>
                    <span className="mx-1">&gt;</span>
                </>
            )}

            {selectedSubject && (
                <span
                    onClick={() => handleNavigation("subject")}
                    className="cursor-pointer hover:underline text-blue-600"
                >
                    {selectedSubject}
                </span>
            )}
        </div>
    );
};

export default Breadcrumb;


