const mongoose = require("mongoose");
const Chapter = require("./chapter");
const chapterTopicSchema = new mongoose.Schema({
    chapterTopicName: { type: String, required: true },
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chapter",
    },
});

const ChapterTopic = mongoose.models.ChapterTopic || mongoose.model("ChapterTopic", chapterTopicSchema);

module.exports = ChapterTopic;
