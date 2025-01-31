const express = require("express");
const path = require("path");
const UploadData = require("../../models/Pdf");
const router = express.Router();

// Get all uploaded PDF data along with file URL
router.get("/", async (req, res) => {
    try {
        // Fetch all data from MongoDB
        const uploadedData = await UploadData.find();

        if (uploadedData.length === 0) {
            return res.status(404).json({ message: "No uploaded files found." });
        }

        // Prepare response data with file URL
        const responseData = uploadedData.map((data) => {
            const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${data.pdfFileName}`;
            return {
                id: data._id,
                pdfName: data.pdfFileName,
                filePath: fileUrl,
                jsonData: data.jsonData,
            };
        });

        res.status(200).json({
            message: "Files retrieved successfully.",
            data: responseData,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data." });
    }
});

// Get uploaded PDF data by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the data by ID from MongoDB
        const data = await UploadData.findById(id);

        if (!data) {
            return res.status(404).json({ message: "File not found." });
        }

        // Prepare the response data
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${data.pdfFileName}`;

        res.status(200).json({
            message: "File retrieved successfully.",
            data: {
                id: data._id,
                pdfName: data.pdfFileName,
                filePath: fileUrl,
                jsonData: data.jsonData,
            },
        });
    } catch (error) {
        console.error("Error fetching data by ID:", error);
        res.status(500).json({ message: "Error fetching data." });
    }
});

// Get file by filename (already implemented)
router.get("/:filename", (req, res) => {
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
