import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";

export default function Contests() {
  const [contests, setContests] = useState(
    JSON.parse(sessionStorage.getItem("contests")) || []
  );
  const [loading, setLoading] = useState(contests.length === 0);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("https://competeapi.vercel.app/contests/upcoming/");
        setContests(response.data);
        sessionStorage.setItem("contests", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests(); // Fetch only once on mount
  }, []); // Empty dependency array ensures it runs only once

  return (
    <motion.div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#1e1e1e", color: "#000", padding: "25px" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div
        className="shadow-lg rounded-4 p-4"
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "990px",
          minHeight: "400px",
          marginTop: "-30px"
        }}
      >
        <h2 className="text-center mb-3 fw-bold">Upcoming Contests</h2>
        {loading ? (
          <p className="text-center">Loading contests...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Contest Name</th>
                  <th>Platform</th>
                  <th>Start Time</th>
                  <th>Duration</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest, index) => {
                  const durationInSeconds = contest.duration;
                  const hours = Math.floor(durationInSeconds / 3600);
                  const minutes = Math.floor((durationInSeconds % 3600) / 60);

                  return (
                    <tr key={index}>
                      <td>{contest.title}</td>
                      <td>{contest.site}</td>
                      <td>{moment(contest.startTime).format("MMMM Do YYYY, h:mm A")}</td>
                      <td>{hours} hrs {minutes} mins</td>
                      <td>
                        <a
                          href={contest.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          Join
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
