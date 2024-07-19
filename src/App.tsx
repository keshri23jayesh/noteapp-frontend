import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Notes from './components/Notes';
import NoteDetails from './components/NoteDetails';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="container">
        {isAuthenticated && <button onClick={handleLogout} className="btn-lg float-end btn btn-outline-info mt-3">Logout</button>}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/notes" /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/notes" element={isAuthenticated ? <Notes /> : <Navigate to="/login" />} />
          <Route path="/notes/:id" element={isAuthenticated ? <NoteDetails /> : <Navigate to="/login" />} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/notes" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
