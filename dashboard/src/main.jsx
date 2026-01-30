import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import "./index.css";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "http://localhost:5174/login";
    }
  }, [token]);

  return token ? children : null;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
