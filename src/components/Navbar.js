import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component
import './Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Shree Kumar</h1>
      <div className="nav-content">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/projects" className="nav-link">Projects</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
      </div>
      <ThemeToggle /> {/* Add the theme toggle button */}
    </nav>
  );
};

export default Navbar;
