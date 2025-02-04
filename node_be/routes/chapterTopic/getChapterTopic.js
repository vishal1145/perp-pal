const express = require("express");
const ChapterTopic = require("../../models/chapterTopic");
const Chapter = require("../../models/chapter");
const Subject = require("../../models/subject");
const Class = require("../../models/class");
const Board = require("../../models/Board");

const router = express.Router();

// Endpoint to fetch chapter topics or check for duplicates
router.get("/", async (req, res) => {
    try {
        const { chapterId, chapterTopicId, boardId, classId, subjectId, chapterTopicName } = req.query;

        const lowerCaseChapterTopicName = chapterTopicName ? chapterTopicName.trim().toLowerCase() : '';

        if (lowerCaseChapterTopicName && boardId && classId && subjectId && chapterId) {
            const duplicateCheck = await ChapterTopic.findOne({
                chapterTopicName: { $regex: new RegExp(`^${lowerCaseChapterTopicName}$`, 'i') },
                boardId: boardId,
                classId: classId,
                subjectId: subjectId,
                chapterId: chapterId
            });

            if (duplicateCheck) {
                return res.status(400).json({ message: "A topic with this name already exists for the selected board, class, subject, and chapter." });
            }
        }

        // If no filters are provided, return all chapter topics
        if (!chapterId && !chapterTopicId && !boardId && !classId && !subjectId) {
            const chapterTopics = await ChapterTopic.find()
                .populate("chapterId", "chapterName")
                .populate("subjectId", "subjectName")
                .populate("classId", "className")
                .populate("boardId", "name");

            if (chapterTopics.length === 0) {
                return res.status(404).json({ message: "No chapter topics found" });
            }
            return res.status(200).json({ chapterTopics });
        }

        // If chapterId is provided, filter by chapterId
        if (chapterId) {
            const chapterTopics = await ChapterTopic.find({ chapterId })
                .populate("chapterId", "chapterName")
                .populate("subjectId", "subjectName")
                .populate("classId", "className")
                .populate("boardId", "name");

            if (chapterTopics.length === 0) {
                return res.status(404).json({ message: "No chapter topics found for this chapter" });
            }
            return res.status(200).json({ chapterTopics });
        }

        // If chapterTopicId is provided, filter by chapterTopicId
        if (chapterTopicId) {
            const chapterTopic = await ChapterTopic.findById(chapterTopicId)
                .populate("chapterId", "chapterName")
                .populate("subjectId", "subjectName")
                .populate("classId", "className")
                .populate("boardId", "name");

            if (!chapterTopic) {
                return res.status(404).json({ message: "Chapter topic not found" });
            }
            return res.status(200).json({ chapterTopic });
        }

        // Apply filters based on boardId, classId, subjectId, and chapterId
        const filters = {};
        if (boardId) filters.boardId = boardId;
        if (classId) filters.classId = classId;
        if (subjectId) filters.subjectId = subjectId;
        if (chapterId) filters.chapterId = chapterId;

        const chapterTopics = await ChapterTopic.find(filters)
            .populate("chapterId", "chapterName")
            .populate("subjectId", "subjectName")
            .populate("classId", "className")
            .populate("boardId", "name");

        if (chapterTopics.length === 0) {
            return res.status(404).json({ message: "No chapter topics found for the given filters" });
        }

        return res.status(200).json({ chapterTopics });

    } catch (error) {
        console.error("Error fetching chapter topics:", error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
