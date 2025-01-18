import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import Class from "@/models/Class";
import corsMiddleware from '@/libs/middleware/cors'
export const DELETE = async (request: NextRequest) => {
    try {
        const preflightResponse = corsMiddleware(request);
        if (preflightResponse) return preflightResponse;
        await ConnectDB();

        // Extract class ID from URL
        const url = new URL(request.url);
        const classId = url.pathname.split('/').pop();


        if (!classId || !mongoose.Types.ObjectId.isValid(classId as string)) {
            return NextResponse.json(
                { message: "Invalid class ID" },
                { status: 400 }
            );
        }

        // Delete class by ID
        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return NextResponse.json(
                { message: "Class not found" },
                { status: 404 }
            );
        }

        const response = NextResponse.json(
            { message: "Class deleted successfully" },
            { status: 200 }
        );
        return corsMiddleware(request, response);

    } catch (error: any) {
        console.error("Error deleting class:", error);
        const response = NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
        return corsMiddleware(request, response);

    }
};

