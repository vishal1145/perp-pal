import ConnectDB from "@/libs/DB";
import ChapterTopic from "@/models/chapterTopic";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await ConnectDB();


        const url = new URL(request.url);
        const chapterId = url.searchParams.get("chapterId");


        if (!chapterId) {
            return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
        }

        const chapterTopics = await ChapterTopic.find({ chapterId });


        if (chapterTopics.length === 0) {
            return NextResponse.json({ message: "No chapters found for this subject" }, { status: 404 });
        }

        return NextResponse.json({ chapterTopics }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
