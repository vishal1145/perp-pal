const path = require('path');
const { unlink } = require('fs').promises;
const Board = require('../../models/Board');
const express = require('express');
const router = express.Router();


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Board ID is required" });
        }

        const board = await Board.findById(id);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        const imagePath = path.join(__dirname, '../../public', board.image);

        try {
            await unlink(imagePath);
            console.log("Image deleted successfully");
        } catch (error) {
            console.error("Error deleting image:", error);
        }

        await Board.deleteOne({ _id: id });

        return res.status(200).json({ message: "Board deleted successfully" });

    } catch (error) {
        console.error("Error deleting board:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
