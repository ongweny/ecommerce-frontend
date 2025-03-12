import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <table className="footer-table">
          <thead>
            <tr>
              <th>Socials</th>
              <th>Need Help?</th>
              <th>Who are we? </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="#">Facebook</a></td>
              <td><Link to="/help">Help Center</Link></td>
              <td><Link to="/about">About Us</Link></td>
            </tr>
            <tr>
              <td><a href="#">Instagram</a></td>
              <td><Link to="/contact">Contact</Link></td>
              <td><Link to="/policies">Policies</Link></td>
            </tr>
            <tr>
              <td><a href="#">Twitter</a></td>
              <td></td>
              <td><Link to="/terms">Terms and Conditions</Link></td>
            </tr>
            <tr>
              <td><a href="#">TikTok</a></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><a href="#">Pinterest</a></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  );
};

export default Footer;
