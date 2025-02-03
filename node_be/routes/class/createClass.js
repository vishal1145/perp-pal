const express = require('express');
const mongoose = require('mongoose');
const Class = require('../../models/class');
const Board = require('../../models/Board');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { className, color, boardIds, publishStatus } = req.body;  // status is optional

        if (!className || !color) {
            return res.status(400).json({ message: "Class name and color are required" });
        }

        if (boardIds && !Array.isArray(boardIds)) {
            return res.status(400).json({ message: "boardIds must be an array of ObjectId" });
        }

        if (boardIds && boardIds.length > 0) {
            const invalidBoardIds = [];
            for (let boardId of boardIds) {
                if (!mongoose.Types.ObjectId.isValid(boardId)) {
                    invalidBoardIds.push(boardId);
                    continue;
                }
                const boardExists = await Board.exists({ _id: boardId });
                if (!boardExists) invalidBoardIds.push(boardId);
            }
            if (invalidBoardIds.length > 0) {
                return res.status(400).json({ message: "Invalid boardId(s): " + invalidBoardIds.join(", ") });
            }
        }

        // Create new class with status (if status is missing, model's default will be used)
        const newClass = new Class({
            className,
            color,
            boardIds,
            publishStatus: publishStatus && ["published", "unpublished"].includes(publishStatus) ? publishStatus : undefined
        });

        await newClass.save();

        res.status(200).json({ message: "Class created successfully", class: newClass });

    } catch (error) {
        console.error("Error creating class:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
