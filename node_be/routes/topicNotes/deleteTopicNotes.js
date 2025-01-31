const express = require('express');
const mongoose = require('mongoose');
const TopicNote = require('../../models/topicNotes');

const router = express.Router();

// DELETE route to delete a TopicNote
router.delete('/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;  // Extract the noteId from the URL parameter

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: "Invalid Note ID format." });
        }

        // Find and delete the TopicNote
        const deletedNote = await TopicNote.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return res.status(404).json({ message: "TopicNote not found." });
        }

        return res.status(200).json({
            message: "TopicNote deleted successfully.",
            note: deletedNote,
        });
    } catch (error) {
        console.error("Error deleting TopicNote:", error.message);
        return res.status(500).json({
            message: "Internal Server Error.",
            error: error.message,
        });
    }
});

module.exports = router;
