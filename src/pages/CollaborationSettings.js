import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/CollaborationSettings.css"; // Ensure you import your CSS file

function CollaborationSettings() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const suggestionsRef = useRef();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/books?authorId=${user.id}`
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, [user.id]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/users?role=Collaborator`
        );
        const data = await response.json();
        setCollaborators(data);
      } catch (error) {
        console.error("Failed to fetch collaborators:", error);
      }
    };

    fetchCollaborators();
  }, []);

  const handleBookSelect = (bookId) => {
    const selectedBookObj = books.find((b) => b.id === Number(bookId));
    setSelectedBook(selectedBookObj);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setNewCollaboratorEmail(email);

    if (email.length >= 3) {
      const suggestions = collaborators
        .filter(
          (collab) =>
            collab.email.includes(email) &&
            !selectedBook.collaboratorIds.includes(collab.id)
        )
        .slice(0, 3);
      setEmailSuggestions(suggestions);
    } else {
      setEmailSuggestions([]);
    }
  };

  const selectSuggestion = (email) => {
    setNewCollaboratorEmail(email);
    setEmailSuggestions([]);
  };

  const handleClickOutside = (e) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
      setEmailSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addCollaborator = async () => {
    const collaborator = collaborators.find(
      (col) => col.email === newCollaboratorEmail
    );

    if (!collaborator) {
      setError("Collaborator does not exist.");
      return;
    }

    if (selectedBook.collaboratorIds.includes(collaborator.id)) {
      setError("Collaborator is already added to this book.");
      return;
    }

    const updatedCollaboratorIds = [
      ...selectedBook.collaboratorIds,
      collaborator.id,
    ];
    try {
      await fetch(`http://localhost:8000/books/${selectedBook.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collaboratorIds: updatedCollaboratorIds }),
      });

      setSelectedBook((prev) => ({
        ...prev,
        collaboratorIds: updatedCollaboratorIds,
      }));
      setNewCollaboratorEmail("");
      setEmailSuggestions([]);
      setError(null);
      alert("Collaborator added successfully!");
    } catch (error) {
      console.error("Failed to add collaborator:", error);
      setError("Failed to add collaborator.");
    }
  };

  const revokeAccess = async (collaboratorId) => {
    const updatedCollaboratorIds = selectedBook.collaboratorIds.filter(
      (id) => id !== collaboratorId
    );

    try {
      await fetch(`http://localhost:8000/books/${selectedBook.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collaboratorIds: updatedCollaboratorIds }),
      });

      setSelectedBook((prev) => ({
        ...prev,
        collaboratorIds: updatedCollaboratorIds,
      }));
    } catch (error) {
      console.error("Failed to revoke access:", error);
    }
  };

  if (user.role !== "Author") {
    return <div>You do not have permission to manage collaborators.</div>;
  }

  return (
    <div className="collaboration-settings">
      <h2 className="collaboration-settings__title">Collaboration Settings</h2>
      {error && <p className="collaboration-settings__error">{error}</p>}

      {/* Book Selection */}
      <div className="collaboration-settings__section">
        <h3>Select a Book</h3>
        <select
          onChange={(e) => handleBookSelect(e.target.value)}
          value={selectedBook?.id || ""}
          className="collaboration-settings__select"
        >
          <option value="" disabled>
            Select a book
          </option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add Collaborator */}
      {selectedBook && (
        <div className="collaboration-settings__section">
          <h3>Add New Collaborator</h3>
          <input
            type="email"
            placeholder="Collaborator Email"
            value={newCollaboratorEmail}
            onChange={handleEmailChange}
            className="collaboration-settings__input"
          />
          {emailSuggestions.length > 0 && (
            <ul
              ref={suggestionsRef}
              className="collaboration-settings__suggestions"
            >
              {emailSuggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => selectSuggestion(suggestion.email)}
                  className="collaboration-settings__suggestion-item"
                >
                  {suggestion.email}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={addCollaborator}
            className="collaboration-settings__button"
          >
            Add Collaborator
          </button>
        </div>
      )}

      {/* Collaborators List */}
      {selectedBook && (
        <div className="collaboration-settings__section">
          <h3>Current Collaborators</h3>
          <ul className="collaboration-settings__collaborators-list">
            {selectedBook.collaboratorIds.map((collaboratorId) => {
              const collaborator = collaborators.find(
                (col) => col.id === collaboratorId
              );
              return (
                <li
                  key={collaboratorId}
                  className="collaboration-settings__collaborator-item"
                >
                  <span>{collaborator?.email || "Unknown"}</span>
                  <button
                    onClick={() => revokeAccess(collaboratorId)}
                    className="collaboration-settings__revoke-button"
                  >
                    Revoke Access
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CollaborationSettings;
