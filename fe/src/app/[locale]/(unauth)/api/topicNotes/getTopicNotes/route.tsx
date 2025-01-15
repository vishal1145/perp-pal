import ConnectDB from "@/libs/DB";
import TopicNote from "@/models/topicNotes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await ConnectDB();


        const url = new URL(request.url);
        const TopicId = url.searchParams.get("TopicId");


        if (!TopicId) {
            return NextResponse.json({ error: "TopicId is required" }, { status: 400 });
        }

        const TopicNotes = await TopicNote.find({ TopicId });


        if (TopicNotes.length === 0) {
            return NextResponse.json({ message: "No chapters found for this subject" }, { status: 404 });
        }

        return NextResponse.json({ TopicNotes }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
