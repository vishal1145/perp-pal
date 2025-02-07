const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    const token = req.cookies.token; // Get token from HttpOnly cookie

    if (!token) {
        return res.status(401).json({ success: false, message: "No token found" });
    }

    res.json({ success: true, token });
});
module.exports = router;