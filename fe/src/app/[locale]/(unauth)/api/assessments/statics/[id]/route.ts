import connectDB from '@/libs/DB';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import SubmitAssessment from '@/models/submitAssesment';

export async function GET(req: NextRequest) {
    // Extracting the 'id' from the request URL path
    const { pathname } = req.nextUrl;
    const id = pathname.split('/').pop(); // Get the last segment of the URL

    // If no 'id' or invalid format, return a 400 error
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid or missing ID format.' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Fetch the assessment by ID and populate the related questions
        const assessment = await SubmitAssessment.findById(id)
            .populate('questions.questionId')
            .exec();

        console.log("assessment", assessment);

        if (!assessment) {
            return NextResponse.json({ message: 'SubmitAssessment not found.' }, { status: 404 });
        }

        return NextResponse.json(assessment, { status: 200 });
    } catch (error) {
        console.error('Error fetching assessment:', error);
        return NextResponse.json({ message: 'Error fetching assessment', error }, { status: 500 });
    }
}
