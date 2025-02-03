const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");
const Subject = require("../../models/subject");
const Class = require("../../models/class");
const Board = require("../../models/Board"); // Assuming you have a Board model

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
    limits: { fileSize: 5 * 1024 * 1024 },
});


router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { subjectName, color, content, classIds, boardId, publishStatus } = req.body;
        const file = req.file;
        const subjectId = req.params.id;


        if (!subjectName || !color || !content || !classIds || !boardId) {
            return res.status(400).json({
                message: "subjectName, color, content, classIds, and boardId are required",
            });
        }


        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({
                message: `Subject with ID ${subjectId} not found.`,
            });
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
        if (classes.length !== parsedClassIds.length) {
            return res.status(400).json({ message: "Some classIds are invalid or do not exist." });
        }

        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(400).json({ message: `Invalid boardId: ${boardId}` });
        }


        subject.subjectName = subjectName;
        subject.color = color;
        subject.content = content;
        subject.classIds = parsedClassIds;
        subject.boardId = boardId;
        subject.publishStatus = publishStatus;
        if (file) {
            subject.image = `/uploads/${file.filename}`;
        }

        await subject.save();

        res.status(200).json({ message: "Subject updated successfully", subject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while updating subject." });
    }
});


module.exports = router;
