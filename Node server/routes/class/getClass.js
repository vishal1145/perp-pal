const express = require('express');
const mongoose = require('mongoose');
const Class = require('../../models/class');
const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const { id } = req.query;
        let classes;

        if (id) {
            const cleanedId = id.trim();

            if (!mongoose.Types.ObjectId.isValid(cleanedId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            classes = await Class.findById(cleanedId).populate({
                path: 'boardIds',
                select: 'name',
            });

            if (!classes) {
                return res.status(404).json({ message: 'Class not found' });
            }
        } else {
            classes = await Class.find().populate({
                path: 'boardIds',
                select: 'name',
            });
        }

        return res.status(200).json({
            message: 'Classes fetched successfully',
            classes,
        });

    } catch (error) {
        console.error('Error fetching classes:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});

module.exports = router;
