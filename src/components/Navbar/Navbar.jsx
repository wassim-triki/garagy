import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import { BsArrowUpRight, BsArrowBarRight } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState(true);
  const [isVisible, setIsVesible] = useState(false);

  const toggleMenu = () => {
    setIsMobileView(!isMobileView);
    setIsVesible(!isVisible);
  };
  return (
    <nav className="navbar">
      {isMobileView ? (
        <AiOutlineMenuUnfold className="menu-icon" onClick={toggleMenu} />
      ) : (
        <IoCloseOutline className="menu-icon" onClick={toggleMenu} />
      )}
      <Link to={"/"}>
        <div className="brand">
          <FaCar className="brand__logo" />
          <span className="brand__name">Garagy</span>
        </div>
      </Link>
      <ul className={isVisible ? "list visible" : "list"}>
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
        <li className="list__item login">
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
