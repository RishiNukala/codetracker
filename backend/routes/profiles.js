const express = require("express");
const User = require("../models/User");
const axios = require("axios");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

// Route: /add-coding-profiles
router.post("/add-coding-profiles", authMiddleware, async (req, res) => {
    try {
      const { gfg, leetcode, codechef } = req.body;
  
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const urls = {
        gfg: `https://geeks-for-geeks-api.vercel.app/${gfg}`,
        leetcode: `https://leetcode-stats-api.herokuapp.com/${leetcode}`,
        codechef: `https://codechef-api.vercel.app/handle/${codechef}`,
      };
  
      // Validate profiles (you can move this validation logic into a separate function if needed)
      const validationResults = await validateProfiles(urls);
      if (validationResults.some(result => !result.isValid)) {
        return res.status(400).json({ message: validationResults.find(result => !result.isValid).message });
      }
  
      // Save profiles
      user.gfg = gfg || user.gfg;
      user.leetcode = leetcode || user.leetcode;
      user.codechef = codechef || user.codechef;
  
      await user.save();
      res.status(200).json({ message: "Coding profiles added successfully" });
    } catch (err) {
      console.error("Error adding coding profiles:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Validation function
  const validateProfiles = async (urls) => {
    const results = await Promise.all(
      Object.keys(urls).map(async (platform) => {
        try {
          const response = await axios.get(urls[platform]);
          return { platform, isValid: response.status === 200 };
        } catch {
          return { platform, isValid: false, message: `Invalid ${platform} username` };
        }
      })
    );
    return results;
  };
  router.get("/coding-profiles", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("gfg leetcode codechef");
      if (!user) return res.status(400).json({ message: "User not found" });
  
      res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching coding profiles:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
module.exports = router;
