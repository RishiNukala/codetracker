const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        console.error("❌ Error while connecting to DB:", err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
