import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function CodingProfiles() {
  const [usernames, setUsernames] = useState({
    leetcode: "rishi_nukala", // Replace with actual username
  });
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [message, setMessage] = useState("");

  const handleLeetcodeButtonClick = async () => {
    setLoading(true);
    setMessage("");
    setProfileData(null);
    try {
      const response = await axios.get(
        `https://leetcode-api-faisalshohag.vercel.app/${usernames.leetcode}`
      );
      if (response.data) {
        setProfileData(response.data);
      } else {
        setMessage("No profile data found for this username.");
      }
    } catch (error) {
      setMessage("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#1e1e1e", color: "white", padding: "25px" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div
        className="shadow-lg rounded-4 p-4 d-flex flex-column align-items-center"
        style={{
          background: "#fff",
          color: "#000",
          width: "100%",
          maxWidth: "900px",
          minHeight: "500px",
          marginTop: "-100px",
          textAlign: "justify"
        }}
      >
        <h2 className="text-center mb-3 fw-bold" style={{ marginTop: "4px" }}>
          Select Coding Profiles
        </h2>
        <div className="text-center mb-3" style={{ marginTop: "10px" }}>
          <button
            className="btn"
            style={{ backgroundColor: "orange", color: "white", fontWeight: "bold" }}
            onClick={handleLeetcodeButtonClick}
          >
            Leetcode
          </button>
          <button className="btn btn-success mx-2" style={{ fontWeight: "bold" }}>
            GeeksforGeeks
          </button>
          <button className="btn" style={{ backgroundColor: "#6E260E", color: "white", fontWeight: "bold" }}>
            CodeChef
          </button>
        </div>

        {loading && <p className="text-center">Loading profile...</p>}
        {message && <p className="text-center text-danger">{message}</p>}

        {profileData && (
          <div className="mt-4 text-justify" style={{ width: "100%" }}>
            <div style={{ width: "100%", marginLeft: "260px", marginTop: "-10px" }}>
              <p><strong>Total Solved Problems:</strong> {profileData.totalSolved}</p>
              <p><strong>Easy Solved:</strong> {profileData.easySolved}</p>
              <p><strong>Medium Solved:</strong> {profileData.mediumSolved}</p>
              <p><strong>Hard Solved:</strong> {profileData.hardSolved}</p>
              <p><strong>Ranking:</strong> {profileData.ranking}</p>
              <p><strong>Reputation:</strong> {profileData.reputation}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
