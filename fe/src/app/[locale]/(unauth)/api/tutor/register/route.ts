import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Tutor from "@/models/tutor";

export async function POST(request: NextRequest) {
    try {
        await connectDB();  

        const reqBody = await request.json();
        const { name, subject, bio, email, password } = reqBody;  

     
        const existingTutor = await Tutor.findOne({ email: email });

        if (existingTutor) {
            return NextResponse.json({ error: "Tutor already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

    
        const newTutor = new Tutor({
            name,
            subject,
            bio,
            email,
            password: hashedPassword,
        });

     
        const savedTutor = await newTutor.save();
        
        return NextResponse.json({ message: "Tutor registered successfully", tutor: savedTutor }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
