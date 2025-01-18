import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import Subject from "@/models/Subject";
import Chapter from "@/models/Chapter";
import Class from "@/models/Class";

export const POST = async (request: NextRequest) => {
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
        const body = await request.json();
        const { chapterName, subjectId, classId } = body;

        // Validate required fields
        if (!chapterName || !subjectId || !classId) {
            return NextResponse.json(
                { message: "chapterName, subjectId, and classId are required." },
                { status: 400 }
            );
        }

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            return NextResponse.json(
                { message: "Invalid subjectId format." },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return NextResponse.json(
                { message: "Invalid classId format." },
                { status: 400 }
            );
        }

        // Check if subject exists
        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return NextResponse.json(
                { message: "Subject with the given ID does not exist." },
                { status: 404 }
            );
        }

        // Check if class exists
        const classExists = await Class.findById(classId);
        if (!classExists) {
            return NextResponse.json(
                { message: "Class with the given ID does not exist." },
                { status: 404 }
            );
        }

        // Create the new chapter
        const newChapter = await Chapter.create({
            chapterName,
            subjectId,
            classId,
        });

        return NextResponse.json(
            {
                message: "Chapter created successfully.",
                chapter: newChapter,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error creating chapter:", error.message);
        return NextResponse.json(
            { message: "Internal Server Error.", error: error.message },
            { status: 500 }
        );
    }
}
