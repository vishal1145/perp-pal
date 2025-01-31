const express = require("express");
const mongoose = require("mongoose");
const Chapter = require("../../models/chapter");

const router = express.Router();

// DELETE route for deleting a chapter
router.delete("/:id", async (req, res) => {
    try {
        const chapterId = req.params.id;

        // Validate the chapterId
        if (!chapterId || !mongoose.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ message: "Valid Chapter ID is required" });
        }

        // Check if the chapter exists
        const chapterExists = await Chapter.findById(chapterId);
        if (!chapterExists) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        // Delete the chapter
        const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

        if (!deletedChapter) {
            return res.status(500).json({ message: "Error deleting chapter" });
        }

        return res.status(200).json({
            message: "Chapter deleted successfully",
            chapter: deletedChapter,
        });
    } catch (error) {
        console.error("Error deleting chapter:", error.message);
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;
