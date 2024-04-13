import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.js';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Library from './components/Library.js';
import Movie from './components/Movie.js'; 



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
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={() => <Navigate to="/home" replace />} /> {/* Redirect from / */}
        <Route path="/home" element={<Home />} /> {/* Actual home component */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected route for library */}
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        {/* Dynamic route for movie details */}
        <Route path="/movie/:movieId" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
