const express = require("express");
const ChapterTopic = require("../../models/chapterTopic");
const Chapter = require("../../models/chapter")
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { chapterId, chapterTopicId } = req.query;


        if (!chapterId && !chapterTopicId) {
            const chapterTopics = await ChapterTopic.find().populate("chapterId", "chapterName");

            if (chapterTopics.length === 0) {
                return res.status(404).json({ message: "No chapter topics found" });
            }
            return res.status(200).json({ chapterTopics });
        }


        if (chapterId) {
            const chapterTopics = await ChapterTopic.find({ chapterId })
                .populate("chapterId", "chapterName");

            if (chapterTopics.length === 0) {
                return res.status(404).json({ message: "No chapter topics found for this chapter" });
            }
            return res.status(200).json({ chapterTopics });
        }

        if (chapterTopicId) {
            const chapterTopic = await ChapterTopic.findById(chapterTopicId).populate("chapterId", "chapterName");

            if (!chapterTopic) {
                return res.status(404).json({ message: "Chapter topic not found" });
            }
            return res.status(200).json({ chapterTopic });
        }


        return res.status(400).json({ message: "Invalid request. Please provide a valid chapterId or chapterTopicId." });

    } catch (error) {
        console.error("Error fetching chapter topics:", error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
