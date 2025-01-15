import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChapter extends Document {
    chapterName: string;
    subjectId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
}

const chapterSchema = new Schema<IChapter>({
    chapterName: { type: String, required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' },
    classId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Class' },
});

const Chapter: Model<IChapter> = mongoose.models.Chapter || mongoose.model<IChapter>('Chapter', chapterSchema);

export default Chapter;
