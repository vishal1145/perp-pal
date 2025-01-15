import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import ChapterTopic from "@/models/chapterTopic";
import Chapter from "@/models/Chapter";

export const POST = async (request: NextRequest) => {
    try {
        await ConnectDB();
        const body = await request.json();
        const { chapterTopicName, chapterId } = body;

        if (!chapterTopicName || !chapterId) {
            return NextResponse.json(
                { message: "chapterName and subjectId are required." },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return NextResponse.json(
                { message: "Invalid chapterId format." },
                { status: 400 }
            );
        }

        const chapterExists = await Chapter.findById(chapterId);
        if (!chapterExists) {
            return NextResponse.json(
                { message: "Subject with the given ID does not exist." },
                { status: 404 }
            );
        }

        const newChapterTopic = await ChapterTopic.create({
            chapterTopicName,
            chapterId,
        });

        return NextResponse.json(
            {
                message: "Chapter topic created successfully.",
                chapter: newChapterTopic,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error creating chapter:", error.message);
        return NextResponse.json(
            { message: "Internal Server Error.", error: error.message },
            { status: 500 }
        );
    }
}
