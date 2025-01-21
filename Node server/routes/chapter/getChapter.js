const express = require('express');
const Chapter = require('../../models/chapter'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { subjectId, classId, chapterId } = req.query;

        if (chapterId) {
            const chapter = await Chapter.findById(chapterId)
                .populate("classId", "className") 
                .populate("subjectId", "subjectName");

            if (!chapter) {
                return res.status(404).json({ message: "Chapter not found" });
            }

            return res.status(200).json({ chapter });
        }

        if (!subjectId && !classId) {
            const chapters = await Chapter.find()
                .populate("classId", "className")
                .populate("subjectId", "subjectName");

            if (chapters.length === 0) {
                return res.status(404).json({ message: "No chapters found" });
            }

            return res.status(200).json({ chapters });
        }

       
        if (subjectId && classId) {
            const chapters = await Chapter.find({ subjectId, classId })
                .populate("classId", "className") 
                .populate("subjectId", "subjectName");

            if (chapters.length === 0) {
                return res.status(404).json({ message: "No chapters found for this subject and class" });
            }

            return res.status(200).json({ chapters });
        }

        return res.status(400).json({ error: "Both subjectId and classId are required" });

    } catch (error) {
        console.error("Error fetching chapters:", error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
