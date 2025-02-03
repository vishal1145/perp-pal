const express = require('express');
const mongoose = require('mongoose');
const ChapterTopic = require('../../models/chapterTopic');
const Chapter = require('../../models/chapter');
const Subject = require('../../models/subject');
const Class = require('../../models/class');
const Board = require('../../models/Board');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { chapterTopicName, chapterId, subjectId, classId, boardId, content, publishStatus } = req.body;


        if (!chapterTopicName || !chapterId || !subjectId || !classId || !boardId) {
            return res.status(400).json({ message: "chapterTopicName, chapterId, subjectId, classId, and boardId are required." });
        }


        if (!mongoose.Types.ObjectId.isValid(chapterId) || !mongoose.Types.ObjectId.isValid(subjectId) ||
            !mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({ message: "Invalid ID format." });
        }


        const chapterExists = await Chapter.findById(chapterId);
        if (!chapterExists) {
            return res.status(404).json({ message: "Chapter with the given ID does not exist." });
        }


        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return res.status(404).json({ message: "Subject with the given ID does not exist." });
        }


        const classExists = await Class.findById(classId);
        if (!classExists) {
            return res.status(404).json({ message: "Class with the given ID does not exist." });
        }


        const boardExists = await Board.findById(boardId);
        if (!boardExists) {
            return res.status(404).json({ message: "Board with the given ID does not exist." });
        }


        const newChapterTopic = await ChapterTopic.create({
            chapterTopicName,
            chapterId,
            subjectId,
            classId,
            boardId,
            content,
            publishStatus: publishStatus && ["published", "unpublished"].includes(publishStatus) ? publishStatus : undefined
        });


        return res.status(200).json({
            message: "Chapter topic created successfully.",
            chapterTopic: newChapterTopic
        });

    } catch (error) {
        console.error("Error creating chapter topic:", error.message);
        return res.status(500).json({ message: "Internal Server Error.", error: error.message });
    }
});

module.exports = router;
