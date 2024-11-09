import connectDB from '@/libs/DB';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import SubmitAssessment from '@/models/submitAssesment';
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try{
    await connectDB();

        const { id } = params;
     
        const userAssesments = await SubmitAssessment.findOne({
            userId:new mongoose.Types.ObjectId(id),
        })
                
        return NextResponse.json( { status: 200, userAssesments });

    } catch (error) {
        console.error('Error fetching assessment:', error);
        return NextResponse.json({ message: 'Error fetching assessment', error }, { status: 500 });
    }
}
