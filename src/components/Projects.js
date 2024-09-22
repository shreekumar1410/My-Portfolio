import React from 'react';
import './Styles/Projects.css';

const Projects = () => {
  return (
    <div className="projects"> 
        <h2>My Projects</h2>
        <ul className="project-list">
            <li>Project 1: <a href="/ecommerce">E-Commerce Website</a></li>
            <li>Project 2: <a href="/smart-irrigation">Smart Irrigation System</a></li>
            <li>Project 3: <a href="/portfolio">Portfolio Website</a></li>
        </ul>
    </div>
  );
};

export default Projects;
