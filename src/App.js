// src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CollaborationSettings from "./pages/CollaborationSettings";
import HomePage from "./pages/HomePage";
import EditBook from "./pages/EditBook";
import Navbar from "./components/Navbar";
import { AuthContext } from "./contexts/AuthContext";
import CreateBook from "./pages/CreateBook";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Display a loading state until user is checked
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/create-book"
          element={
            <ProtectedRoute>
              <CreateBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-collaborators"
          element={
            <ProtectedRoute>
              {user && user.role === "Author" ? (
                <CollaborationSettings />
              ) : (
                <Navigate to="/" />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-book/:id"
          element={user ? <EditBook /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
