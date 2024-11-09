import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IStartAssessment extends Document {
    userId: mongoose.Types.ObjectId;   
    questions: mongoose.Types.ObjectId[];  
}
 
const startAssessmentSchema: Schema = new Schema({
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User',   
    },

    questions: [{ 
        type: mongoose.Types.ObjectId,   
        ref: 'Question', 
        required: true,  
    }],
});

const StartAssessment: Model<IStartAssessment> = mongoose.models.StartAssessment || mongoose.model<IStartAssessment>('StartAssessment', startAssessmentSchema);
export default StartAssessment;