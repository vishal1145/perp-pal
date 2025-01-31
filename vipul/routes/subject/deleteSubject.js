const express = require('express');
const path = require('path');
const { unlink } = require('fs/promises');
const Subject = require('../../models/subject');

const router = express.Router();

router.delete('/:id', async (req, res) => {
    try {

        const subjectId = req.params.id;

        if (!subjectId) {
            return res.status(400).json({ message: "Subject ID is required" });
        }

        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        if (subject.image) {
            const imagePath = path.join(process.cwd(), "public", subject.image);
            try {
                await unlink(imagePath);
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }


        await Subject.deleteOne({ _id: subjectId });

        return res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        console.error("Error deleting subject:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
