import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; 
import dbQuestion from "@/models/dbQuestion";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { prompt } = reqBody;

        if (!prompt) {
            return NextResponse.json({ error: "prompt not valid" }, { status: 400 });
        }


        console.log("line 17", `${process.env.NEXT_PUBLIC_API_URI_PROMPT}get_questions`)
        
        const apiResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URI_PROMPT}get_questions`, {
            prompt,
        });

        const apiResponseArray = apiResponse.data.questions_ids;

        const questionIds = apiResponseArray.map(question => question._id);

        const questions:any = await dbQuestion.find({
          _id: { $in: questionIds }
        });
        
        return NextResponse.json(questions);
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.response?.data?.error || error.message }, { status: 500 });
    }
}
