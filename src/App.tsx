import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import './App.css';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
       <h1>HUB 5</h1>
       <nav>
        <Link to="/login">login</Link>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
