const express = require('express');
const mongoose = require('mongoose');
const ChapterTopic = require('../../models/chapterTopic');

const router = express.Router();

// DELETE route to delete a chapter topic
router.delete('/:chapterTopicId', async (req, res) => {
    try {
        const { chapterTopicId } = req.params;

        if (!chapterTopicId) {
            return res.status(400).json({ message: "ChapterTopic ID is required." });
        }

        // Validate chapterTopicId format
        if (!mongoose.Types.ObjectId.isValid(chapterTopicId)) {
            return res.status(400).json({ message: "Invalid chapterTopic ID format." });
        }

        // Find and delete the chapter topic
        const deletedChapterTopic = await ChapterTopic.findByIdAndDelete(chapterTopicId);

        if (!deletedChapterTopic) {
            return res.status(404).json({ message: "ChapterTopic with the given ID does not exist." });
        }

        return res.status(200).json({
            message: "Chapter topic deleted successfully.",
            chapterTopic: deletedChapterTopic,
        });
    } catch (error) {
        console.error("Error deleting chapter topic:", error);
        return res.status(500).json({ message: "Internal Server Error.", error: error.message });
    }
});

module.exports = router;
