import mongoose, { Document, Model, Schema } from 'mongoose';

interface IOption {
    optionText: string;
    optionFlag: string;
}

export interface IQuestion extends Document {
    _id: mongoose.Types.ObjectId | string;
    type: string;
    tags: string;
    topic: string;
    difficulty: string;
    questionType: string;
    hint: string;
    solution: string;
    answer: string;
    questionId: mongoose.Types.ObjectId;
    question: string;
    options: IOption[];
    minTime: Number;
    maTime: Number;
    avgTime: Number;
}

const OptionSchema: Schema = new Schema({
    optionText: { type: String, required: true },
    optionFlag: { type: String, required: true }
}, { _id: false });

const QuestionSchema: Schema = new Schema({
    questionId: { type: mongoose.Types.ObjectId, required: true },
    question: { type: String, required: true },
    solution: { type: String, required: true },
    type: { type: String },
    tags: { type: String },
    topic: { type: String },
    difficulty: { type: String },
    questionType: { type: String },
    hint: { type: String },
    answer: { type: String },
    options: { type: [OptionSchema] },
    minTime: { type: Number, default: Number.MAX_VALUE },
    maxTime: { type: Number, default: 0 },
    avgTime: { type: Number, default: 0 },
    showHints: { type: String, default: "working....." }
});

export const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

