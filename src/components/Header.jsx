import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><span className="brand">E</span>commerce</Link>
      </div>
      <nav className="nav">
        <Link to="/account">Account</Link>
        <Link to="/help">Help</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
};

export default Header;
