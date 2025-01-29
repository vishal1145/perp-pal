const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin'); // Assuming your model is already connected
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin in the database
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Admin not found!' });
        }

        // Check if the password is valid
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials!' });
        }

        // Generate a JWT token
        const tokenData = {
            id: user._id,
            email: user.email
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });


        // Set the token in a cookie
        res.cookie('token', token);


        // Respond with success and user data
        return res.status(200).json({
            message: 'Login successful',
            success: true,
            data: user,
            token: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
