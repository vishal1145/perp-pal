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
        
        // const apiResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URI_PROMPT}get_questions`, {
        //     prompt,
        // });



        const apiResponseArray =
       [
                {
                    "_id": "67441bd0a3e36ce2e1c09f46"
                },
                {
                    "_id": "67441bcfa3e36ce2e1c09865"
                },
                {
                    "_id": "67441bcfa3e36ce2e1c09a00"
                },
                {
                    "_id": "67442655f5d626fd6c5f9667"
                },
                {
                    "_id": "67442655f5d626fd6c5f964d"
                },
                {
                    "_id": "67442655f5d626fd6c5f9669"
                },
                {
                    "_id": "674422d7f5d626fd6c5df9db"
                },
                {
                    "_id": "67442655f5d626fd6c5f9700"
                },
                {
                    "_id": "67442655f5d626fd6c5f9660"
                },
                {
                    "_id": "67442655f5d626fd6c5f9659"
                },
                {
                    "_id": "67442655f5d626fd6c5f9649"
                },
                {
                    "_id": "67442655f5d626fd6c5f9648"
                },
                {
                    "_id": "67442655f5d626fd6c5f9647"
                },
                {
                    "_id": "67442655f5d626fd6c5f9645"
                },
                {
                    "_id": "674422d7f5d626fd6c5dfa1d"
                },
                {
                    "_id": "67442655f5d626fd6c5f9668"
                },
                {
                    "_id": "67442655f5d626fd6c5f970a"
                },
                {
                    "_id": "67442655f5d626fd6c5f970f"
                },
                {
                    "_id": "67442280f5d626fd6c5decc7"
                },
                {
                    "_id": "67441bd0a3e36ce2e1c0a527"
                }
            ]
    

        // const apiResponseArray = apiResponse.data.questions_ids;

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
