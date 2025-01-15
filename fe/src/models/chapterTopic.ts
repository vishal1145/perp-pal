import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChapterTopic extends Document {
    chapterTopicName: string;
    chapterId: string;
}

const chapterTopicSchema = new Schema<IChapterTopic>({
    chapterTopicName: { type: String },
    chapterId: mongoose.Types.ObjectId,
});

const ChapterTopic: Model<IChapterTopic> = mongoose.models.ChapterTopic || mongoose.model<IChapterTopic>('ChapterTopic', chapterTopicSchema);

export default ChapterTopic;
