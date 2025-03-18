import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Resources() {
  const resources = {
    Popular: [
      { name: "Striver A2Z DSA Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { name: "Babbar OS YT Series", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTr3nwuTegHLa2qlI81QweYG" },
      { name: "Babbar DBMS YT Series", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU" },
      { name: "FreeCodeCamp YT Channel", url: "https://www.youtube.com/@freecodecamp" },
      { name: "Telusko YT Channel", url: "https://www.youtube.com/@Telusko" },
    ],
    DSA: [
      { name: "Striver A2Z DSA Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { name: "Aditya Verma DP Series", url: "https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go" },
      { name: "Leetcode Top Interview 150", url: "https://leetcode.com/studyplan/top-interview-150/" },
    ],
    "Full Stack": [
      { name: "Telusko YT Channel", url: "https://www.youtube.com/@Telusko" },
      { name: "Web Simplified Channel", url: "https://www.youtube.com/@WebDevSimplified" },
      { name: "FreeCodeCamp Channel", url: "https://www.youtube.com/@freecodecamp" },
    ],
    Core: [
        { name: "Babbar OS YT Series", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTr3nwuTegHLa2qlI81QweYG" },
        { name: "Babbar DBMS YT Series", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU" },
        { name: "Kunal Kushwaha CN", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8&t=3121s" },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Popular");

  return (
    <motion.div
      className="container-fluid d-flex flex-column align-items-center justify-content-start"
      style={{ backgroundColor: "#1e1e1e", color: "#fff", padding: "20px", minHeight: "100vh" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Category Buttons */}
      <div className="d-flex flex-wrap justify-content-center mb-4">
        {Object.keys(resources).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`btn mx-2 ${selectedCategory === category ? "btn-primary" : "btn-outline-light"}`}
            style={{
              minWidth: "120px",
              borderRadius: "20px",
              padding: "10px 15px",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display Selected Category Resources with Dynamic Height */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="shadow-lg rounded-4 p-3"
        style={{
          background: "#fff",
          color: "#000",
          width: "50%",
          minWidth: "300px",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h4 className="fw-bold mb-3">{selectedCategory}</h4>
        <ul className="list-unstyled">
          {resources[selectedCategory].map((resource, i) => (
            <li key={i} className="mb-2">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark btn-sm"
                style={{
                  width: "100%",
                  color: "#000",
                  borderRadius: "20px",
                  padding: "12px 15px",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#000";
                  e.target.style.color = "#fff";
                  e.target.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#000";
                  e.target.style.boxShadow = "none";
                }}
              >
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
