const express = require('express');
const TopicNote = require('../../models/topicNotes');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { TopicId, TopicNoteId } = req.query;

        let TopicNotes;

        // If TopicNoteId is provided, fetch a specific topic note by its ID
        if (TopicNoteId) {
            TopicNotes = await TopicNote.findById(TopicNoteId)
                .populate("TopicId", "_id chapterTopicName")
                .populate("chapterId", "_id chapterName")
                .populate("subjectId", "_id subjectName")
                .populate("classId", "_id className")
                .populate("boardId", "_id name");
        }
        // If TopicId is provided, fetch topic notes for a specific TopicId
        else if (TopicId) {
            TopicNotes = await TopicNote.find({ TopicId })
                .populate("TopicId", "_id chapterTopicName")
                .populate("chapterId", "_id chapterName")
                .populate("subjectId", "_id subjectName")
                .populate("classId", "_id className")
                .populate("boardId", "_id name");
        }
        // If no query params are provided, fetch all topic notes
        else {
            TopicNotes = await TopicNote.find()
                .populate("TopicId", "_id chapterTopicName")
                .populate("chapterId", "_id chapterName")
                .populate("subjectId", "_id subjectName")
                .populate("classId", "_id className")
                .populate("boardId", "_id name");
        }

        // If no notes were found
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
