import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/DB";
import ChapterTopic from "@/models/chapterTopic";
import Chapter from "@/models/Chapter";
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

        // Extract the chapterTopic ID from the URL path
        const url = new URL(request.url);
        const chapterTopicId = url.pathname.split('/').pop(); // Assuming the chapterTopic ID is at the end of the path

        if (!chapterTopicId) {
            return NextResponse.json(
                { message: "ChapterTopic ID is required" },
                { status: 400 }
            );
        }

        // Parse the JSON body
        const { chapterTopicName, chapterId } = await request.json();

        // Ensure chapterTopicName and chapterId are valid
        const chapterTopicNameStr = chapterTopicName ? String(chapterTopicName) : undefined;
        const chapterIdStr = chapterId ? String(chapterId) : undefined;

        // Validate input data
        if (!chapterTopicNameStr || !chapterIdStr) {
            return NextResponse.json(
                { message: "chapterTopicName and chapterId are required" },
                { status: 400 }
            );
        }

        // Validate ObjectId format for chapterId
        if (!mongoose.Types.ObjectId.isValid(chapterIdStr)) {
            return NextResponse.json(
                { message: "Invalid chapterId format" },
                { status: 400 }
            );
        }

        // Check if the chapter exists
        const chapterExists = await Chapter.findById(chapterIdStr);
        if (!chapterExists) {
            return NextResponse.json(
                { message: "Chapter with the given ID does not exist" },
                { status: 404 }
            );
        }

        // Find and update the chapterTopic
        const updatedChapterTopic = await ChapterTopic.findByIdAndUpdate(
            chapterTopicId,
            { chapterTopicName: chapterTopicNameStr, chapterId: chapterIdStr },
            { new: true }
        );

        if (!updatedChapterTopic) {
            return NextResponse.json(
                { message: "Error updating ChapterTopic" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "ChapterTopic updated successfully", chapterTopic: updatedChapterTopic },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating ChapterTopic:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
};
