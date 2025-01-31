const express = require("express");
const fs = require("fs");
const path = require("path");
const UploadData = require("../../models/Pdf");
const router = express.Router();


router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {

        const existingUpload = await UploadData.findById(id);
        if (!existingUpload) {
            return res.status(404).json({ message: "Record not found" });
        }


        const filePath = path.join(__dirname, "../../uploads", existingUpload.pdfFileName);

        fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error("File does not exist:", err);
                return res.status(404).json({ message: "File not found" });
            }

            fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                    return res.status(500).json({ message: "Error deleting file from the server" });
                }

                await UploadData.findByIdAndDelete(id);

                res.status(200).json({
                    message: "PDF file and associated data deleted successfully",
                });
            });
        });
    } catch (error) {
        console.error("Error during deletion:", error);
        res.status(500).json({ message: "An error occurred during deletion", error: error.message });
    }
});

module.exports = router;
