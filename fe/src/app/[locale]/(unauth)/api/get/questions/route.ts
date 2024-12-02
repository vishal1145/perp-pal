import connectDB from "@/libs/DB";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; 
import dbQuestion from "@/models/dbQuestion";
import mongoose from "mongoose";

const cleanLatex = (str:string) => {
  if (!str) return str;

  str = str.replace(/\$\$(.*?)\$\$/g, '$1');
  
  str = str.replace(/\$(.*?)\$/g, '$1');
  
  str = str.replace(/\\[a-zA-Z]+\{.*?\}/g, ''); 
  
  str = str.replace(/\\[a-zA-Z]+/g, '');  
  
  str = str.replace(/[\\\/]/g, '');  
  
  str = str.replace(/<[^>]*>/g, ''); 
  
  str = str.replace(/\s+/g, ' ').trim();

  return str;
};

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

        const apiResponseArray = apiResponse.data.questions_ids;

        const questionIds = apiResponseArray.map(question => question._id);

        const questions = await dbQuestion.find({
          _id: { $in: questionIds }
        });

        const newQuestions = questions.map((item) => {
          if (item.question) {
            item.question = cleanLatex(item.question);
          }
  
          if (item.solution) {
            item.solution = cleanLatex(item.solution);
          }
  
          if (item.hint && item.hint.value) {
            item.hint.value = cleanLatex(item.hint.value);
          }
  
          if (item.options) {
            Object.keys(item.options).forEach((option) => {
              if (item.options[option] && item.options[option].value) {
                item.options[option].value = cleanLatex(item.options[option].value);
              }
            });
          }
  
          return item;
        });
        
        return NextResponse.json(newQuestions);
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.response?.data?.error || error.message }, { status: 500 });
    }
}
