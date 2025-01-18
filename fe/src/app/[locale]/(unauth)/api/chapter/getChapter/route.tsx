import ConnectDB from "@/libs/DB";
import Chapter from "@/models/Chapter";
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
        const subjectId = url.searchParams.get("subjectId");
        const classId = url.searchParams.get("classId");
        const chapterId = url.searchParams.get("chapterId"); // New parameter for chapterId

        // Case when chapterId is provided (fetch single chapter)
        if (chapterId) {
            const chapter = await Chapter.findById(chapterId)
                .populate("classId", "className") // Populate `className` from Class model
                .populate("subjectId", "subjectName");

            if (!chapter) {
                return NextResponse.json({ message: "Chapter not found" }, { status: 404 });
            }

            return NextResponse.json({ chapter }, { status: 200 });
        }

        // Case when both subjectId and classId are not provided
        if (!subjectId && !classId) {
            const chapters = await Chapter.find()
                .populate("classId", "className") // Populate `className` from Class model
                .populate("subjectId", "subjectName");

            if (chapters.length === 0) {
                return NextResponse.json(
                    { message: "No chapters found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ chapters }, { status: 200 });
        }

        // Case when subjectId and classId are both provided
        if (subjectId && classId) {
            const chapters = await Chapter.find({ subjectId, classId });

            if (chapters.length === 0) {
                return NextResponse.json(
                    { message: "No chapters found for this subject and class" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ chapters }, { status: 200 });
        }

        // Case when only one of subjectId or classId is provided
        return NextResponse.json(
            { error: "Both subjectId and classId are required" },
            { status: 400 }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
