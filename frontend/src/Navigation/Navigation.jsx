import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/Home");
  };

  return (
    <nav 
      className="navbar navbar-expand-lg px-4"
      style={{
        backgroundColor: "#1e1e1e", // Black background
        padding: "15px 50px",
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Centering CodeTracker */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Link 
          className="navbar-brand fw-bold"
          to="/" 
          style={{ fontSize: "2rem", color: "#fff", textDecoration: "none" }}
        > 
          CodeTracker
        </Link>
      </div>

      {/* Navbar Toggler for Mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
      </button>

      {/* Navbar Items */}
      <div 
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
        style={{ flex: 2,marginRight:"-100px" }}
      >
        <ul className="navbar-nav" style={{ gap: "30px" }}>
          <li className="nav-item">
            <Link 
              className="nav-link mx-3"
              to="/"
              style={{ fontSize: "1.4rem", fontWeight: "500", color: "#fff" }}
            >
              Home
            </Link>
          </li>
          {!user ? (
            <>
              <li className="nav-item">
                <Link 
                  className="nav-link mx-3"
                  to="/signup"
                  style={{ fontSize: "1.4rem", fontWeight: "500", color: "#fff" }}
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link mx-3"
                  to="/login"
                  style={{ fontSize: "1.4rem", fontWeight: "500", color: "#fff" }}
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  className="nav-link mx-3"
                  to="/add-coding-profiles"
                  style={{ fontSize: "1.5rem", fontWeight: "500", color: "#fff" }}
                >
                  Profiles
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link mx-3"
                  to="/resources"
                  style={{ fontSize: "1.5rem", fontWeight: "500", color: "#fff" }}
                >
                  Resources
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link mx-3"
                  to="/upcoming-contests"
                  style={{ fontSize: "1.5rem", fontWeight: "500", color: "#fff" }}
                >
                  Contests Calendar
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger mx-2"
                  onClick={handleLogout}
                  style={{ 
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    padding: "12px",
                    backgroundColor: "danger",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    transition: "0.3s ease-in-out", }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
