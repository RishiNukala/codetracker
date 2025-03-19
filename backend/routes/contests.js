const express = require("express");
const router = express.Router();
const axios = require("axios");

const COMPETE_API_URL = "https://competeapi.vercel.app/contests/upcoming/";

router.get("/upcoming-contests", async (req, res) => {
    try {
        const { data } = await axios.get(COMPETE_API_URL);
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No contests found" });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching upcoming contests:", err.message);
        res.status(500).json({ message: "Failed to fetch contests" });
    }
});

module.exports = router;
