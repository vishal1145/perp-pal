const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        });

        return res.status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ error: "Logout failed" });
    }
});

module.exports = router;
