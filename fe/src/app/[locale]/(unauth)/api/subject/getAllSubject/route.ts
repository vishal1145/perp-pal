import ConnectDB from "@/libs/DB";
import Subject from "@/models/Subject";
import { NextResponse, NextRequest } from "next/server";
import corsMiddleware from "@/libs/middleware/cors";

export async function GET(request: NextRequest) {
    const preflightResponse = corsMiddleware(request);
    if (preflightResponse) return preflightResponse;

    try {
        await ConnectDB();

        // Get the subject ID from the query parameters
        const { searchParams } = new URL(request.url);
        const subjectId = searchParams.get("id");

        let subject;

        if (subjectId) {
            // Fetch specific subject by ID
            subject = await Subject.findById(subjectId).populate({
                path: "classIds",
                select: "className",
            });

            if (!subject) {
                // Return 404 if the subject ID does not exist
                return corsMiddleware(
                    request,
                    NextResponse.json({ error: "Subject not found" }, { status: 404 })
                );
            }
        } else {
            // Fetch all subjects if no ID is provided
            subject = await Subject.find().populate({
                path: "classIds",
                select: "className",
            });
        }

        const response = NextResponse.json({ subject }, { status: 200 });
        return corsMiddleware(request, response);
    } catch (error) {
        const response = NextResponse.json({ error: error.message }, { status: 500 });
        return corsMiddleware(request, response);
    }
}
