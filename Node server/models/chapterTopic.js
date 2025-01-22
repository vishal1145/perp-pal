const mongoose = require("mongoose");
const Chapter = require("./chapter");
const chapterTopicSchema = new mongoose.Schema({
    chapterTopicName: { type: String, required: true },
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chapter",
    },
    subjectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' },
    classId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Class' },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    content: {
        type: String,
        required: false,
    },
});

const ChapterTopic = mongoose.models.ChapterTopic || mongoose.model("ChapterTopic", chapterTopicSchema);

module.exports = ChapterTopic;
