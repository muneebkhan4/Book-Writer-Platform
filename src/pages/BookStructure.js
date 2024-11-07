import React, { useState } from "react";
import Section from "../components/Section";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/BookStructure.css";

function BookStructure({ initialBookData = null, onSave }) {
  const { user } = useContext(AuthContext);
  const isAuthor = user.role === "Author";
  const [sections, setSections] = useState(
    initialBookData ? initialBookData.sections : []
  );

  const updateSections = (updatedSections) => {
    setSections(updatedSections);
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: "New Section",
      subsections: [],
    };
    setSections([...sections, newSection]);
  };

  return (
    <div className="book-structure-container">
      <h1>Book Structure</h1>
      {/* Only show the "Add Section" button if the user is the author */}
      {isAuthor && (
        <button className="add-section-btn" onClick={addSection}>
          Add Section
        </button>
      )}
      {sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          allSections={sections}
          updateSections={updateSections}
          isAuthor={isAuthor} // Pass down isAuthor prop to manage subsection creation
        />
      ))}
      <div className="save-container">
        <button className="save-btn" onClick={() => onSave(sections)}>
          Save
        </button>
      </div>
    </div>
  );
}

export default BookStructure;
