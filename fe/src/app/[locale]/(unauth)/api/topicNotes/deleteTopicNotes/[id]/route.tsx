import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import TopicNote from "@/models/topicNotes";

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

        // Extract the note ID from the URL
        const url = new URL(request.url);
        const noteId = url.pathname.split('/').pop(); // Assuming noteId is at the end of the path

        if (!noteId) {
            return NextResponse.json(
                { message: "Note ID is required." },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return NextResponse.json(
                { message: "Invalid Note ID format." },
                { status: 400 }
            );
        }

        // Find and delete the TopicNote
        const deletedNote = await TopicNote.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return NextResponse.json(
                { message: "TopicNote not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "TopicNote deleted successfully.", note: deletedNote },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting TopicNote:", error.message);
        return NextResponse.json(
            { message: "Internal Server Error.", error: error.message },
            { status: 500 }
        );
    }
};
