import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './firebase';
import Signin from './components/Signin';
import Map from './map';
import Home from './components/Home';
import Incident from './components/Incident';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up a Firebase authentication observer
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
  
    // Cleanup the observer when the component unmounts
    return () => unsubscribe();
  }, []);
  
  const handleSignOut = () => {
    auth.signOut();
  };
  

  return (
    <Router>
      <div>
        <nav>
          <div className="nav-container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              {user ? (
                <>
                  <span>Welcome, {user.displayName}!</span>
                  <button onClick={handleSignOut}>Sign Out</button>
                </>
              ) : (
                <Link to="/signin">Sign-in</Link>
              )}
            </li>
            <li>
              <Link to="/incident">incidents</Link>
            </li>
          </ul>
          </div>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/incident" element={<Incident />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
