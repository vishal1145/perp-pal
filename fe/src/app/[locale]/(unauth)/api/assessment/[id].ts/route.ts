 
import connectDB from '../../../../../../libs/DB';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Assessment from '@/models/submitAssesment';

interface Params {
    id: string;  
}

export async function GET({ params }: { params: Params }) {
    await connectDB();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid ID format.' }, { status: 400 });
    }

    try {
        const assessment = await Assessment.findById(id)
            .populate('questions.questionId') 
            .exec();

        if (!assessment) {
            return NextResponse.json({ message: 'Assessment not found.' }, { status: 404 });
        }

        return NextResponse.json(assessment, { status: 200 });
    } catch (error) {
        console.error('Error fetching assessment:', error);
        return NextResponse.json({ message: 'Error fetching assessment', error }, { status: 500 });
    }
}