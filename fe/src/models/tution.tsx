import mongoose, { Document, Model, Schema,Types } from 'mongoose';


interface ITuition extends Document {
    
    user_id: Types.ObjectId;
    tutor_id: Types.ObjectId;
    subject: string;
    slot_id: Types.ObjectId;
    start_date: Date;
    end_date: Date;
    purchase_date: Date;
}


const tuitionSchema: Schema<ITuition> = new Schema({
   
    
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    tutor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor',  
    },
    subject: {
        type: String,
    },
    slot_id: {
        type: Schema.Types.ObjectId,
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
