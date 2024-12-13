import mongoose, { Document, Model, Schema } from 'mongoose';


interface ISession extends Document {
    session_id: number;
    tuition_id: number;
    user_id: number;
    session_date: Date;
    session_start: Date;
    session_end: Date;
    status: 'Pending' | 'Completed' | 'Missed';
}


const sessionSchema: Schema<ISession> = new Schema({
    session_id: {
        type: Number,
        unique: true,  
        index: true,  
    },
    tuition_id: {
        type: Number,
        ref: 'Tuition', 
    },
    user_id: {
        type: Number,
        ref: 'User', 
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
