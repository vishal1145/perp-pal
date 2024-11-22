import connectDB from '@/libs/DB';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { Question } from '@/models/Question';
import SubmitAssessment from '@/models/submitAssesment';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB(); // Ensure connection is established
        console.log(mongoose.modelNames());

        const { id } = params;
        const questions = Question.find({}).limit(1);

        const userAssesments = await SubmitAssessment.find({
            userId: new mongoose.Types.ObjectId(id),
        })
        .populate('userId')
        .populate('questions.questionId'); // Ensure ref matches the model name

        return NextResponse.json({ status: 200, userAssesments });
    } catch (error) {
        console.error('Error fetching assessment:', error);
        return NextResponse.json({ message: 'Error fetching assessment', error }, { status: 500 });
    }
}