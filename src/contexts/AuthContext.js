import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setUser(savedUser);
      }
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.accessToken) {
      const loggedInUser = { ...data.user, token: data.accessToken };
      setUser(loggedInUser);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      console.error("Login failed", data);
    }
  };

  const signup = async (email, password, role) => {
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();
    if (data.accessToken) {
      const registeredUser = { ...data.user, token: data.accessToken };
      setUser(registeredUser);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(registeredUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
