import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import TimeSlot from "@/models/timeSlots";
import Tutor from "@/models/tutor";

export async function POST(request: NextRequest) {
    try {

        await connectDB();

        const reqBody = await request.json();
        const { tutor_id, start_time, end_time } = reqBody;

        if (!tutor_id || !start_time || !end_time) {
            return NextResponse.json({ error: "All fields (tutor_id, start_time, end_time) are required" }, { status: 400 });
        }

        const tutor = await Tutor.findById(tutor_id);
        if (!tutor) {
            return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
        }

        const newTimeSlot = new TimeSlot({
            tutor_id,
            start_time,
            end_time
        });


        const savedTimeSlot = await newTimeSlot.save();

        return NextResponse.json({ message: "Time slot created successfully", timeSlot: savedTimeSlot }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
