import mongoose, { Document, Schema, Model } from "mongoose";

interface ISubject extends Document {
    subjectName: string;
    color: string;
    image: string;
    classIds: mongoose.Types.ObjectId[];
}

const subjectSchema = new Schema<ISubject>({
    subjectName: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: false },
    classIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    }],
});

const Subject: Model<ISubject> = mongoose.models.Subject || mongoose.model<ISubject>('Subject', subjectSchema);

export default Subject;
