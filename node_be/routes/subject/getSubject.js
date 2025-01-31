const express = require('express');
const mongoose = require('mongoose');

const Subject = require('../../models/subject');

const app = express();
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { classId, boardId } = req.query;

        // Validate classId
        if (!classId) {
            return res.status(400).json({ message: "classId is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ message: "Invalid classId format" });
        }
        const objectIdClassId = new mongoose.Types.ObjectId(classId);

        // Validate boardId (if provided)
        if (boardId && !mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({ message: "Invalid boardId format" });
        }
        const objectIdBoardId = boardId ? new mongoose.Types.ObjectId(boardId) : null;

        // Query the database based on classId and optionally boardId
        const query = {
            classIds: objectIdClassId,
        };
        if (objectIdBoardId) {
            query.boardId = objectIdBoardId;
        }

        const subjects = await Subject.find(query)
            .populate({
                path: "classIds",
                select: "className",
            })
            .populate({
                path: "boardId",
                select: "name",
            });

        if (!subjects || subjects.length === 0) {
            return res.status(404).json({ message: `No subjects found for classId ${classId} ${boardId ? 'and boardId ' + boardId : ''}` });
        }

        return res.status(200).json({
            message: "Subjects for the selected class and board fetched successfully",
            subjects,
        });

    } catch (error) {
        console.error("Error fetching subjects by class and board:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
