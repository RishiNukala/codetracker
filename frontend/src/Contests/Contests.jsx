import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";

export default function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contests/upcoming-contests");
        setContests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  return (
    <motion.div
      className="container mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-center mb-4">Upcoming Contests</h2>
      {loading ? (
        <p className="text-center">Loading contests...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
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

                let hours, minutes;
                
                if (contest.site.toLowerCase() === "leetcode") {
                  hours = 1;
                  minutes = 30;
                } else {
                  const durationInSeconds = contest.duration;
                  hours = Math.floor(durationInSeconds / 3600000);
                  minutes = Math.floor((durationInSeconds % 3600000) / 60000);
                }

                return (
                  <tr key={index}>
                    <td>{contest.title}</td>
                    <td>{contest.site}</td>
                    <td>{moment(contest.startTime).format("MMMM Do YYYY, h:mm A")}</td>
                    <td>{hours} hrs {minutes} mins</td>
                    <td>
                      <a href={contest.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
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
    </motion.div>
  );
}
