import mongoose, { Document, Model, Schema,Types } from 'mongoose';


interface ISession extends Document {
 
    tuition_id: Types.ObjectId;
    user_id: Types.ObjectId;
    session_date: Date;
    session_start: Date;
    session_end: Date;
    status: 'Pending' | 'Completed' | 'Missed';
}


const sessionSchema: Schema<ISession> = new Schema({
   
    tuition_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Tuition',
        required: true,
      },
      user_id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    session_date: {
        type: Date,
    },
    session_start: {
        type: Date,
    },
    session_end: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Missed'],
    },
});


const Session: Model<ISession> = mongoose.models.Session || mongoose.model<ISession>("Session", sessionSchema);

export default Session;
