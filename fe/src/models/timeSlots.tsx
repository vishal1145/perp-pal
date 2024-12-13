import mongoose, { Document, Model, Schema } from 'mongoose';


interface ITimeSlot extends Document {
    slot_id: number;
    tutor_id: number;
    start_time: Date;
    end_time: Date;
}


const timeSlotSchema: Schema<ITimeSlot> = new Schema({
    slot_id: {
        type: Number,
        unique: true, 
        index: true, 
    },
    tutor_id: {
        type: Number,
        ref: 'Tutor',  
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
});


const TimeSlot: Model<ITimeSlot> = mongoose.models.TimeSlot || mongoose.model<ITimeSlot>("TimeSlot", timeSlotSchema);

export default TimeSlot;
