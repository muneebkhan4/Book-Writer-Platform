// src/pages/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Component-specific styles (if needed)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/"); // Redirect to homepage after login
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="heading text-center">Welcome Back!</h2>
        <p className="subheading text-center">Please log in to continue</p>
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
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
