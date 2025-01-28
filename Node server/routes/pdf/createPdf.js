const express = require("express");
const multer = require("multer");
const path = require("path");
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

router.post("/", upload.single("pdfFile"), async (req, res) => {
    try {
        const { jsonData } = req.body;

        if (!req.file || !jsonData) {
            return res.status(400).json({ message: "PDF file and JSON data are required" });
        }

        let parsedJsonData;
        try {
            parsedJsonData = JSON.parse(jsonData);
        } catch (err) {
            return res.status(400).json({ message: "Invalid JSON data" });
        }

        const newUpload = new UploadData({
            pdfFileName: req.file.filename,
            filePath: `/uploads/${req.file.filename}`,
            jsonData: parsedJsonData,
        });

        await newUpload.save();

        res.status(201).json({
            message: "Upload successful!",
            data: newUpload,
        });
    } catch (error) {
        console.error("Error uploading:", error);
        res.status(500).json({ message: "An error occurred during upload.", error: error.message });
    }
});

router.get("/pdf/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../../uploads", filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(404).json({ message: "File not found" });
        }
    });
});

module.exports = router;
