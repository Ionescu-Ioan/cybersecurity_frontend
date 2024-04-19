import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import "./App.css";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Library from "./components/Library.js";
import MoviePage from "./components/MoviePage.js";
import UserProfile from "./components/UserProfile.js";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Home />} />
          <Route path="movie" element={<MoviePage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                {" "}
                <UserProfile />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
