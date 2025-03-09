const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.post("/update-streak", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(400).json({ message: "User not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (user.lastSolved) {
            const lastSolvedDate = new Date(user.lastSolved);
            lastSolvedDate.setHours(0, 0, 0, 0);

            const difference = (today - lastSolvedDate) / (1000 * 60 * 60 * 24);

            if (difference === 1) {
                user.streak += 1; 
            } else if (difference > 1) {
                user.streak = 0; 
            }
        } else {
            user.streak = 1; 
        }

        user.lastSolved = today;
        await user.save();

        res.status(200).json({ message: "Streak updated", streak: user.streak });
    } catch (err) {
        console.error("Error updating streak:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/streak", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("streak lastSolved");
        if (!user) return res.status(400).json({ message: "User not found" });

        res.status(200).json({ streak: user.streak, lastSolved: user.lastSolved });
    } catch (err) {
        console.error("Error fetching streak:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
