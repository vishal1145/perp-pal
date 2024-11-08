import connectDB from '../../../../../../libs/DB';
import { IQuestion, AssesmentQuestion } from '../../../../../../models/AssesmentQuestion';  
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectDB();

    try {  
        const questions: IQuestion[] = await req.json(); 


        console.log(questions);

        for (const question of questions) {
            const {  question: questionText, options, correctAnswer } = question;
      
            if ( !questionText || !options || !correctAnswer) {
                return NextResponse.json({ message: 'All fields are required for each question.' }, { status: 400 });
            }
        }

        const savedAssessments = await AssesmentQuestion.insertMany(questions);
        return NextResponse.json(savedAssessments, { status: 201 });
    } catch (error) {
        console.error('Error saving assessments:', error);
        return NextResponse.json({ message: 'Error saving assessments' }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    try {  
        const assessments = await AssesmentQuestion.find({}); 
        return NextResponse.json(assessments, { status: 200 });
    } catch (error) {
        console.error('Error fetching assessments:', error);
        return NextResponse.json({ message: 'Error fetching assessments' }, { status: 500 });
    }
}

