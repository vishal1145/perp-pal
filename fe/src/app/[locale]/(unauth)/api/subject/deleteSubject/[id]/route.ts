import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { unlink } from "fs/promises";
import ConnectDB from "@/libs/DB";
import Subject from "@/models/Subject";

export const DELETE = async (request: NextRequest) => {
    try {
        await ConnectDB();

        // Extracting the subject ID from the URL
        const url = new URL(request.url);
        const subjectId = url.pathname.split('/').pop();  // Get the ID from the URL path

        if (!subjectId) {
            return NextResponse.json(
                { message: "Subject ID is required" },
                { status: 400 }
            );
        }

        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return NextResponse.json(
                { message: "Subject not found" },
                { status: 404 }
            );
        }

        // Delete the image file if it exists
        if (subject.image) {
            const imagePath = path.join(process.cwd(), "public", subject.image);
            try {
                await unlink(imagePath); // Delete the image file
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }

        // Instead of `remove()`, use `deleteOne()` to delete the subject
        await Subject.deleteOne({ _id: subjectId });

        const response = NextResponse.json(
            { message: "Subject deleted successfully" },
            { status: 200 }
        );
        response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    } catch (error: any) {
        console.error("Error deleting subject:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
};
