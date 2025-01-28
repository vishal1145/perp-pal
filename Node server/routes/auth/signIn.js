const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin')
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Admin not found!' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({ message: 'Login successful!', token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
