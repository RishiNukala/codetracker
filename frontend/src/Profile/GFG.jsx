import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext"; // Assuming this context provides the necessary data
import axios from "axios";

export default function GFG() {
  const { gfg } = useContext(AuthContext); // Access 'gfg' username from AuthContext
  const [gfgData, setGfgData] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gfg) {
      setMessage("GFG username is missing. Please add a GFG username.");
      setLoading(false);
      return;
    }

    const fetchGfgProfile = async () => {
      setLoading(true);
      try {
        // Fetch the entire data from the API
        const response = await axios.get("http://localhost:5000/api/profile/coding-profiles");
        
        // Log the full response to inspect the structure
        console.log(response.data); // This will print the full data to the console
        
        if (response.data && response.data.success) {
          setGfgData(response.data.data); // Set the GFG profile data if successful
        } else {
          setMessage("No profile data found for this username.");
        }
      } catch (error) {
        setMessage("Error fetching GFG profile. Please try again.");
      }
      setLoading(false);
    };

    fetchGfgProfile();
  }, [gfg]);

  return (
    <div className="container mt-4">
      <h2>GeeksforGeeks Profile</h2>

      {message && <p className="text-center text-danger">{message}</p>}

      {loading ? (
        <p>Loading profile...</p>
      ) : (
        gfgData && (
          <div>
            {/* Print all the fetched data here */}
            <pre>{JSON.stringify(gfgData, null, 2)}</pre>
          </div>
        )
      )}
    </div>
  );
}
