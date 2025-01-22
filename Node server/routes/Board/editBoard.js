const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs').promises;  
const Board = require('../../models/Board');
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirPath = path.join(__dirname, '../../public/uploads');
        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        const imageFileName = `board_image_${Date.now()}_${file.originalname}`;
        cb(null, imageFileName);
    }
});

const upload = multer({ storage });

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, color } = req.body; 

        if (!name || !color) {
            return res.status(400).json({ message: "Board name and color are required" });
        }

    
        const board = await Board.findById(id);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        if (req.file) {
            const oldImagePath = path.join(__dirname, '../../public', board.image);

            try {
               
                await fs.access(oldImagePath); 
                await fs.unlink(oldImagePath); 
                console.log('Old image deleted successfully');
            } catch (error) {
                console.error("Error deleting old image:", error);
            }

            board.image = `/uploads/${req.file.filename}`;
        }

        board.name = name;
        board.color = color;

        await board.save();

        return res.status(200).json({ message: "Board updated successfully", board });
    } catch (error) {
        console.error("Error updating board:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
