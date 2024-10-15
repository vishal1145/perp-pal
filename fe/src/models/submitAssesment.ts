import mongoose, { Document, Model, Schema } from 'mongoose';

interface IAssessment extends Document {
  userId: string;
  submitTime: Date;                 
  questions: {
    questionId: mongoose.Types.ObjectId;   
    userSelectAns: string;                  
  }[];
}

const QuestionAssessmentSchema: Schema = new Schema({
  questionId: { type: mongoose.Types.ObjectId, ref: 'Question', required: true },  
  userSelectAns: { type: String },
}, { _id: false });  

const SubmitAssessmentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  submitTime: { type: Date, default: Date.now },  
  questions: [QuestionAssessmentSchema],  
});

export const Assessment: Model<IAssessment> = mongoose.models.Assessment || mongoose.model<IAssessment>('SubmitAssessment', SubmitAssessmentSchema);
