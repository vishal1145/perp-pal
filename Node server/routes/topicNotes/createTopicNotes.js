const express = require('express');
const mongoose = require('mongoose');
const TopicNote = require('../../models/topicNotes');
const ChapterTopic = require('../../models/chapterTopic');

const router = express.Router();

// POST route to create new TopicNote
router.post('/', async (req, res) => {
    try {
        const { TopicId, content } = req.body;

        // Validate input
        if (!TopicId || !content) {
            return res.status(400).json({ message: "TopicId and content are required." });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(TopicId)) {
            return res.status(400).json({ message: "Invalid TopicId format." });
        }

        // Check if the chapter exists
        const chapterExists = await ChapterTopic.findById(TopicId);
        if (!chapterExists) {
            return res.status(404).json({ message: "Topic with the given ID does not exist." });
        }

        // Create the new topic note
        const newTopicNote = await TopicNote.create({
            TopicId,
            content,
        });

        return res.status(200).json({
            message: "Topic note created successfully.",
            chapter: newTopicNote,
        });

    } catch (error) {
        console.error("Error creating topic note:", error.message);
        return res.status(500).json({ message: "Internal Server Error.", error: error.message });
    }
});

module.exports = router;
