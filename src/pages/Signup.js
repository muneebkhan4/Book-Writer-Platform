// src/pages/Signup.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"; // Import component-specific CSS

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Author"); // Default to Author
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, role);
    navigate("/"); // Redirect to homepage after signup
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="heading text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder="Enter your email"
            />
          </div>
          <div className="inputGroup">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
              placeholder="Create a password"
            />
          </div>
          <div className="inputGroup">
            <label className="label">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input"
            >
              <option value="Author">Author</option>
              <option value="Collaborator">Collaborator</option>
            </select>
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
