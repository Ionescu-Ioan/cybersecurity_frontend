import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import "./App.css";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Library from "./components/Library.js";
import Movie from "./components/Movie.js";
import { AuthProvider } from "./hooks/useAuth";
import UserProfile from "./components/UserProfile.js";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Home />} />
          <Route path="movie/:movieId" element={<Movie />} />
          <Route path="profile" element={<ProtectedRoute> <UserProfile/> </ProtectedRoute>}/>
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
