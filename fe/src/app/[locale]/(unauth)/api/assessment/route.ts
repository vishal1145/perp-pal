 
import connectDB from '../../../../../libs/DB';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { McqQuestion } from '@/types/type';
import SubmitAssessment from '@/models/submitAssesment';

export async function POST(req: NextRequest) {
    await connectDB();
  
    try {  
        console.log("*******************8")
        const { userId, questions, totalSubmitTime } = await req.json(); 

        if (!userId || !Array.isArray(questions) || questions.length === 0) {
            return NextResponse.json({ message: 'Invalid input: userId and questions are required.' }, { status: 400 });
        }

        const formattedQuestions:any = questions.map((q: { McqQuestion: McqQuestion; userSelectAns: string, submitTimeInSeconds: number }) => ({
            questionId: new mongoose.Types.ObjectId(q.McqQuestion._id),
            userSelectAns: q.userSelectAns,
            submitTimeInSeconds: q.submitTimeInSeconds
        }));
        
        const newAssessment = new SubmitAssessment({
            userId,
            questions: formattedQuestions,
            totalSubmitTime  
        });
        
        const savedAssessment = await newAssessment.save();
        return NextResponse.json(savedAssessment, { status: 201 });

    } catch (error) {
        console.error('Error saving assessment:', error);
        return NextResponse.json({ message: 'Error saving assessment', error }, { status: 500 });
    }
}
