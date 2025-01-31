const express = require("express");
const getDataFromToken = require("../middleware/getDataFRomToken");
const router = express.Router();

router.get("/", getDataFromToken, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User data fetched successfully",
        user: req.user,
    });
});

module.exports = router;
