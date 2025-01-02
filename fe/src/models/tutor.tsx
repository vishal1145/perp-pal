import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITutor extends Document {
   
    name: string;
    subject: string;
    bio: string;
    created_at: Date;
    email: string;
    password: string;
}

const tutorSchema: Schema<ITutor> = new Schema({
    
    name: {
        type: String,
        maxlength: 255, 
    },
    subject: {
        type: String,
        maxlength: 255, 
    }, 
    bio: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,  
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
});

const Tutor: Model<ITutor> = mongoose.models.Tutor || mongoose.model<ITutor>("Tutor", tutorSchema);

export default Tutor;
