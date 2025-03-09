import React, { useState, useEffect } from "react";
import axios from "axios";
import GFG from "../Profile/gfg";
import LeetCode from "../Profile/leetcode"; // Assuming you have a LeetCode Profile component
import CodeChef from "../Profile/CodeChefProfile"; // Assuming you have a CodeChef Profile component

export default function CodingProfiles() {
  const [usernames, setUsernames] = useState({
    gfg: "rishi_nukala", // Placeholder usernames, these will be updated after API call
    leetcode: "rishi_nukala",
    codechef: "rishi_nukala",
  });
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getUsernames"); // Your backend API endpoint
        setUsernames(response.data); // Assuming the response contains { gfg, leetcode, codechef }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching usernames:", error);
        setLoading(false);
      }
    };

    fetchUsernames();
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  if (loading) {
    return <p>Loading profiles...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Select Coding Profiles</h2>

      <div>
        <button
          onClick={() => handleProfileSelect("GFG")}
          className="btn btn-primary mx-2"
        >
          GeeksforGeeks
        </button>
        <button
          onClick={() => handleProfileSelect("LeetCode")}
          className="btn btn-secondary mx-2"
        >
          LeetCode
        </button>
        <button
          onClick={() => handleProfileSelect("CodeChef")}
          className="btn btn-success mx-2"
        >
          CodeChef
        </button>
      </div>

      <div className="mt-4">
        {selectedProfile === "GFG" && <GFG username={usernames.gfg} />}
        {selectedProfile === "LeetCode" && <LeetCode username={usernames.leetcode} />}
        {selectedProfile === "CodeChef" && <CodeChef username={usernames.codechef} />}
      </div>
    </div>
  );
}
