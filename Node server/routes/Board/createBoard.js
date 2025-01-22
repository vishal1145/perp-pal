const express = require("express");
const multer = require("multer");
const path = require("path");
const Board = require("../../models/Board");

const router = express.Router();


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.join(__dirname, "../../public/uploads");
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, `board_image_${Date.now()}_${file.originalname}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});


router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { name, color } = req.body;
        const file = req.file;


        if (!name || !color || !file) {
            return res.status(400).json({
                message: "Board name, image, and color are required",
            });
        }


        const imageUrl = `/uploads/${file.filename}`;
        const newBoard = new Board({
            name,
            color,
            image: imageUrl,
        });

        await newBoard.save();

        res.status(201).json({
            message: "Board created successfully",
            board: newBoard,
        });
    } catch (error) {
        console.error("Error creating board:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;
