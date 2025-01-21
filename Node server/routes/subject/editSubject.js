const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs"); 
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
    limits: { fileSize: 5 * 1024 * 1024 },
});


router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { subjectName, color, content, classIds } = req.body;
        const file = req.file;
        const subjectId = req.params.id;


        if (!subjectName || !color || !content || !classIds) {
            return res.status(400).json({
                message: "subjectName, color, content, and classIds are required",
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

        subject.subjectName = subjectName;
        subject.color = color;
        subject.content = content;
        subject.classIds = objectIdClassIds;


        if (file) {

            fs.unlink(path.join(__dirname, "../../public", subject.image), (err) => {
                if (err) console.log("Error deleting old image: ", err);
            });

            const imageUrl = `/uploads/${file.filename}`;
            subject.image = imageUrl;
        }
        await subject.save();

        return res.status(200).json({
            message: "Subject updated successfully",
            subject,
        });
    } catch (error) {
        console.error("Error updating subject:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;
