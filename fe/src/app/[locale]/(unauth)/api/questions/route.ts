import connectDB from "@/libs/DB";
import { IQuestion, Question} from '../../../../../models/Question';
import { NextRequest, NextResponse } from 'next/server'; 
import StartAssessment from "@/models/startAssessment";
import mongoose from 'mongoose';

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
        const {questions, userId }  = await req.json(); 
        const quetionsIds: string[] = [];
        
        const bulkOps = questions.map((item:any) => {
            const { _id, question, solution, answer, options, hint } = item;
            const questionId = _id;

            const updatedOptions = convertOptions(options);

            return {
                updateOne: {
                    filter: { questionId },  
                    update: { 
                        $set: { 
                            question, 
                            questionId, 
                            solution, 
                            answer, 
                            options: updatedOptions, 
                            showHints: hint.value 
                        }
                    },
                    upsert: true 
                }
            };
        });

        if (bulkOps.length > 0) {
            await Question.bulkWrite(bulkOps);
        }

        const savedQuestions = await Question.find({ questionId: { $in: questions.map(q => q._id) } });
        savedQuestions.forEach(question => quetionsIds.push(question._id));

        const newStartAssesment = new StartAssessment({
            userId:new mongoose.Types.ObjectId(userId),
            questions: quetionsIds
       });

        const saveStartAssesment = await newStartAssesment.save();
        return NextResponse.json({ saveStartAssesment}, { status: 200 });

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

