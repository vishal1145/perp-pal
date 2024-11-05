import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; 

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { prompt } = reqBody;

        if (!prompt) {
            return NextResponse.json({ error: "prompt not valid" }, { status: 400 });
        }
        
        const apiResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URI_PROMPT}get_questions`, {
            prompt,
        });
  
        let jsonResponse = '...';  
        jsonResponse = apiResponse.data.replace(/NaN/g, 'null');
        const responseArray = JSON.parse(jsonResponse);
          
        const enrichedData = responseArray.questions.map(item => {
            return {
                ...item,
                questionId:  "6707c5d01253888140c5bd11",  
                options: [
                    { optionText: "Electron", optionFlag: "A" },
                    { optionText: "Photon", optionFlag: "B" },
                    { optionText: "Proton", optionFlag: "C" },
                    { optionText: "Neutron", optionFlag: "D" },
                ],
                correctAnswer: "Photon",
                hints: "Think about the standard value used in physics calculations for Earth.",
                solutions: "The acceleration due to gravity on Earth is approximately 9.8 m/s²."
            };
        });

        return NextResponse.json(enrichedData);

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.response?.data?.error || error.message }, { status: 500 });
    }
}
