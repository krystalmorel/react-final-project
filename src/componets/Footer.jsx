import React from "react";
import logo from "../assets/footer-logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <a href="/">
            <figure className="footer__logo">
              <img src={logo} className="footer__logo--img" alt="" />
            </figure>
          </a>
          <div className="footer__list">
            <a href="/" className="footer__link">Home</a>
            <a href="/" className="footer__link">About</a>
            <a href="/" className="footer__link">Movies</a>
          </div>
          <div className="footer__copyright">Copyright &copy; 2025 Library</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
