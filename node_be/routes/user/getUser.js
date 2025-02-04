const express = require('express');
const User = require('../../models/getUSer');  // Import the User model

const router = express.Router();

// API route to get all users
router.get('/', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Return the users in the response
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

module.exports = router;
