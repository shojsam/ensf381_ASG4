import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg'; 
const Header = () => {
  return (
    <>
    <header className="header">
      <img src={logo} alt="LMS Logo" className="logo" />
    </header>
      <nav className="nav_links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/login">Login</Link>
      </nav>
    
    </>
  );
};

export default Header;
