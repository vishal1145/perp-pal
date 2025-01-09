import connectDB from '../../../../../../libs/DB'; // Adjust this path if necessary
import { NextResponse } from 'next/server';
import SubmitAssessment from '@/models/submitAssesment';
export async function GET(request: Request, { params }: { params: { id: string } }) {
    await connectDB();

    const { id } = params;

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
