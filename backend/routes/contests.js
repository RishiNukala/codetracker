const express = require("express");
const router = express.Router();
const axios = require("axios");

const COMPETE_API_URL = "https://competeapi.vercel.app/contests/upcoming/";

router.get("/upcoming-contests", async (req, res) => {
    try {
        const response = await axios.get(COMPETE_API_URL);
        const contests = response.data;
        res.status(200).json(contests);
    } catch (err) {
        console.error("Error fetching upcoming contests:", err);
        res.status(500).json({ message: "Failed to fetch contests" });
    }
});

module.exports = router;
