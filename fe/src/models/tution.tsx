import mongoose, { Document, Model, Schema } from 'mongoose';


interface ITuition extends Document {
    tuition_id: number;
    user_id: number;
    tutor_id: number;
    subject: string;
    slot_id: number;
    start_date: Date;
    end_date: Date;
    purchase_date: Date;
}


const tuitionSchema: Schema<ITuition> = new Schema({
    tuition_id: {
        type: Number,
        unique: true,  
        index: true,   
    },
    user_id: {
        type: Number,
        ref: 'User', 
    },
    tutor_id: {
        type: Number,
        ref: 'Tutor',  
    },
    subject: {
        type: String,
    },
    slot_id: {
        type: Number,
        ref: 'TimeSlot', 
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    purchase_date: {
        type: Date,
        default: Date.now,  
    },
});


const Tuition: Model<ITuition> = mongoose.models.Tuition || mongoose.model<ITuition>("Tuition", tuitionSchema);

export default Tuition;
