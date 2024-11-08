 
import connectDB from '../../../../../libs/DB';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { McqQuestion } from '@/types/type';
import SubmitAssessment from '@/models/submitAssesment';
import { Question } from '@/models/QuestionAssessment';

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { userId, questions, totalSubmitTime } = await req.json();

        if (!userId || !Array.isArray(questions) || questions.length === 0) {
            return NextResponse.json({ message: 'Invalid input: userId and questions are required.' }, { status: 400 });
        }

        const formattedQuestions: any = questions.map((q: { McqQuestion: McqQuestion; userSelectAns: string, submitTimeInSeconds: number }) => ({
            questionId: new mongoose.Types.ObjectId(q.McqQuestion._id),
            userSelectAns: q.userSelectAns,
            submitTimeInSeconds: q?.submitTimeInSeconds ?? 0
        }));

        const newAssessment = new SubmitAssessment({
            userId,
            questions: formattedQuestions,
            totalSubmitTime
        });

        let array = [];

        let promises = [];

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i]?.McqQuestion;

            if (question && question.correctAnswer === questions[i].userSelectAns) {
                const prevMinTime = question.minTime;
                const prevMaxTime = question.maxTime;
                const prevAvgTime = question.avgTime;
                
                const newAvgTime = prevAvgTime === 0 ? questions[i].submitTimeInSeconds : (prevAvgTime + questions[i].submitTimeInSeconds)/2;

                const newMinTime = questions[i].submitTimeInSeconds < prevMinTime
                    ? questions[i].submitTimeInSeconds
                    : prevMinTime;

                const newMaxTime = questions[i].submitTimeInSeconds > prevMaxTime
                    ? questions[i].submitTimeInSeconds
                    : prevMaxTime;

                promises.push(
                    Question.findByIdAndUpdate(
                        question._id,
                        { minTime: newMinTime, maxTime: newMaxTime, avgTime:newAvgTime },
                        { new: true }
                    ));
            }
        }

        const savedAssessment = await newAssessment.save();
        await Promise.all(promises);

        return NextResponse.json(savedAssessment, { status: 201 });

    } catch (error) {
        console.error('Error saving assessment:', error);
        return NextResponse.json({ message: 'Error saving assessment', error }, { status: 500 });
    }
}
