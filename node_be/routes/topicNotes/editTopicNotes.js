const express = require('express');
const mongoose = require('mongoose');
const TopicNote = require('../../models/topicNotes');
const ChapterTopic = require('../../models/chapterTopic');
const Class = require('../../models/class');
const Board = require('../../models/Board');
const Subject = require('../../models/subject');

const router = express.Router();

// PUT route to update a TopicNote
router.put('/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;  // Extract the noteId from the URL parameter
        const { chapterId, subjectId, classId, boardId, TopicId, content, publishStatus } = req.body;

        // Validate input
        if (!chapterId || !subjectId || !classId || !boardId || !TopicId || !content) {
            return res.status(400).json({ message: "All fields (chapterId, subjectId, classId, boardId, TopicId, content) are required." });
        }

        // Validate ObjectId formats
        if (
            !mongoose.Types.ObjectId.isValid(chapterId) ||
            !mongoose.Types.ObjectId.isValid(subjectId) ||
            !mongoose.Types.ObjectId.isValid(classId) ||
            !mongoose.Types.ObjectId.isValid(boardId) ||
            !mongoose.Types.ObjectId.isValid(TopicId) ||
            !mongoose.Types.ObjectId.isValid(noteId)
        ) {
            return res.status(400).json({ message: "Invalid ObjectId format." });
        }

        // Check if the references exist in their respective collections
        const chapterExists = await ChapterTopic.findById(TopicId);
        if (!chapterExists) {
            return res.status(404).json({ message: "Topic with the given TopicId does not exist." });
        }

        const classExists = await Class.findById(classId);
        if (!classExists) {
            return res.status(404).json({ message: "Class with the given ID does not exist." });
        }

        const boardExists = await Board.findById(boardId);
        if (!boardExists) {
            return res.status(404).json({ message: "Board with the given ID does not exist." });
        }

        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return res.status(404).json({ message: "Subject with the given ID does not exist." });
        }

        // Update the TopicNote
        const updatedNote = await TopicNote.findByIdAndUpdate(
            noteId,
            { chapterId, subjectId, classId, boardId, TopicId, content, publishStatus },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "TopicNote not found for update." });
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
