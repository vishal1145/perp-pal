const express = require('express');
const Subject = require('../../models/subject');


const router = express.Router();


router.get('/', async (req, res) => {
    try {

        const { id: subjectId } = req.query;

        let subject

        if (subjectId) {
            subject = await Subject.findById(subjectId).populate({
                path: 'classIds',
                select: 'className',
            })
                .populate({
                    path: "boardId",
                    select: "name",
                });


            if (!subject) {
                return res.status(404).json({ error: 'Subject not found' });
            }
        } else {
            subject = await Subject.find().populate({
                path: 'classIds',
                select: 'className',
            })
                .populate({
                    path: "boardId",
                    select: "name",
                });
        }
        return res.status(200).json({ subject });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
