const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB:", mongoose.connection.name);
    } catch (err) {
        console.log("Error while connecting to DB", err);
    }
};

module.exports = connectDB;
