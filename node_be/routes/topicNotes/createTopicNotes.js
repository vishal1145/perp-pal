const express = require('express');
const mongoose = require('mongoose');
const TopicNote = require('../../models/topicNotes');
const ChapterTopic = require('../../models/chapterTopic');
const Class = require('../../models/class');
// const Board = require('../../models/board');
const Board = require("../../models/Board");
const Subject = require('../../models/subject');

const router = express.Router();

// POST route to create new TopicNote
router.post('/', async (req, res) => {
    try {
        const { chapterId, subjectId, classId, boardId, TopicId, content, publishStatus } = req.body;

        const existingNote = await TopicNote.findOne({
            boardId,
            classId,
            subjectId,
            chapterId,
            TopicId,
        });

        if (existingNote) {
            // If an existing note is found, return an error message
            return res.status(400).json({
                message: "A topic note with the same Board, Class, Subject, Chapter, and Topic already exists."
            });
        }
        // Validate input
        if (!chapterId || !subjectId || !classId || !boardId || !TopicId || !content) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate ObjectId format
        if (
            !mongoose.Types.ObjectId.isValid(chapterId) ||
            !mongoose.Types.ObjectId.isValid(subjectId) ||
            !mongoose.Types.ObjectId.isValid(classId) ||
            !mongoose.Types.ObjectId.isValid(boardId) ||
            !mongoose.Types.ObjectId.isValid(TopicId)
        ) {
            return res.status(400).json({ message: "Invalid ID format." });
        }

        // Check if the references exist in their respective collections
        const chapterExists = await ChapterTopic.findById(TopicId);
        if (!chapterExists) {
            return res.status(404).json({ message: "Topic with the given ID does not exist." });
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

        // Create the new topic note
        const newTopicNote = await TopicNote.create({

            boardId,
            classId,
            subjectId,
            chapterId,
            TopicId,
            content,
            publishStatus: publishStatus && ["published", "unpublished"].includes(publishStatus) ? publishStatus : "published", // Use default if undefined
        });

        return res.status(200).json({
            message: "Topic note created successfully.",
            topicNote: newTopicNote,
        });

    } catch (error) {
        console.error("Error creating topic note:", error.message);
        return res.status(500).json({ message: "Internal Server Error.", error: error.message });
    }
});

module.exports = router;
