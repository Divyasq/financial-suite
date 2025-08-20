import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ItemsPage } from './pages/ItemsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/items" replace />} />
          <Route path="/items" element={<ItemsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
