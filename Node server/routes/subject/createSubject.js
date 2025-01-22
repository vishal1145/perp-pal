const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Subject = require("../../models/subject");
const Class = require("../../models/class");

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
        const { subjectName, color, content, classIds } = req.body;
        const file = req.file;

    
        if (!subjectName || !color || !content || !classIds || !file) {
            return res.status(400).json({
                message: "subjectName, image, color, content, and classIds are required",
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

        const imageUrl = `/uploads/${file.filename}`;

        const newSubject = new Subject({
            subjectName,
            image: imageUrl,
            color,
            classIds: objectIdClassIds,
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
