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
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
        CodeTracker
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link mx-3" to="/">Home</Link>
          </li>
          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/signup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/add-coding-profiles">Profiles</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/resources">Resources</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/upcoming-contests">Contests Calendar</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger mx-3" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
