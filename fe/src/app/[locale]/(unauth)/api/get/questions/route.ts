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

     
 
const enrichedData = Array.isArray(responseArray.questions) ? responseArray.questions.map(item => {
    const optionsObj = item.options;

    let optionsArray = [];
    optionsArray[0] = { optionText: optionsObj?.a?.value || '', optionFlag: "A" };
    optionsArray[1] = { optionText: optionsObj?.b?.value || '', optionFlag: "B" };
    optionsArray[2] = { optionText: optionsObj?.c?.value || '', optionFlag: "C" };
    optionsArray[3] = { optionText: optionsObj?.d?.value || '', optionFlag: "D" };

    return {
        ...item,
        questionId: item._id,  
        options: optionsArray,
        correctAnswer: item.answer,
        hints: item.hint.value,
        solutions: item.solution,
        questionType:item.questionType
    };
}) : [];



        // const enrichedData = responseArray.qsns.map(item => {
     
        //     const options = Object.keys(item.options).map(key => {
        //         return {
        //             optionText: item.options[key].value, 
        //             optionFlag: key.toUpperCase(), 
        //         };
        //     });
        
        //     return {
        //         questionId: item._id,  
        //         options: options, 
        //         correctAnswer: item.answer,  
        //         hints: item.hint.value,  
        //         solutions: item.solution,  
        //         question: item.question,  
        //         questionType: item.questionType, 
        //         difficulty: item.difficulty,  
        //         topic: item.topic  
        //     };
        // });

        return NextResponse.json(enrichedData);

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.response?.data?.error || error.message }, { status: 500 });
    }
}
