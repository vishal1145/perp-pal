const express = require('express');
const mongoose = require('mongoose');
const TopicNote = require('../../models/topicNotes');
const ChapterTopic = require('../../models/chapterTopic');

const router = express.Router();

// PUT route to update a TopicNote
router.put('/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;  // Extract the noteId from the URL parameter
        const { TopicId, content, publishStatus } = req.body;

        // Validate input
        if (!TopicId || !content) {
            return res.status(400).json({ message: "TopicId and content are required." });
        }

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(TopicId)) {
            return res.status(400).json({ message: "Invalid TopicId format." });
        }

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: "Invalid Note ID format." });
        }

        // Check if the topic exists
        const chapterExists = await ChapterTopic.findById(TopicId);
        if (!chapterExists) {
            return res.status(404).json({ message: "Topic with the given ID does not exist." });
        }

        // Find and update the TopicNote
        const updatedNote = await TopicNote.findByIdAndUpdate(
            noteId,
            { TopicId, content, publishStatus },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Error updating TopicNote. Note not found." });
        }

        return res.status(200).json({
            message: "TopicNote updated successfully.",
            note: updatedNote,
        });
    } catch (error) {
        console.error("Error updating topic note:", error.message);
        return res.status(500).json({
            message: "Internal Server Error.",
            error: error.message,
        });
    }
});

module.exports = router;
