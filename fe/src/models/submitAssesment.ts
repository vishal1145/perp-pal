import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAssessment extends Document {
  userId: string;
  totalSubmitTime: number;                 
  questions: {
    questionId: mongoose.Types.ObjectId;   
    userSelectAns: string;   
    submitTimeInSeconds: number;             
  }[];
}

const QuestionAssessmentSchema: Schema = new Schema({
  questionId: { type: mongoose.Types.ObjectId, ref: 'Question', required: true },  
  userSelectAns: { type: String },
  submitTimeInSeconds: { type: Number, require:true, default:0  },
}, { _id: false });  

const SubmitAssessmentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  totalSubmitTime: { type: Number, require:true },  
  questions: [QuestionAssessmentSchema],  
});

const SubmitAssessment: Model<IAssessment> = mongoose.models.Assessment || mongoose.model<IAssessment>('SubmitAssessment', SubmitAssessmentSchema);

export default SubmitAssessment;
