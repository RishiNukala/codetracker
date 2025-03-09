import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Handle form data change
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle login form submission
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", formData) // Backend login API endpoint
      .then((res) => {
        console.log("Login Response:", res);
        if (res.status === 200) {
          const { token } = res.data;

          // Save the token to localStorage
          localStorage.setItem('token', token);
          setUser({ token });
          axios.get("http://localhost:5000/api/coding-profiles", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then((response) => {
            if (response.data.gfg || response.data.leetcode || response.data.codechef) {
              // If profiles exist, redirect to the profile view page or dashboard
              navigate("/view-coding-profiles");  // Or you can navigate to the dashboard
            } else {
              // If profiles don't exist, redirect to the profile add page
              navigate("/add-coding-profiles");
            }
          })
          .catch((err) => {
            console.error("Error checking coding profiles:", err);
            navigate("/add-coding-profiles");
          });
        }
      })
      .catch((err) => {
        console.error("Login Error:", err);
        alert(err.response?.data?.message || "Login failed. Please try again.");
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
