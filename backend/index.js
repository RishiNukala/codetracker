const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT 
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth")
const profileRoutes = require("./routes/profiles")
const streakRoutes = require("./routes/streak");
const contestRoutes = require("./routes/contests");
const resourcesRoutes = require("./routes/resources")
const authMiddleware = require("./middleware/authMiddleware")

app.use(cors())
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
connectDB()
app.use("/api/auth", authRoutes)
app.use("/api/profile",profileRoutes)
app.use("/api/streak", streakRoutes)
app.use("/api/contests", contestRoutes)
app.use("/api/resources/:type",resourcesRoutes)
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({ message: "This is a protected route!", user: req.user });
});

// Example Express API to fetch usernames from the database
const usernames = {
    gfg: "rishi_nukala",
    leetcode: "rishi_nukala",
    codechef: "rishi_nukala",
  };
  
  // Endpoint to fetch usernames
  app.get("/api/getUsernames", (req, res) => {
    res.json(usernames); // Return the usernames object as a JSON response
  });
  
app.listen(port,()=>console.log("Server is running on port:",port)) 