const express = require('express');
const mongoose = require('mongoose');
const ChapterTopic = require('../../models/chapterTopic');
const Chapter = require('../../models/chapter');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { chapterTopicName, chapterId } = req.body;

        if (!chapterTopicName || !chapterId) {
            return res.status(400).json({ message: "chapterTopicName and chapterId are required." });
        }

        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return res.status(400).json({ message: "Invalid chapterId format." });
        }

        const chapterExists = await Chapter.findById(chapterId);
        if (!chapterExists) {
            return res.status(404).json({ message: "Chapter with the given ID does not exist." });
        }


        const newChapterTopic = await ChapterTopic.create({
            chapterTopicName,
            chapterId,
        });

        return res.status(200).json({
            message: "Chapter topic created successfully.",
            chapter: newChapterTopic,
        });

    } catch (error) {
        console.error("Error creating chapter topic:", error.message);
        return res.status(500).json({ message: "Internal Server Error.", error: error.message });
    }
});

module.exports = router;
