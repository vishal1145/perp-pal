const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UploadData = require("../../models/Pdf");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../../uploads");
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.put("/:id", upload.single("pdfFile"), async (req, res) => {
    try {
        const { id } = req.params;
        const { jsonData } = req.body;

        const existingUpload = await UploadData.findById(id);
        if (!existingUpload) {
            return res.status(404).json({ message: "Record not found" });
        }

        const oldFilePath = path.join(__dirname, "../../uploads", existingUpload.pdfFileName);
        if (req.file) {
            if (fs.existsSync(oldFilePath)) {

                fs.unlink(oldFilePath, (err) => {
                    if (err) {
                        console.error("Error deleting old file:", err);
                        return res.status(500).json({ message: "Error deleting old file" });
                    }

                    existingUpload.pdfFileName = req.file.filename;
                    existingUpload.filePath = `/uploads/${req.file.filename}`;

                    saveAndRespond();
                });
            } else {

                existingUpload.pdfFileName = req.file.filename;
                existingUpload.filePath = `/uploads/${req.file.filename}`;
                saveAndRespond();
            }
        } else {
            saveAndRespond();
        }

        async function saveAndRespond() {
            if (jsonData) {
                try {
                    existingUpload.jsonData = JSON.parse(jsonData);
                } catch (err) {
                    return res.status(400).json({ message: "Invalid JSON data" });
                }
            }
            await existingUpload.save();

            res.status(200).json({
                message: "Update successful!",
                data: existingUpload,
            });
        }
    } catch (error) {
        console.error("Error updating:", error);
        res.status(500).json({ message: "An error occurred during update.", error: error.message });
    }
});

module.exports = router;
