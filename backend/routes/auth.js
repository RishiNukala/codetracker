const express = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/jwt");
const User = require("../models/User");
const axios = require("axios");
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword,gfg: "", leetcode: "", codechef: "" });

        console.log("Signup successful:", newUser);
        const token = generateToken(newUser._id);

        res.status(201).json({ message: "User created", token });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = generateToken(user._id);
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
