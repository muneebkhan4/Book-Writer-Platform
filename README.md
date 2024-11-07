# Book Writer Platform

This application provides a robust system for managing books and sections, allowing users to create, edit, and structure books with nested sections and subsections. The app supports collaborative editing by distinguishing between **Authors** and **Collaborators**, each with specific permissions.

## Core Functionalities

### User Roles and Permissions

- **Author**: The creator of the book. Can:

  - Edit the book title, sections, and subsections.
  - Add collaborators.
  - Add new books.

- **Collaborator**: A collaborator can:
  - Edit sections and subsections.
  - Cannot change the book title, add other collaborators, or delete the book.

### Book Creation and Editing

- An **Author** can create a new book, provide a title, and add sections with unlimited levels of nested subsections.
- Both **Authors** and **Collaborators** can edit sections and subsections within books they have access to.
- A **BookStructure** component enables section management with nested section rendering.

### Section Management

- Add, edit, delete, and organize sections and subsections within each book, including infinitely nested subsections.

---

## Coding Style and Best Practices

### 1. Component-based Architecture

We use **React functional components** to separate logic and UI into reusable, modular components. Components are divided into:

- **Presentational Components** (e.g., `Section.js`): Render the UI and handle user interactions.
- **Container Components** (e.g., `CreateBook.js`, `EditBook.js`): Handle data fetching, state, and business logic.

### 2. Context API for State Management

The **AuthContext** provides the current user data across components, ensuring role-based permissions are easily accessible.

### 3. State Management and Prop Drilling

- **State Hooks**: `useState` is used extensively for local state within components, such as handling form inputs and dynamic sections.
- **Prop Drilling**: Data and functions are passed as props from parent to child components, enabling section/subsection updates and recursive functionality.

### 4. Recursion for Nested Data Handling

Recursion in **`Section.js`** allows for an infinite level of nesting by recursively rendering subsections, enabling deeply nested book structures.

### 5. RESTful API Integration

- **Fetch API**: CRUD operations are managed using fetch requests to `json-server`, a simple RESTful backend simulating API calls to `localhost:8000`.
- **Data Validation**: Each data update or save action includes validation based on the user's role and authorization.

### 6. Utility Functions for Complex Updates

We have utility functions in **`Section.js`** to handle updates to nested structures, such as updating titles or adding subsections within a deeply nested structure.

### 7. Error Handling

- **Error Alerts**: Errors during API calls (e.g., creating/updating books) are handled using alerts and logging for developer visibility.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/muneebkhan4/Book-Writer-Platform.git
cd Book-Writer-Platform
```

### Install dependencies

```bash
npm install
```

### Run the application

Start the app in development mode:

Do this in one terminal

```bash
npm start
```

Run this in another terminal

```bash
node server.js
```
You can use the existing author and collaborator from db.json OR you can just sign up and create new.

In db.json,

Email for Author is: author1@abc.com

Password for Author is: password

Email for Collaborator is: collaborator1@abc.com

Password for Collaborator is: password

Password is saved in db.json in hash that's why I am mentioning here.