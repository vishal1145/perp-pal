const express = require("express");
const mongoose = require("mongoose");
const Board = require("../../models/Board"); 

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const id = req.query.id; 
        let boards;

        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }
            boards = await Board.findById(id);
            if (!boards) {
                return res.status(404).json({ error: "Board not found" });
            }
        } else {
            boards = await Board.find();
        }

        return res.status(200).json({ boards });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
