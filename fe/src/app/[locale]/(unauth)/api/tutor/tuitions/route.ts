import connectDB from "@/libs/DB";  
import { NextRequest, NextResponse } from "next/server";
import Tuition from "@/models/tution";
import User from "@/models/user";  
import Tutor from "@/models/tutor"; 
import TimeSlot from "@/models/timeSlots";

export async function POST(request: NextRequest) {
  try {
   
    await connectDB();

  
    const reqBody = await request.json();
    const { user_id, tutor_id, subject, slot_id, start_date, end_date, purchase_date } = reqBody;

    
    if (!user_id || !tutor_id || !subject || !slot_id || !start_date || !end_date) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    
    const userExists = await User.findById(user_id);
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

   
    const tutorExists = await Tutor.findById(tutor_id);
    if (!tutorExists) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

  
    const slotExists = await TimeSlot.findById(slot_id);
    if (!slotExists) {
      return NextResponse.json({ error: "Time slot not found" }, { status: 404 });
    }

   
    const newTuition = new Tuition({
      user_id,
      tutor_id,
      subject,
      slot_id,
      start_date,
      end_date,
      purchase_date: purchase_date || Date.now(),  
    });

   
    const savedTuition = await newTuition.save();

    
    return NextResponse.json(
      { message: "Tuition record created successfully", tuition: savedTuition },
      { status: 201 }
    );
  } catch (error: any) {
   
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
