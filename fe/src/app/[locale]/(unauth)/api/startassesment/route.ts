
import connectDB from '../../../../../libs/DB';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import StartAssessment from '@/models/startAssessment';

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { userId, quetionsIds } = await req.json();

        if (!userId && !quetionsIds) {
            return NextResponse.json({ message: 'Invalid input: userId and questions are required.' }, { status: 400 });
        }

        const newStartAssesment = new StartAssessment({
            userId: new mongoose.Types.ObjectId(userId),
            questions: quetionsIds
        });

        const saveStartAssesment = await newStartAssesment.save();
        return NextResponse.json({ saveStartAssesment }, { status: 200 });
    } catch (error) {
        console.error('Error saving assessment:', error);
        return NextResponse.json({ message: 'Error saving assessment', error }, { status: 500 });
    }
}
