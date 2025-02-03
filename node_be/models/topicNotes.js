const mongoose = require('mongoose');

const topicNoteSchema = new mongoose.Schema({
    TopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChapterTopic', required: true },
    content: { type: String, required: true },
    publishStatus: {
        type: String,
        enum: ["published", "unpublished"],
        default: "published",
    }
});

const TopicNote = mongoose.model('TopicNote', topicNoteSchema);

module.exports = TopicNote;
