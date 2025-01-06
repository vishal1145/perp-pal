import ConnectDB from "@/libs/DB";
import Subject from "@/models/Subject";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await ConnectDB();
        const subject = await Subject.find().populate({
            path: "classIds",
            select: "className ",
        });;
        return NextResponse.json({ subject }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}