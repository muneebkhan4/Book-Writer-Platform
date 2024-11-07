import React, { useState } from "react";
import "../styles/Section.css";

function Section({ section, updateSections, allSections, isAuthor }) {
  const [title, setTitle] = useState(section.title);
  const [subsections, setSubsections] = useState(section.subsections || []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    const updatedSections = updateSectionTitle(allSections, section.id, title);
    updateSections(updatedSections);
  };

  const addSubsection = () => {
    const newSubsection = {
      id: Date.now(),
      title: "New Subsection",
      subsections: [], // Allow subsections to be nested
    };
    const updatedSections = addSubsectionToSection(
      allSections,
      section.id,
      newSubsection
    );
    setSubsections([...subsections, newSubsection]);
    updateSections(updatedSections);
  };

  return (
    <div className="section-container">
      <input
        className="section-title-input"
        type="text"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
      />
      {/* Only show the "Add Subsection" button if the user is the author */}
      {isAuthor && (
        <button className="add-subsection-btn" onClick={addSubsection}>
          Add Subsection
        </button>
      )}
      {subsections.map((subsection) => (
        <Section
          key={subsection.id}
          section={subsection}
          updateSections={updateSections}
          allSections={allSections}
          isAuthor={isAuthor} // Pass isAuthor prop down the tree
        />
      ))}
    </div>
  );
}

// Utility functions to handle section updates and adding subsections

const updateSectionTitle = (sections, sectionId, newTitle) => {
  return sections.map((section) => {
    if (section.id === sectionId) {
      return { ...section, title: newTitle };
    }
    if (section.subsections) {
      return {
        ...section,
        subsections: updateSectionTitle(
          section.subsections,
          sectionId,
          newTitle
        ),
      };
    }
    return section;
  });
};

const addSubsectionToSection = (sections, sectionId, newSubsection) => {
  return sections.map((section) => {
    if (section.id === sectionId) {
      return {
        ...section,
        subsections: [...(section.subsections || []), newSubsection],
      };
    }
    if (section.subsections) {
      return {
        ...section,
        subsections: addSubsectionToSection(
          section.subsections,
          sectionId,
          newSubsection
        ),
      };
    }
    return section;
  });
};

export default Section;
