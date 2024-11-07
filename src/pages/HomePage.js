// src/pages/HomePage.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css"; // Import the CSS file for styling

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [accessibleBooks, setAccessibleBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      if (user) {
        const response = await fetch("http://localhost:8000/books");
        const books = await response.json();

        // Filter books based on role
        if (user.role === "Author") {
          setAccessibleBooks(books.filter((book) => book.authorId === user.id));
        } else if (user.role === "Collaborator") {
          setAccessibleBooks(
            books.filter((book) => book.collaboratorIds.includes(user.id))
          );
        }
      }
    };
    fetchBooks();
  }, [user]);

  if (!user) {
    return (
      <div className="welcome-container">
        <h1>Welcome to Cloud Book Writer Platform</h1>
        <p>
          Please <a href="/login">login</a> or <a href="/signup">sign up</a> to
          start creating and collaborating on books.
        </p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome!</h1>
        <p>Your role: {user.role}</p>
      </div>

      {user.role === "Author" && (
        <div className="author-actions">
          <h2>Author Actions</h2>
          <button className="btn" onClick={() => navigate("/create-book")}>
            Create a New Book
          </button>
          <button
            className="btn"
            onClick={() => navigate("/manage-collaborators")}
          >
            Manage Collaborators
          </button>
        </div>
      )}

      <div className="books-section">
        <h2>Your Accessible Books</h2>
        <ul className="books-list">
          {accessibleBooks.map((book) => (
            <li key={book.id} className="book-item">
              <span>{book.title}</span>
              <button
                className="btn edit-btn"
                onClick={() => navigate(`/edit-book/${book.id}`)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
