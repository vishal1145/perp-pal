import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/DB";
import Chapter from "@/models/Chapter";

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

        // Extract the chapter ID from the URL path
        const url = new URL(request.url);
        const chapterId = url.pathname.split('/').pop(); // Assuming the chapter ID is at the end of the path

        if (!chapterId) {
            return NextResponse.json(
                { message: "Chapter ID is required" },
                { status: 400 }
            );
        }

        // Check if the chapter exists
        const chapterExists = await Chapter.findById(chapterId);
        if (!chapterExists) {
            return NextResponse.json(
                { message: "Chapter not found" },
                { status: 404 }
            );
        }

        // Delete the chapter
        const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

        if (!deletedChapter) {
            return NextResponse.json(
                { message: "Error deleting chapter" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Chapter deleted successfully", chapter: deletedChapter },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting chapter:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
};
