import React, { useState } from "react";
import axios from "axios";

export default function CodingProfiles() {
  const [usernames, setUsernames] = useState({
    leetcode: "rishi_nukala", // Placeholder username for Leetcode
  });
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [message, setMessage] = useState("");

  const handleLeetcodeButtonClick = async () => {
    setLoading(true);
    setMessage(""); // Reset message on button click
    try {
      const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${usernames.leetcode}`);
      if (response.data && response.data.status === "success") {
        setProfileData(response.data);
        console.log(response.data); // Optional logging for debugging
      } else {
        setMessage("No profile data found for this username.");
      }
    } catch (error) {
      // Handle various types of errors gracefully
      if (error.response) {
        // The request was made, but the server responded with a status other than 2xx
        setMessage(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        // The request was made but no response was received
        setMessage("No response received from the server.");
      } else {
        // Something happened in setting up the request
        setMessage(`Request failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Select Coding Profiles</h2>
      <div>
        <button onClick={handleLeetcodeButtonClick} className="btn btn-primary mx-2">
          Leetcode
        </button>
      </div>

      {loading && <p>Loading profile...</p>}

      {message && <p className="text-center text-danger">{message}</p>}

      {profileData && (
        <div className="mt-4">
          <h3>Leetcode Profile</h3>
          <div>
            <p><strong>Total Solved Problems:</strong> {profileData.totalSolved}</p>
            <p><strong>Total Questions:</strong> {profileData.totalQuestions}</p>
            <p><strong>Easy Solved:</strong> {profileData.easySolved}</p>
            <p><strong>Medium Solved:</strong> {profileData.mediumSolved}</p>
            <p><strong>Hard Solved:</strong> {profileData.hardSolved}</p>
            <p><strong>Acceptance Rate:</strong> {profileData.acceptanceRate}%</p>
            <p><strong>Ranking:</strong> {profileData.ranking}</p>
            <p><strong>Reputation:</strong> {profileData.reputation}</p>
            <p><strong>Contribution Points:</strong> {profileData.contributionPoints}</p>

            <h4>Submission Calendar:</h4>
            <ul>
              {Object.keys(profileData.submissionCalendar).map((timestamp, index) => {
                const date = new Date(parseInt(timestamp) * 1000);
                const formattedDate = date.toLocaleDateString();
                return (
                  <li key={index}>
                    Date: {formattedDate} - Submissions: {profileData.submissionCalendar[timestamp]}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
