const express = require('express');
const mongoose = require('mongoose');
const Class = require('../../models/class');


const router = express.Router();

router.delete('/:id', async (req, res) => {
    try {
        const { id: classId } = req.params;
        if (!classId || !mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ message: 'Invalid class ID' });
        }


        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        return res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        console.error('Error deleting class:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
