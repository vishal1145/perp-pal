import connectDB from '@/libs/DB';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import StartAssessment from '@/models/startAssessment';

export async function GET(req: NextRequest) {
    // Extract the 'id' from the URL parameters
    const { pathname } = req.nextUrl;
    const id = pathname.split('/').pop(); // Get the last part of the URL as the 'id'

    // If 'id' is invalid or missing, return a 400 Bad Request response
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid ID format.' }, { status: 400 });
    }

    try {
        // Connect to the database
        await connectDB();

        // Fetch the assessment by ID and populate the 'questions' field
        const assessment = await StartAssessment.findById(id)
            .populate('questions')
            .exec();

        if (!assessment) {
            return NextResponse.json({ message: 'SubmitAssessment not found.' }, { status: 404 });
        }

        return NextResponse.json(assessment, { status: 200 });
    } catch (error) {
        console.error('Error saving assessment:', error);
        return NextResponse.json({ message: 'Error saving assessment', error }, { status: 500 });
    }
}

