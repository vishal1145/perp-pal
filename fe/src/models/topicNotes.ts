import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITopicNote extends Document {
    TopicId: mongoose.Types.ObjectId;
    content: string;
}

const topicNoteSchema = new Schema<ITopicNote>({
    TopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChapterTopic', required: true },
    content: { type: String, required: true }
});

const TopicNote: Model<ITopicNote> = mongoose.models.TopicNote || mongoose.model<ITopicNote>('TopicNote', topicNoteSchema);

export default TopicNote;
