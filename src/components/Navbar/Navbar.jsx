import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { BsArrowUpRight, BsArrowBarRight } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [isVisible, setIsVesible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  let isMobileView = screenWidth <= 500;
  let isTabletView = screenWidth <= 768;
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setScreenWidth(window.innerWidth);
      !isTabletView && setIsVesible(false);
    });
  });

  const toggleMenu = () => {
    setIsVesible(!isVisible);
  };
  return (
    <nav className="navbar">
      <div className="menu-icon-container">
        {isMobileView &&
          (isVisible ? (
            <IoCloseOutline className="menu-icon close" onClick={toggleMenu} />
          ) : (
            <AiOutlineMenuUnfold
              className="menu-icon open"
              onClick={toggleMenu}
            />
          ))}
      </div>
      <Link to={"/"}>
        <div className="brand">
          <FaCar className="brand__logo" />
          <span className="brand__name">Garagy</span>
        </div>
      </Link>
      <ul className={isVisible ? "list visible" : "list"}>
        <li className="list__item">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li className="list__item">
          <Link to="/explore" onClick={toggleMenu}>
            Explore
          </Link>
        </li>
        <li className="list__item">
          <Link to="/become-a-seller" onClick={toggleMenu}>
            Become a Seller
          </Link>
        </li>
        <li className="list__item">
          <Link to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
        </li>
        <li className="list__item login">
          <Link to="/login" onClick={toggleMenu}>
            Login
          </Link>
        </li>
      </ul>
      <Link to="/join">
        <button className="btn join" onClick={toggleMenu}>
          Join
          <BsArrowBarRight />
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
