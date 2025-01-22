const express = require('express');
const mongoose = require('mongoose');

const Subject = require('../../models/subject');

const app = express();
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const { classId } = req.query;

        if (!classId) {
            return res.status(400).json({ message: "classId is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ message: "Invalid classId format" });
        }

        const objectIdClassId = new mongoose.Types.ObjectId(classId);

        const subjects = await Subject.find({
            classIds: objectIdClassId,
        }).populate({
            path: "classIds",
            select: "className",
        });

        if (!subjects || subjects.length === 0) {
            return res.status(404).json({ message: `No subjects found for classId ${classId}` });
        }

        return res.status(200).json({
            message: "Subjects for the selected class fetched successfully",
            subjects,
        });

    } catch (error) {
        console.error("Error fetching subjects by class:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
