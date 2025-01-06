import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/libs/DB";
import Subject from "@/models/Subject";
import mongoose from "mongoose";

export const GET = async (request: NextRequest) => {
    try {
        await ConnectDB();

        // Extract classId from the URL query string
        const url = new URL(request.url);
        const classId = url.searchParams.get("classId");

        if (!classId) {
            return NextResponse.json(
                { message: "classId is required" },
                { status: 400 }
            );
        }

        // Log the classId for debugging purposes
        console.log("Received classId:", classId);

        // Ensure classId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return NextResponse.json(
                { message: "Invalid classId format" },
                { status: 400 }
            );
        }

        // Convert classId to ObjectId using the 'new' keyword
        const objectIdClassId = new mongoose.Types.ObjectId(classId);

        // Fetch all subjects where classId exists in the classIds array
        const subjects = await Subject.find({
            classIds: objectIdClassId, // Match classId in classIds array
        }).populate({
            path: "classIds",
            select: "className",
        });

        // Log subjects to see the result
        console.log("Found subjects:", subjects);

        if (!subjects || subjects.length === 0) {
            return NextResponse.json(
                { message: `No subjects found for classId ${classId}` },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Subjects for the selected class fetched successfully", subjects },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching subjects by class:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
};
