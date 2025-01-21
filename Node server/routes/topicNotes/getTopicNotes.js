const express = require('express');
const TopicNote = require('../../models/topicNotes');

const router = express.Router();

// Route to handle GET requests for Topic Notes
router.get('/', async (req, res) => {
    try {
        // Get query parameters
        const { TopicId, TopicNoteId } = req.query;

        let TopicNotes;

        // Fetch notes based on TopicId or TopicNoteId, or fetch all if neither are provided
        if (TopicNoteId) {
            // If TopicNoteId is provided, find the specific TopicNote
            TopicNotes = await TopicNote.findById(TopicNoteId).populate("TopicId", "chapterTopicName");
        } else if (TopicId) {
            // If only TopicId is provided, find notes for that specific TopicId
            TopicNotes = await TopicNote.find({ TopicId }).populate("TopicId", "chapterTopicName");
        } else {
            // If neither is provided, return all notes
            TopicNotes = await TopicNote.find().populate("TopicId", "chapterTopicName");
        }

        // Check if no notes exist
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
