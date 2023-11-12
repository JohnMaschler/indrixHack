import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signin from './components/Signin';
import Map from './map'; // Adjust the import
import Home from './components/Home';
import Incident from './components/Incident';
import './App.css'; // Adjust the path to match the location of your CSS file



function App() {
  return (
    <Router>
      <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/Sign-in">Register</Link>
          </li>
          <li>
            <Link to="/incident">incidents</Link>
          </li>
        </ul>
      </nav>


        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/register" element={<Signin />} />
          <Route path="/incident" element={<Incident />}/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
