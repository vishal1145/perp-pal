import connectDB from "@/libs/DB";
import { NextResponse } from "next/server";
import Tutor from "@/models/tutor";

export async function GET() {
    try {
        await connectDB();


        const tutors = await Tutor.find();


        return NextResponse.json({ tutors }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
