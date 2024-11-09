import mongoose, { Document, Model, Schema } from 'mongoose';

 
export interface IAssessment extends Document {
    userId: mongoose.Types.ObjectId;   
    totalSubmitTime: number;
    questions: {
        questionId: mongoose.Types.ObjectId;
        userSelectAns: string;
        submitTimeInSeconds: number;
    }[];
    paperTitle:string
}

const QuestionAssessmentSchema: Schema = new Schema({
    questionId: { type: mongoose.Types.ObjectId, ref: 'Question', required: true },
    userSelectAns: { type: String },
    userSelectAnsString: { type: String },
    submitTimeInSeconds: { type: Number, required: true, default: 0 },
}, { _id: false });

const SubmitAssessmentSchema: Schema = new Schema({
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User',    
        require:false,
        default: null     
    },
    totalSubmitTime: { type: Number, required: true },
    questions: [QuestionAssessmentSchema],
    paperTitle:{type:String}
});

 
const SubmitAssessment: Model<IAssessment> = mongoose.models.SubmitAssessment || mongoose.model<IAssessment>('SubmitAssessment', SubmitAssessmentSchema);

export default SubmitAssessment;
