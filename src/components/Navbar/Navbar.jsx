import React from "react";
import { FaCar } from "react-icons/fa";
import { BsArrowUpRight, BsArrowBarRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <div className="brand">
          <FaCar className="brand__logo" />
          <span className="brand__name">Garagy</span>
        </div>
      </Link>
      <ul className="list">
        <li className="list__item">
          <Link to="/">Home</Link>
        </li>
        <li className="list__item">
          <Link to="/explore">Explore</Link>
        </li>
        <li className="list__item">
          <Link to="/become-a-seller">Become a Seller</Link>
        </li>
        <li className="list__item">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="list__item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Link to="/join">
        <button className="btn join">
          Join
          <BsArrowBarRight />
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
