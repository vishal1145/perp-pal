import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/DB";
import Subject from "@/models/Subject";
import mongoose from "mongoose";
import corsMiddleware from "@/libs/middleware/cors";
export const GET = async (request: NextRequest) => {
    try {
        const preflightResponse = corsMiddleware(request);
        if (preflightResponse) return preflightResponse;
        await ConnectDB();

        const url = new URL(request.url);
        const classId = url.searchParams.get("classId");

        if (!classId) {
            return NextResponse.json(
                { message: "classId is required" },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return NextResponse.json(
                { message: "Invalid classId format" },
                { status: 400 }
            );
        }


        const objectIdClassId = new mongoose.Types.ObjectId(classId);

        const subjects = await Subject.find({
            classIds: objectIdClassId,
        }).populate({
            path: "classIds",
            select: "className",
        });


        if (!subjects || subjects.length === 0) {
            return NextResponse.json(
                { message: `No subjects found for classId ${classId}` },
                { status: 404 }
            );
        }

        const response = NextResponse.json(
            { message: "Subjects for the selected class fetched successfully", subjects },
            { status: 200 }
        );
        return corsMiddleware(request, response);
    } catch (error: any) {
        console.error("Error fetching subjects by class:", error);
        const response = NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
        return corsMiddleware(request, response);
    }
};
