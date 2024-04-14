import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './hooks/ProtectedRoute.jsx';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Library from './components/Library.js';
import Movie from './components/Movie.js'; 
import { AuthProvider } from "./hooks/useAuth";


// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>


//    //<Login test = {'mesaj'}/>
//    //<Register test = {'mesaj'}/>
//    <Home test = {'mesaj'}/>

//   );
// }

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
