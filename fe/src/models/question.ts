import mongoose, { Document, Model, Schema } from 'mongoose';

interface IOption {
    optionText: string;
    optionFlag: string;
}

export interface IQuestion extends Document {
    questionId: mongoose.Types.ObjectId;
    question: string;
    options: IOption[];
    correctAnswer: string;
}

const OptionSchema: Schema = new Schema({
    optionText: { type: String, required: true },
    optionFlag: { type: String, required: true }
}, { _id: false });

const QuestionSchema: Schema = new Schema({
    questionId: { type: mongoose.Types.ObjectId, required: true },
    question: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    correctAnswer: { type: String, required: true }
});

export const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);
