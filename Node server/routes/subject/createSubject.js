const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Subject = require("../../models/subject");
const Class = require("../../models/class");
const Board = require("../../models/Board")

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.join(__dirname, "../../public/uploads");
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, `subject_image_${Date.now()}_${file.originalname}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});


router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { subjectName, color, content, classIds, boardId } = req.body;
        const file = req.file;

        if (!subjectName || !color || !content || !classIds || !file || !boardId) {
            return res.status(400).json({
                message: "subjectName, image, color, content, classIds, and boardId are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            return res.status(400).json({ message: "Invalid boardId" });
        }

        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        let parsedClassIds = [];
        try {
            parsedClassIds = Array.isArray(classIds) ? classIds : JSON.parse(classIds);
        } catch (error) {
            return res.status(400).json({ message: "Invalid classIds format. Expected an array." });
        }

        const invalidClassIds = parsedClassIds.filter((id) => !mongoose.Types.ObjectId.isValid(id));
        if (invalidClassIds.length > 0) {
            return res.status(400).json({ message: `Invalid classId(s): ${invalidClassIds.join(", ")}` });
        }

        const objectIdClassIds = parsedClassIds.map((id) => new mongoose.Types.ObjectId(id));
        const classes = await Class.find({ "_id": { $in: objectIdClassIds } });

        // Check if each class has the selected boardId
        const invalidClasses = classes.filter((classItem) => {
            return !classItem.boardIds.some((board) => board._id.toString() === boardId);
        });

        if (invalidClasses.length > 0) {
            return res.status(400).json({
                message: "Some classIds are invalid or do not belong to the selected board.",
                invalidClasses: invalidClasses,
            });
        }

        const imageUrl = `/uploads/${file.filename}`;

        const newSubject = new Subject({
            subjectName,
            image: imageUrl,
            color,
            classIds: objectIdClassIds,
            boardId,
            content,
        });

        await newSubject.save();

        return res.status(201).json({
            message: "Subject created successfully",
            subject: newSubject,
        });
    } catch (error) {
        console.error("Error creating subject:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;
