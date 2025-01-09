import mongoose, { Document, Schema, Model } from "mongoose";


interface IClass extends Document {
    className: string;
    color: string;
    boardIds: mongoose.Types.ObjectId[];
}

const classSchema = new Schema<IClass>({
    className: { type: String, required: true },
    color: { type: String, required: true },
    boardIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
    }],
});


const Class: Model<IClass> = mongoose.models.Class || mongoose.model<IClass>('Class', classSchema);

export default Class;
