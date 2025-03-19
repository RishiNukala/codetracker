import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle login form submission
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/login", formData)
      .then((res) => {
        console.log("Login Response:", res);
        if (res.status === 200) {
          const { token } = res.data;
          localStorage.setItem("token", token);
          setUser({ token });

          axios
            .get("http://localhost:5000/api/coding-profiles", {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
              if (response.data.gfg || response.data.leetcode || response.data.codechef) {
                navigate("/view-coding-profiles");
              } else {
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
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#1e1e1e", color: "#000", marginTop: "-60px" }}
    >
      <div className="d-flex shadow-lg rounded-4 overflow-hidden" style={{ width: "400px", height: "400px", background: "#fff" }}>
        {/* Login Form */}
        <div className="p-5 d-flex flex-column justify-content-center" style={{ width: "100%" }}>
          <h2 className="text-center mb-4 fw-bold">Login</h2>
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
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
