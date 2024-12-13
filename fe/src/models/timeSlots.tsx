import mongoose, { Document, Model, Schema,Types } from 'mongoose';


interface ITimeSlot extends Document {
   
    tutor_id: Types.ObjectId;
    start_time: Date;
    end_time: Date;
}


const timeSlotSchema: Schema<ITimeSlot> = new Schema({
   
    tutor_id: {
        type: Schema.Types.ObjectId, 
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
