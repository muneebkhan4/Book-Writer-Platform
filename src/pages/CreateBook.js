import React, { useState, useContext } from "react";
import BookStructure from "./BookStructure";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext

const CreateBook = ({ initialBookData = null }) => {
  const { user } = useContext(AuthContext); // Get the logged-in user from AuthContext
  const isAuthor =
    user && initialBookData ? user.id === initialBookData.authorId : true; // Check if the user is the author
  const [bookTitle, setBookTitle] = useState(
    initialBookData?.title || "New Book"
  );

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value); // Update title as user types
  };

  const handleSave = (sections) => {
    if (!user) {
      alert("You must be logged in to create a book.");
      return;
    }

    const newBook = {
      title: bookTitle, // Use the custom title
      sections,
      authorId: user.id, // Set the authorId from the logged-in user
      collaboratorIds: [], // Empty array initially for collaborators
    };

    fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Book created successfully!");
      })
      .catch((error) => {
        console.error("Error creating book:", error);
      });
  };

  return (
    <div>
      <h1>Create a New Book</h1>
      {/* Display input field if the user is the author, otherwise display the title as text */}
      {isAuthor ? (
        <input
          type="text"
          value={bookTitle}
          onChange={handleTitleChange}
          placeholder="Enter Book Title"
        />
      ) : (
        <h2>{bookTitle}</h2>
      )}
      <BookStructure
        onSave={handleSave}
        isAuthor={isAuthor}
        initialBookData={initialBookData}
      />
    </div>
  );
};

export default CreateBook;
