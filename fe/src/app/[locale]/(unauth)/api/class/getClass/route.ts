import ConnectDB from "@/libs/DB";
import Class from "@/models/Class";
import mongoose from "mongoose";
import corsMiddleware from "@/libs/middleware/cors";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        // Handle CORS preflight
        const preflightResponse = corsMiddleware(request);
        if (preflightResponse) return preflightResponse;

        await ConnectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        let classes;

        if (id) {
            const cleanedId = id.trim();

            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(cleanedId)) {
                const response = new NextResponse(
                    JSON.stringify({ message: "Invalid ID format" }),
                    { status: 400 }
                );
                return corsMiddleware(request, response); // Apply CORS headers
            }

            // Find class by ID
            classes = await Class.findById(cleanedId).populate({
                path: "boardIds",
                select: "name",
            });

            if (!classes) {
                const response = new NextResponse(
                    JSON.stringify({ message: "Class not found" }),
                    { status: 404 }
                );
                return corsMiddleware(request, response); // Apply CORS headers
            }
        } else {
            // Fetch all classes if no ID is provided
            classes = await Class.find().populate({
                path: "boardIds",
                select: "name",
            });
        }

        const response = new NextResponse(
            JSON.stringify({ message: "Classes fetched successfully", classes }),
            { status: 200 }
        );
        return corsMiddleware(request, response); // Apply CORS headers

    } catch (error: any) {
        console.error("Error fetching classes:", error);
        const response = new NextResponse(
            JSON.stringify({ message: "Server error", error: error.message }),
            { status: 500 }
        );
        return corsMiddleware(request, response); // Apply CORS headers
    }
};
