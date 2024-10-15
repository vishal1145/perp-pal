import connectDB from '../../../../../libs/DB';
import { IQuestion, Question } from '../../../../../models/question';  
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();

  try {  

    const questions: IQuestion[] = await req.json(); 

      for (const question of questions) {
        const { questionId, question: questionText, options, correctAnswer } = question;

        if (!questionId || !questionText || !options || !correctAnswer) {
          return NextResponse.json({ message: 'All fields are required for each question.' });
        }
      }

      const savedAssessments = await Question.insertMany(questions);
      return NextResponse.json(savedAssessments);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error saving assessments' });
    }
 
}