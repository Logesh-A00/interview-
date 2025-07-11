import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    closeMenu();
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token'); // simple login check

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">
          <span className="q">Q</span>uickShow
        </h2>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/theaters" onClick={closeMenu}>Theaters</Link>
        <Link to="/seatbooking" onClick={closeMenu}>SeatBooking</Link>
        <Link to="/favorites" onClick={closeMenu}>Favorites</Link>
      </div>

      <div className="navbar-right">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />

        {!isLoggedIn ? (
          <Link to="/login" className="login-btn" onClick={closeMenu}>
            Login
          </Link>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

        <div className="hamburger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="menu-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
