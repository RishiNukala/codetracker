import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    axios
      .post("https://codetracker-2-kimn.onrender.com/api/auth/signup", formData)
      .then((res) => {
        console.log("Signup Response:", res);
        if (res.status === 201) {
          setUser({ token: res.data.token });
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log("Signup Error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Signup failed. Please try again.");
      });
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#1e1e1e", color: "#000"}}
    >
      <div className="p-5 shadow-lg rounded-4" style={{ width: "400px", background: "#fff",marginTop:"-150px" }}>
        <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
