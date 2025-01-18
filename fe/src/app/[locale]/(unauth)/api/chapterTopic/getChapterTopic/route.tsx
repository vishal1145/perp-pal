import ConnectDB from "@/libs/DB";
import ChapterTopic from "@/models/chapterTopic";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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

        const url = new URL(request.url);
        const chapterId = url.searchParams.get("chapterId");
        const chapterTopicId = url.searchParams.get("chapterTopicId"); // Get chapterTopicId from query params

        // If both chapterId and chapterTopicId are not provided, get all chapter topics and populate chapterId field
        if (!chapterId && !chapterTopicId) {
            const chapterTopics = await ChapterTopic.find().populate("chapterId", "chapterName");

            if (chapterTopics.length === 0) {
                return NextResponse.json({ message: "No chapter topics found" }, { status: 404 });
            }
            return NextResponse.json({ chapterTopics }, { status: 200 });
        }

        // If chapterId is provided, get chapter topics for that specific chapterId and populate chapterId field
        if (chapterId) {
            const chapterTopics = await ChapterTopic.find({ chapterId })
                .populate("chapterId", "chapterName");

            if (chapterTopics.length === 0) {
                return NextResponse.json({ message: "No chapter topics found for this chapter" }, { status: 404 });
            }
            return NextResponse.json({ chapterTopics }, { status: 200 });
        }

        // If chapterTopicId is provided, get a specific chapter topic
        if (chapterTopicId) {
            const chapterTopic = await ChapterTopic.findById(chapterTopicId).populate("chapterId", "chapterName");

            if (!chapterTopic) {
                return NextResponse.json({ message: "Chapter topic not found" }, { status: 404 });
            }
            return NextResponse.json({ chapterTopic }, { status: 200 });
        }

        // If none of the conditions matched, return a default message or 400 Bad Request
        return NextResponse.json({ message: "Invalid request. Please provide a valid chapterId or chapterTopicId." }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
