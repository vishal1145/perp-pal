const express = require('express');
const mongoose = require('mongoose');
const Class = require('../../models/class');
const Board = require('../../models/Board');

const router = express.Router();

router.put('/:id', async (req, res) => {
    try {
        const { id: classId } = req.params;

        if (!classId || !mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ message: 'Invalid class ID' });
        }

        const { className, color, boardIds, publishStatus } = req.body; // Include status field

        if (!className || !color) {
            return res.status(400).json({ message: 'Class name and color are required' });
        }

        if (boardIds && !Array.isArray(boardIds)) {
            return res.status(400).json({ message: 'boardIds must be an array of ObjectId' });
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
                return res.status(400).json({
                    message: 'Invalid boardId(s): ' + invalidBoardIds.join(', '),
                });
            }
        }

        const classToUpdate = await Class.findById(classId);
        if (!classToUpdate) {
            return res.status(404).json({ message: 'Class not found' });
        }

        classToUpdate.className = className;
        classToUpdate.color = color;
        classToUpdate.publishStatus = publishStatus; // Update status field
        classToUpdate.boardIds = boardIds || classToUpdate.boardIds;

        await classToUpdate.save();

        return res.status(200).json({
            message: 'Class updated successfully',
            class: classToUpdate,
        });
    } catch (error) {
        console.error('Error updating class:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});

module.exports = router;
