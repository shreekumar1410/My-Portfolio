import React, { useState, useEffect } from 'react';
import './Styles/ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check if the user has a preferred theme stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme preference
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeToggle;
