import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Analytics from './Analytics';
import Prediction from './Prediction';
import './App.css';
import Home from './Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Prediction" element={<Prediction />} />
      </Routes>
    </BrowserRouter>
  );
}


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

// //export default App;
