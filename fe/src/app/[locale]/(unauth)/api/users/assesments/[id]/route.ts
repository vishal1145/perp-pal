import connectDB from '@/libs/DB';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
// import { Question } from '@/models/Question';
import SubmitAssessment from '@/models/submitAssesment';

export async function GET(req: Request) {
    try {
        // Extract params from the request URL
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); // Extract ID from URL path

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid ID format.' }, { status: 400 });
        }

        await connectDB();

        console.log(mongoose.modelNames());

        // Fetch assessments for the given userId
        const userAssesments = await SubmitAssessment.find({
            userId: new mongoose.Types.ObjectId(id),
        })
            .populate('userId')
            .populate('questions.questionId');

        return NextResponse.json({ status: 200, userAssesments });
    } catch (error) {
        console.error('Error fetching assessment:', error);
        return NextResponse.json({ message: 'Error fetching assessment', error }, { status: 500 });
    }
}
