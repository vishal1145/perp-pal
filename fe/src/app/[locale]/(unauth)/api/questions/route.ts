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
                return NextResponse.json({ message: 'All fields are required for each question.' }, { status: 400 });
            }
        }

        const savedAssessments = await Question.insertMany(questions);
        return NextResponse.json(savedAssessments, { status: 201 });
    } catch (error) {
        console.error('Error saving assessments:', error);
        return NextResponse.json({ message: 'Error saving assessments' }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    try {  
        const assessments = await Question.find({}); // Use await here
        return NextResponse.json(assessments, { status: 200 });
    } catch (error) {
        console.error('Error fetching assessments:', error);
        return NextResponse.json({ message: 'Error fetching assessments' }, { status: 500 });
    }
}

