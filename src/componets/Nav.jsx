import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {
  return (
    <nav>
      <div className="nav__container">
        <a href="/">
          <img src={logo} alt="" className="logo"></img>
        </a>
        <ul className="nav__links">
          <li className="nav__list">
            <a href="/" className="nav__link">
              Home
            </a>
          </li>
          <li className="nav__list">
            <a href="/movies" className="nav__link">
              Find Movies
            </a>
            <button className="btn__menu">
              <FontAwesomeIcon icon="bars" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
