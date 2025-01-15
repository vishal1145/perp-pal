import mongoose from "mongoose";
import ConnectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import ChapterTopic from "@/models/chapterTopic";
import TopicNote from "@/models/topicNotes";

export const POST = async (request: NextRequest) => {
    try {
        await ConnectDB();
        const body = await request.json();
        const { TopicId, content } = body;

        if (!TopicId || !content) {
            return NextResponse.json(
                { message: "TopicId and content are required." },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(TopicId)) {
            return NextResponse.json(
                { message: "Invalid chapterId format." },
                { status: 400 }
            );
        }

        const chapterExists = await ChapterTopic.findById(TopicId);
        if (!chapterExists) {
            return NextResponse.json(
                { message: "topic with the given ID does not exist." },
                { status: 404 }
            );
        }

        const newChapterTopicNotes = await TopicNote.create({
            TopicId,
            content,
        });

        return NextResponse.json(
            {
                message: "Chapter topic notes created successfully.",
                chapter: newChapterTopicNotes,
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
