const express = require('express');
const mongoose = require('mongoose');
const ChapterTopic = require('../../models/chapterTopic');
const Chapter = require('../../models/chapter');
const Subject = require('../../models/subject');
const Class = require('../../models/class');
const Board = require('../../models/Board');

const router = express.Router();

router.put('/:chapterTopicId', async (req, res) => {
    try {
        const { chapterTopicId } = req.params;
        const { chapterTopicName, chapterId, subjectId, classId, boardId, content } = req.body;

        // Validation for required fields
        if (!chapterTopicName || !chapterId || !subjectId || !classId || !boardId) {
            return res.status(400).json({ message: "chapterTopicName, chapterId, subjectId, classId, and boardId are required" });
        }

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(chapterId) || !mongoose.Types.ObjectId.isValid(subjectId) || !mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Check if related entities exist
        const chapterExists = await Chapter.findById(chapterId);
        const subjectExists = await Subject.findById(subjectId);
        const classExists = await Class.findById(classId);
        const boardExists = await Board.findById(boardId);

        if (!chapterExists || !subjectExists || !classExists || !boardExists) {
            return res.status(404).json({ message: "One or more entities not found" });
        }

        // Update ChapterTopic
        const updatedChapterTopic = await ChapterTopic.findByIdAndUpdate(
            chapterTopicId,
            { chapterTopicName, chapterId, subjectId, classId, boardId, content },
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
