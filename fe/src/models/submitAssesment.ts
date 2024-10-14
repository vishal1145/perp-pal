import mongoose, { Document, Model, Schema } from 'mongoose';

interface IAssessment extends Document {
  userId: string;
  submitTime: Date;                 
  questions: {
    questionId: mongoose.Types.ObjectId;  // Reference to Question
    userSelectAns: string;                  
  }[];
}

// Define the schema for the questions array
const QuestionAssessmentSchema: Schema = new Schema({
  questionId: { type: mongoose.Types.ObjectId, ref: 'Question', required: true },  // Reference to the Question model
  userSelectAns: { type: String },
}, { _id: false }); // This prevents creating an _id field for each question

// Define the main assessment schema
const SubmitAssessmentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  submitTime: { type: Date, default: Date.now },  
  questions: [QuestionAssessmentSchema],  
});

// Create or use the Assessment model
export const Assessment: Model<IAssessment> = mongoose.models.Assessment || mongoose.model<IAssessment>('SubmitAssessment', SubmitAssessmentSchema);
