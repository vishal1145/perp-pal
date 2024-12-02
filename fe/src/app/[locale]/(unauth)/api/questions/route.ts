import connectDB from "@/libs/DB";
import { IQuestion, Question} from '../../../../../models/Question';
import { NextRequest, NextResponse } from 'next/server'; 

const convertOptions = (optionsObject:any) => {
    return Object.entries(optionsObject).map(([key, { value, image }]) => {
      return {
        optionText: value,
        optionFlag: key
      };
    });
  };


export async function POST(req: NextRequest) {
    await connectDB();

    try {  
        const questions: IQuestion[] = await req.json(); 
        let quetionsIds = [];

        for (const item of questions) {
            let { _id, question, solution, answer, options, correctAnswer, hint } = item;
            
            const questionId = _id;
  
            options = convertOptions(options)
            await Question.updateOne(
                { questionId },  
                {
                    $set: {  question, questionId, solution, answer, options, correctAnswer, showHints:hint.value},
                },
                { upsert: true } 
            );

            const savedQuestion = await Question.findOne({ questionId });
    
            if (savedQuestion) {
                quetionsIds.push(savedQuestion._id);   
            }
        }

        return NextResponse.json({ message: 'Questions processed successfully.', quetionsIds:quetionsIds });

    } catch (error) {
        console.error('Error saving assessments:', error);
        return NextResponse.json({ message: 'Error saving assessments' }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    try {  
        const assessments = await Question.find({}); 
        return NextResponse.json(assessments, { status: 200 });
    } catch (error) {
        console.error('Error fetching assessments:', error);
        return NextResponse.json({ message: 'Error fetching assessments' }, { status: 500 });
    }
}

