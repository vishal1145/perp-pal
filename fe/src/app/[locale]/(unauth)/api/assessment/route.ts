import { Assessment } from '@/models/submitAssesment';  
import connectDB from '../../../../../libs/DB';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { McqQuestion } from '@/types/type';

export async function POST(req: NextRequest) {
    await connectDB();
  
    try {  
      const { userId, questions } = await req.json(); 

      if (!userId || !Array.isArray(questions) || questions.length === 0) {
        return NextResponse.json({ message: 'Invalid input: userId and questions are required.' }, { status: 400 });
      }

      const formattedQuestions = questions.map((q: { McqQuestion: McqQuestion; userSelectAns: string }) => ({
        questionId: new mongoose.Types.ObjectId(q.McqQuestion.questionId ),
        userSelectAns: q.userSelectAns,
      }));

      const newAssessment = new Assessment({
        userId: userId,
        questions: formattedQuestions,
      });
        
      const savedAssessment = await newAssessment.save();
      return NextResponse.json( savedAssessment, { status: 201 });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error saving assessment', error }, { status: 500 });
    }
}
