import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
       <h1>Welcome to React Router!</h1>
       <nav>
        <Link to="/login">login</Link>
        <Link to="/">Home</Link>

      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
