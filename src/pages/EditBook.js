// src/pages/EditBook.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookStructure from "./BookStructure";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/EditBook.css";

const EditBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const isAuthor = user.role === "Author";
  const [book, setBook] = useState(null);
  const [newBookTitle, setNewBookTitle] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:8000/books/${id}`);
      const data = await response.json();
      setBook(data);
      setNewBookTitle(data.title); // Initialize the book title
    };
    fetchBook();
  }, [id]);

  const handleSave = (sections) => {
    const updatedBook = { ...book, title: newBookTitle, sections }; // Include the updated title
    fetch(`http://localhost:8000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Book updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="editbook-container">
      {/* Edit Book Title */}
      {isAuthor ? (
        <>
          <h1>Edit Book Name</h1>

          <input
            className="input-title"
            type="text"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)} // Update the book title
            style={{ marginBottom: "20px" }}
          />
        </>
      ) : (
        <>
          <p style={{ fontSize: "20px" }}>Book Name: {newBookTitle}</p>
        </>
      )}

      {/* Pass book data to BookStructure */}
      <BookStructure initialBookData={book} onSave={handleSave} />
    </div>
  );
};

export default EditBook;
