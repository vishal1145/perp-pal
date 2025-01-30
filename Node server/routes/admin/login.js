const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin')
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    let username = 'muskan'
    const { email, password } = req.body;

    try {

        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Admin already exists!' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
