const express = require('express');
const mongoose = require('mongoose');
const ChapterTopic = require('../../models/chapterTopic');
const Chapter = require('../../models/chapter');

const router = express.Router();

// PUT route to update a chapter topic
router.put('/:chapterTopicId', async (req, res) => {
    try {
        // Extract chapterTopicId from the URL params
        const { chapterTopicId } = req.params;

        if (!chapterTopicId) {
            return res.status(400).json({ message: "ChapterTopic ID is required" });
        }

        // Extract data from the request body
        const { chapterTopicName, chapterId } = req.body;

        if (!chapterTopicName || !chapterId) {
            return res.status(400).json({ message: "chapterTopicName and chapterId are required" });
        }

        // Validate ObjectId format for chapterId
        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ message: "Invalid chapterId format" });
        }

        // Check if the chapter exists
        const chapterExists = await Chapter.findById(chapterId);
        if (!chapterExists) {
            return res.status(404).json({ message: "Chapter with the given ID does not exist" });
        }

        // Find and update the chapterTopic
        const updatedChapterTopic = await ChapterTopic.findByIdAndUpdate(
            chapterTopicId,
            { chapterTopicName, chapterId },
            { new: true }
        );

        if (!updatedChapterTopic) {
            return res.status(500).json({ message: "Error updating ChapterTopic" });
        }

        return res.status(200).json({
            message: "ChapterTopic updated successfully",
            chapterTopic: updatedChapterTopic,
        });
    } catch (error) {
        console.error("Error updating ChapterTopic:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
