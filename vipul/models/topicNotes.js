const mongoose = require('mongoose');

const topicNoteSchema = new mongoose.Schema({
    TopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChapterTopic', required: true },
    content: { type: String, required: true }
});

const TopicNote = mongoose.model('TopicNote', topicNoteSchema);

module.exports = TopicNote;
