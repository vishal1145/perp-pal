import connectDB from "@/libs/DB";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Tutor from "@/models/tutor";

export async function POST(request:NextRequest){
    try{
        
      await connectDB();
      const reqBody = await request.json();
      const { email,password} = reqBody;

      const tutor = await Tutor.findOne({ email: email });

      if (!tutor) {
        return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, tutor.password);

    if (!isPasswordCorrect) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const { password: _, ...tutorData } = tutor.toObject();
    return NextResponse.json({ message: "Login successful", tutor: tutorData }, { status: 200 });
} catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
}
    }
