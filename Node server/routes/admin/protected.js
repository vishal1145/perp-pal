const express = require("express");
const getDataFromToken = require("../middleware/getDataFRomToken"); // Adjust path if necessary
const router = express.Router();

// Protected route to get user data from token
router.get("/", getDataFromToken, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        user: req.user, // Data extracted from the token
    });
});

module.exports = router;
