// src/components/SubSection.js
import React, { useState } from "react";
import "../styles/SubSection.css"; // Import component-specific CSS

const SubSection = ({ subsection, updateSubsectionTitle, sectionId }) => {
  const [newSubsectionTitle, setNewSubsectionTitle] = useState("");

  const handleAddSubsection = () => {
    updateSubsectionTitle(sectionId, subsection.id, newSubsectionTitle);
    setNewSubsectionTitle("");
  };

  return (
    <div className="subsection-container">
      <input
        className="subsection-title-input"
        type="text"
        value={subsection.title}
        onChange={(e) =>
          updateSubsectionTitle(sectionId, subsection.id, e.target.value)
        }
      />
      <button className="add-sub-subsection-btn" onClick={handleAddSubsection}>
        Add Sub-Subsection
      </button>

      {subsection.subsections &&
        subsection.subsections.map((subsubsection) => (
          <div key={subsubsection.id} className="subsubsection-container">
            <input
              className="subsubsection-title-input"
              type="text"
              value={subsubsection.title}
              onChange={(e) =>
                updateSubsectionTitle(
                  sectionId,
                  subsection.id,
                  subsubsection.id,
                  e.target.value
                )
              }
            />
          </div>
        ))}
    </div>
  );
};

export default SubSection;
