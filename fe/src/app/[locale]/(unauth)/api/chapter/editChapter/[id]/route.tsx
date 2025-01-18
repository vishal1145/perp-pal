import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/DB";
import Chapter from "@/models/Chapter";
import Subject from "@/models/Subject";
import Class from "@/models/Class";
import mongoose from "mongoose";

export const PUT = async (request: NextRequest) => {
    try {
        // Set CORS headers for allowing requests from specific origins
        const response = NextResponse.next();
        response.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

        // Handle pre-flight OPTIONS request (for CORS)
        if (request.method === "OPTIONS") {
            return response;
        }

        await ConnectDB();

        // Extract the chapter ID from the URL path
        const url = new URL(request.url);
        const chapterId = url.pathname.split('/').pop(); // Assuming the chapter ID is at the end of the path

        if (!chapterId) {
            return NextResponse.json(
                { message: "Chapter ID is required" },
                { status: 400 }
            );
        }

        // Parse the JSON body
        const { chapterName, subjectId, classId } = await request.json();

        // Ensure chapterName, subjectId, and classId are valid
        const chapterNameStr = chapterName ? String(chapterName) : undefined;
        const subjectIdStr = subjectId ? String(subjectId) : undefined;
        const classIdStr = classId ? String(classId) : undefined;

        // Validate the input data
        if (!chapterNameStr || !subjectIdStr || !classIdStr) {
            return NextResponse.json(
                { message: "chapterName, subjectId, and classId are required" },
                { status: 400 }
            );
        }

        // Validate ObjectId formats for subjectId and classId
        if (!mongoose.Types.ObjectId.isValid(subjectIdStr)) {
            return NextResponse.json(
                { message: "Invalid subjectId format" },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(classIdStr)) {
            return NextResponse.json(
                { message: "Invalid classId format" },
                { status: 400 }
            );
        }

        // Check if the subject and class exist
        const subjectExists = await Subject.findById(subjectIdStr);
        if (!subjectExists) {
            return NextResponse.json(
                { message: "Subject with the given ID does not exist" },
                { status: 404 }
            );
        }

        const classExists = await Class.findById(classIdStr);
        if (!classExists) {
            return NextResponse.json(
                { message: "Class with the given ID does not exist" },
                { status: 404 }
            );
        }

        // Find and update the chapter
        const updatedChapter = await Chapter.findByIdAndUpdate(
            chapterId,
            { chapterName: chapterNameStr, subjectId: subjectIdStr, classId: classIdStr },
            { new: true }
        );

        if (!updatedChapter) {
            return NextResponse.json(
                { message: "Error updating chapter" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Chapter updated successfully", chapter: updatedChapter },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating chapter:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
};
