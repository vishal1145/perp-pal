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
    minTime:Number;
    maTime:Number;
    avgTime:Number;
}

const OptionSchema: Schema = new Schema({
    optionText: { type: String, required: true },
    optionFlag: { type: String, required: true }
}, { _id: false });

const QuestionSchema: Schema = new Schema({
    questionId: { type: mongoose.Types.ObjectId, required: true },
    question: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    correctAnswer: { type: String, required: true },
    minTime: { type: Number, default: Number.MAX_VALUE  }, 
    maxTime: { type: Number, default: 0},  
    avgTime: { type: Number, default:0},
    showHints:{type:String, default:"working....."}
});

export const AssesmentQuestion: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('AssesmentQuestion', QuestionSchema);
