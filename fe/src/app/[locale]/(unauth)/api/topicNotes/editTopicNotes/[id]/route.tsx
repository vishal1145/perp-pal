import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import ChapterTopic from "@/models/chapterTopic";
import TopicNote from "@/models/topicNotes";

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

        // Extract the note ID from the URL
        const url = new URL(request.url);
        const noteId = url.pathname.split('/').pop(); // Assuming noteId is at the end of the path

        if (!noteId) {
            return NextResponse.json(
                { message: "Note ID is required." },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { TopicId, content } = body;

        // Validate input fields
        if (!TopicId || !content) {
            return NextResponse.json(
                { message: "TopicId and content are required." },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(TopicId)) {
            return NextResponse.json(
                { message: "Invalid TopicId format." },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return NextResponse.json(
                { message: "Invalid Note ID format." },
                { status: 400 }
            );
        }

        // Verify that the topic exists
        const chapterExists = await ChapterTopic.findById(TopicId);
        if (!chapterExists) {
            return NextResponse.json(
                { message: "Topic with the given ID does not exist." },
                { status: 404 }
            );
        }

        // Find and update the TopicNote
        const updatedNote = await TopicNote.findByIdAndUpdate(
            noteId,
            { TopicId, content },
            { new: true }
        );

        if (!updatedNote) {
            return NextResponse.json(
                { message: "Error updating TopicNote. Note not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "TopicNote updated successfully.",
                note: updatedNote,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating topic note:", error.message);
        return NextResponse.json(
            { message: "Internal Server Error.", error: error.message },
            { status: 500 }
        );
    }
};
