const express = require("express");
const mongoose = require("mongoose");
const Chapter = require("../../models/chapter");
const Subject = require("../../models/subject");
const Class = require("../../models/class");
const Board = require("../../models/Board"); // Assuming you have a Board model

const router = express.Router();

router.put("/:id", async (req, res) => {
    try {
        const chapterId = req.params.id;

        if (!chapterId || !mongoose.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ message: "Valid Chapter ID is required" });
        }

        const { chapterName, subjectId, classId, content, boardId, publishStatus } = req.body;

        if (!chapterName || !subjectId || !classId || !content || !boardId) {
            return res.status(400).json({
                message: "chapterName, subjectId, classId, content, and boardId are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({ message: "Invalid subjectId format" });
        }

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ message: "Invalid classId format" });
        }

        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({ message: "Invalid boardId format" });
        }

        const subjectExists = await Subject.findById(subjectId);
        if (!subjectExists) {
            return res.status(404).json({
                message: "Subject with the given ID does not exist",
            });
        }

        const classExists = await Class.findById(classId);
        if (!classExists) {
            return res.status(404).json({
                message: "Class with the given ID does not exist",
            });
        }

        const boardExists = await Board.findById(boardId); // Check if board exists
        if (!boardExists) {
            return res.status(404).json({
                message: "Board with the given ID does not exist",
            });
        }

        const updatedChapter = await Chapter.findByIdAndUpdate(
            chapterId,
            { chapterName, subjectId, classId, content, boardId, publishStatus }, // Add boardId to the update
            { new: true }
        );

        if (!updatedChapter) {
            return res.status(404).json({ message: "Chapter not found or failed to update" });
        }

        return res.status(200).json({
            message: "Chapter updated successfully",
            chapter: updatedChapter,
        });
    } catch (error) {
        console.error("Error updating chapter:", error.message);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;
