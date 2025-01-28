import React, { useState, useEffect } from 'react';
import '../style/Header.css';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(prevState => !prevState);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <a href="/">QuickBids</a>
        </div>
        <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
          <ul>
            <li><a href="/products">PRODUCTS</a></li>
            <li><a href="/contact">CONTACT</a></li>
            <li><a href="/about">ABOUT</a></li>
            <li><a href="/userproducts">MY PRODUCTS</a></li>
          </ul>
        </nav>

        <div className="cta">
          {isLoggedIn ? (
            <a href="/signup">
              <img
                src="https://img.icons8.com/ios-filled/39/user-male-circle.png"
                alt="User Profile"
                className="user-icon"
              />
            </a>
          ) : (
            <a href="/signup" className="cta-button">Sign Up/Login</a>
          )}
        </div>
        <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
          <span className="hamburger"></span>
        </button>
      </header>
      <hr />
    </>
  );
}

export default Header;
