import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChapterTopic extends Document {
    chapterTopicName: string;
    chapterId: mongoose.Schema.Types.ObjectId;
}

const chapterTopicSchema = new Schema<IChapterTopic>({
    chapterTopicName: { type: String },
    chapterId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Chapter'  
    }
});

const ChapterTopic: Model<IChapterTopic> = mongoose.models.ChapterTopic || mongoose.model<IChapterTopic>('ChapterTopic', chapterTopicSchema);

export default ChapterTopic;
