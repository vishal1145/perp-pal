const express = require("express");
const mongoose = require("mongoose");
const Subject = require("../../models/subject");
const Chapter = require("../../models/chapter");
const Class = require("../../models/class");
const Board = require("../../models/Board");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { chapterName, subjectId, classId, content, boardId, publishStatus } = req.body;

        if (!chapterName || !subjectId || !classId || !content || !boardId) {
            return res.status(400).json({
                message: "chapterName, subjectId, classId, content, and boardId are required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({ message: "Invalid subjectId format." });
        }

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ message: "Invalid classId format." });
        }

        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({ message: "Invalid boardId format." });
        }

        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return res.status(404).json({
                message: "Subject with the given ID does not exist.",
            });
        }

        const classExists = await Class.findById(classId);
        if (!classExists) {
            return res.status(404).json({
                message: "Class with the given ID does not exist.",
            });
        }

        const boardExists = await Board.findById(boardId);
        if (!boardExists) {
            return res.status(404).json({
                message: "Board with the given ID does not exist.",
            });
        }

        // Create the new chapter with content and boardId
        const newChapter = await Chapter.create({
            chapterName,
            subjectId,
            classId,
            content,
            boardId,
            publishStatus: publishStatus && ["published", "unpublished"].includes(publishStatus) ? publishStatus : undefined

        });

        return res.status(200).json({
            message: "Chapter created successfully.",
            chapter: newChapter,
        });
    } catch (error) {
        console.error("Error creating chapter:", error.message);
        return res.status(500).json({
            message: "Internal Server Error.",
            error: error.message,
        });
    }
});

module.exports = router;
