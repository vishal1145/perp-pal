
import connectDB from '@/libs/DB';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import StartAssessment from '@/models/startAssessment';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = params;

        console.log("pramas", id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid ID format.' }, { status: 400 });
        }
        
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

