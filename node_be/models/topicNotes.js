const mongoose = require('mongoose');

const topicNoteSchema = new mongoose.Schema({
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },
    TopicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChapterTopic',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publishStatus: {
        type: String,
        enum: ["published", "unpublished"],
        default: "published",
    }
}, { timestamps: true });

const TopicNote = mongoose.model('TopicNote', topicNoteSchema);
module.exports = TopicNote;
