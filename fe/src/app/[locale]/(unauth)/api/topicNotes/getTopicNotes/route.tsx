import ConnectDB from "@/libs/DB";
import TopicNote from "@/models/topicNotes";
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
        const TopicId = url.searchParams.get("TopicId");
        const TopicNoteId = url.searchParams.get("TopicNoteId"); // Get the TopicNoteId from query params

        let TopicNotes;

        // Fetch notes based on TopicId or TopicNoteId, or fetch all if neither are provided
        if (TopicNoteId) {
            // If TopicNoteId is provided, find the specific TopicNote
            TopicNotes = await TopicNote.findById(TopicNoteId).populate("TopicId", "chapterTopicName");
        } else if (TopicId) {
            // If only TopicId is provided, find notes for that specific TopicId
            TopicNotes = await TopicNote.find({ TopicId }).populate("TopicId", "chapterTopicName");
        } else {
            // If neither is provided, return all notes
            TopicNotes = await TopicNote.find().populate("TopicId", "chapterTopicName");
        }

        // Check if no notes exist
        if (!TopicNotes) {
            return NextResponse.json(
                { message: TopicNoteId ? "Note not found" : TopicId ? "No notes found for this topic" : "No notes found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ TopicNotes }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
