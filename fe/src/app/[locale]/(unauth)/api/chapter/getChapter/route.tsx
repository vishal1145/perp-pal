import ConnectDB from "@/libs/DB";
import Chapter from "@/models/Chapter";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await ConnectDB();

        const url = new URL(request.url);
        const subjectId = url.searchParams.get("subjectId");
        const classId = url.searchParams.get("classId");

        // Ensure both subjectId and classId are provided
        if (!subjectId || !classId) {
            return NextResponse.json(
                { error: "Both subjectId and classId are required" },
                { status: 400 }
            );
        }

        // Find chapters where both subjectId and classId match
        const chapters = await Chapter.find({ subjectId, classId });

        if (chapters.length === 0) {
            return NextResponse.json(
                { message: "No chapters found for this subject and class" },
                { status: 404 }
            );
        }

        return NextResponse.json({ chapters }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
