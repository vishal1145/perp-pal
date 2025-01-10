import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../../../libs/DB'; // Adjust the path if needed
import SubmitAssessment from '@/models/submitAssesment';

export async function GET(req: NextRequest) {
    // Extract the 'id' from the URL using nextUrl
    const pathname = req.nextUrl.pathname;
    const id = pathname.split('/').pop();

    // If there's no 'id' in the URL, return an error
    if (!id || typeof id !== 'string') {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    try {
        const assessment = await SubmitAssessment.findById(id)
            .populate('questions.questionId')
            .exec();

        if (!assessment) {
            return NextResponse.json({ message: 'SubmitAssessment not found.' }, { status: 404 });
        }

        return NextResponse.json(assessment, { status: 200 });
    } catch (error) {
        console.error('Error fetching assessment:', error);
        return NextResponse.json({ message: 'Error fetching assessment', error }, { status: 500 });
    }
}
