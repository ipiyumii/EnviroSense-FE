import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Analytics from './Analytics';
import Prediction from './Prediction';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <div className="container mt-5">
          <div className="dashboard-container">
            <div className="dashboard-left">
              <h2 className="mt-4">ABC PVT LTD</h2>
            </div>

            <div className="dashboard-right">
              <div>
                <NavLink to="/Analytics" className="card-link">
                  <div className="card-body" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">විශ්ලේෂනයන් බලන්න</h5>
                      <p className="card-text">Click to view waste management analytics.</p>
                    </div>
                  </div>
                </NavLink>
              </div>

              <div>
                <NavLink to="/Prediction" className="card-link">
                  <div className="card-body" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">වේලාවන් බලන්න</h5>
                      <p className="card-text">Click to view waste management predictions.</p>
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <Routes>
        <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Prediction" element={<Prediction />} />
        </Routes>
      </div>
    </Router>
  );
}




export default App;
