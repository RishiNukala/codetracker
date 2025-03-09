import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CodeChef() {
  const { codechef } = useContext(AuthContext);  // Access the CodeChef username from context
  const [codechefData, setCodechefData] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodeChefProfile = async () => {
      if (!codechef) {
        setMessage("CodeChef username is missing.");
        return;
      }

      try {
        // Using the dynamic CodeChef username
        const response = await axios.get(`https://competitive-coding-api.herokuapp.com/codechef/${codechef}`);
        setCodechefData(response.data); // Set the CodeChef profile data
      } catch (error) {
        setMessage("Error fetching CodeChef profile.");
      }
    };

    fetchCodeChefProfile();
  }, [codechef]);  // Re-fetch the profile when the CodeChef username changes

  return (
    <div className="container mt-4">
      <h2>CodeChef Profile</h2>

      {message && <p className="text-center text-danger">{message}</p>}

      {codechefData ? (
        <div>
          <div className="text-center mb-4">
            <h3>CodeChef Stats for {codechef || "Unknown User"}</h3>
            <p>Rating: {codechefData.rating}</p>
            <p>Rank: {codechefData.rank}</p>
            <p>Country Rank: {codechefData.countryRank}</p>
            <p>Global Rank: {codechefData.globalRank}</p>
            <p>Total Problems Solved: {codechefData.solved}</p>
          </div>

          <h4>Recent Contests</h4>
          <ul>
            {codechefData.recentContest ? (
              codechefData.recentContest.map((contest, index) => (
                <li key={index}>
                  <a href={contest.contestUrl} target="_blank" rel="noopener noreferrer">
                    {contest.contestName} - Rank: {contest.rank}
                  </a>
                </li>
              ))
            ) : (
              <li>No recent contests available</li>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
