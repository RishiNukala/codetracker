const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// DSA Resources
const dsaResources = [
  { name: "Striver DSA Sheet", link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
  { name: "Love Babbar 450 Sheet", link: "https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/" },
  { name: "Top Interview 150", link: "https://leetcode.com/studyplan/top-interview-150/" },
  { name: "Neetcode 150", link: "https://neetcode.io/practice?tab=neetcode150" },
  { name: "Blind 75", link: "https://neetcode.io/practice?tab=blind75" },
  { name: "DP Mastery Sheet", link: "https://codolio.com/question-tracker/sheet/dp-mastery-sheet?category=popular" }
];

// Full Stack Development Resources
const fullStackResources = [
  { name: "Web Dev Simplified", link: "https://www.youtube.com/c/WebDevSimplified" },
  { name: "FreeCodeCamp", link: "https://www.youtube.com/c/Freecodecamp" },
  { name: "Sheriyans Coding School", link: "https://www.youtube.com/@sheryians" }
];

// Core Subjects Resources
const coreSubjectsResources = [
  { name: "Operating Systems (Love Babbar)", link: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTr3nwuTegHLa2qlI81QweYG" },
  { name: "DBMS (Love Babbar)", link: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU" },
  { name: "OOPS (Apna College)", link: "https://youtu.be/bSrm9RXwBaI?si=qC-3H_OLjn7zPR_p" },
  { name: "Computer Networks (Kunal Kushwaha)", link: "https://youtu.be/IPvYjXCsTg8?si=x4AZ79Nzd_ZlKc6e" }
];

// API Routes to serve resources based on the type
router.get("/resources/:type",(req, res) => {
  const { type } = req.params;

  // Check the type and return corresponding resources
  switch (type) {
    case "dsa":
      return res.json(dsaResources);
    case "fullstack":
      return res.json(fullStackResources);
    case "core-subjects":
      return res.json(coreSubjectsResources);
    default:
      return res.status(400).json({ error: "Invalid resource type" });
  }
});

// Export Router
module.exports = router;
