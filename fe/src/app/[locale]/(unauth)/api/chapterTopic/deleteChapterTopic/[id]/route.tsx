import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import ChapterTopic from "@/models/chapterTopic";

export const DELETE = async (request: NextRequest) => {
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

        // Extract the chapterTopic ID from the URL
        const url = new URL(request.url);
        const chapterTopicId = url.pathname.split('/').pop(); // Assuming the chapterTopic ID is at the end of the path

        if (!chapterTopicId) {
            return NextResponse.json(
                { message: "ChapterTopic ID is required." },
                { status: 400 }
            );
        }

        // Validate chapterTopicId format
        if (!mongoose.Types.ObjectId.isValid(chapterTopicId)) {
            return NextResponse.json(
                { message: "Invalid chapterTopic ID format." },
                { status: 400 }
            );
        }

        // Find and delete the chapter topic
        const deletedChapterTopic = await ChapterTopic.findByIdAndDelete(chapterTopicId);

        if (!deletedChapterTopic) {
            return NextResponse.json(
                { message: "ChapterTopic with the given ID does not exist." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Chapter topic deleted successfully.", chapterTopic: deletedChapterTopic },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting chapter topic:", error.message);
        return NextResponse.json(
            { message: "Internal Server Error.", error: error.message },
            { status: 500 }
        );
    }
};
