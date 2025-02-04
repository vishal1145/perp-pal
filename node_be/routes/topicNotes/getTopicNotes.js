const express = require('express');
const TopicNote = require('../../models/topicNotes');

const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const { TopicId, TopicNoteId } = req.query;

        let TopicNotes;
        if (TopicNoteId) {
            TopicNotes = await TopicNote.findById(TopicNoteId).populate("TopicId", "chapterTopicName");
        } else if (TopicId) {
            TopicNotes = await TopicNote.find({ TopicId }).populate("TopicId", "chapterTopicName");
        } else {
            TopicNotes = await TopicNote.find().populate("TopicId", "chapterTopicName");
        }

        if (!TopicNotes || TopicNotes.length === 0) {
            return res.status(404).json({
                message: TopicNoteId ? "Note not found" : TopicId ? "No notes found for this topic" : "No notes found"
            });
        }


        return res.status(200).json({ TopicNotes });
    } catch (error) {
        console.error("Error fetching topic notes:", error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
