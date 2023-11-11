import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css'; // Import the CSS file

// ... (your imports)

function App() {
  return (
    <Router>
      <div className="App">
        <div className="menu">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/register" className="menu-item">Register</Link>
          <Link to="/login" className="menu-item">Login</Link>
        </div>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


function Home() {
  return <h2>Home</h2>;
}

export default App;