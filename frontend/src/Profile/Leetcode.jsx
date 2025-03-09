import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LeetCode() {
  const { leetcode } = useContext(AuthContext);  // Access the LeetCode username from context
  const [leetcodeData, setLeetCodeData] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeetCodeProfile = async () => {
      if (!leetcode) {
        setMessage("LeetCode username is missing.");
        return;
      }

      try {
        // Using the dynamic LeetCode username
        const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${leetcode}`);
        setLeetCodeData(response.data); // Set the LeetCode profile data
      } catch (error) {
        setMessage("Error fetching LeetCode profile.");
      }
    };

    fetchLeetCodeProfile();
  }, [leetcode]);  // Re-fetch the profile when the LeetCode username changes

  return (
    <div className="container mt-4">
      <h2>LeetCode Profile</h2>

      {message && <p className="text-center text-danger">{message}</p>}

      {leetcodeData ? (
        <div>
          <div className="text-center mb-4">
            <h3>LeetCode Stats for {leetcode || "Unknown User"}</h3>
            <p>Ranking: {leetcodeData.ranking}</p>
            <p>Acceptance Rate: {leetcodeData.acceptanceRate}%</p>
            <p>Contribution Points: {leetcodeData.contributionPoints}</p>
            <p>Reputation: {leetcodeData.reputation}</p>
          </div>

          <h4>Problems Solved</h4>
          <ul>
            <li>
              Easy: {leetcodeData.easySolved} / {leetcodeData.totalEasy}
            </li>
            <li>
              Medium: {leetcodeData.mediumSolved} / {leetcodeData.totalMedium}
            </li>
            <li>
              Hard: {leetcodeData.hardSolved} / {leetcodeData.totalHard}
            </li>
          </ul>

          <h4>Total Problems Solved: {leetcodeData.totalSolved}</h4>
          <h4>Total Questions on LeetCode: {leetcodeData.totalQuestions}</h4>

          <h4>Submission Calendar</h4>
          <ul>
            {Object.entries(leetcodeData.submissionCalendar).map(([timestamp, count]) => {
              return (
                <li key={timestamp}>
                  Date: {new Date(parseInt(timestamp) * 1000).toLocaleDateString()} - Submissions: {count}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
