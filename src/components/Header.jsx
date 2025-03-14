import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><span className="brand">E</span>commerce</Link>
      </div>
      <nav className="nav">
        <Link to={isLoggedIn ? "/account" : "/login"}>
          {isLoggedIn ? "Account" : "Login"}
        </Link>
        <Link to="/help">Help</Link>
        {isLoggedIn && <Link to="/cart">Cart</Link>}
      </nav>
    </header>
  );
};

export default Header;
