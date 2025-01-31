const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Admin not found!' });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        // If login is successful
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
