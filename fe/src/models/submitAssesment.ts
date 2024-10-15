import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAssessment extends Document {
  userId: string;
  totalSubmitTime: Date;                 
  questions: {
    questionId: mongoose.Types.ObjectId;   
    userSelectAns: string;   
    submitTime: Date;             
  }[];
}

const QuestionAssessmentSchema: Schema = new Schema({
  questionId: { type: mongoose.Types.ObjectId, ref: 'Question', required: true },  
  userSelectAns: { type: String },
  submitTime: { type: Date  },
}, { _id: false });  

const SubmitAssessmentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  totalSubmitTime: { type: Date, default: Date.now },  
  questions: [QuestionAssessmentSchema],  
});

const Assessment: Model<IAssessment> = mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', SubmitAssessmentSchema);

export default Assessment;
