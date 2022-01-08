import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { GiSteeringWheel } from "react-icons/gi";

import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchForm from "./SearchForm/SearchForm";
const Navbar = () => {
  const [isVisible, setTabletView] = useState(false);
  const toggleMenu = () => {
    setTabletView(!isVisible);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [expandForm, setExpandForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const applyScrollEffect = () => {
    setScrolled(window.scrollY > 100);
  };
  let maxTablet = screenWidth <= 900;
  let maxLaptop = screenWidth <= 1199;
  let minDesktop = screenWidth > 1200;

  const resizeOnWidth = (e) => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log(window.scrollY);
    window.addEventListener("resize", resizeOnWidth);
    window.addEventListener("scroll", applyScrollEffect);
    return () => {
      window.removeEventListener("resize", resizeOnWidth);
      window.removeEventListener("scroll", applyScrollEffect);
    };
  });

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="menu-icon-container">
        {maxTablet &&
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
          <GiSteeringWheel className="brand__logo" />
          <span className="brand__name">Garagy</span>
        </div>
      </Link>

      <ul className={`list${isVisible ? " visible" : ""}`}>
        {(minDesktop || (maxLaptop && !maxTablet)) && (
          <li
            className={`list__item list__itemForm ${
              expandForm ? "expand" : ""
            }`}
          >
            <SearchForm
              shrink={maxLaptop}
              desktop={minDesktop}
              setExpandForm={setExpandForm}
            />
          </li>
        )}

        {!expandForm && (
          <>
            <li className="list__item">
              <Link to="/about" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li className="list__item">
              <Link to="/become-a-seller" onClick={toggleMenu}>
                Become a Seller
              </Link>
            </li>
          </>
        )}
        <li className="list__item login">
          <Link to="/login" onClick={toggleMenu}>
            Login
          </Link>
        </li>
        {maxTablet && <SearchForm showDropdown={false} />}
      </ul>

      <div className="join__container">
        <Link to="/join" className="link-join">
          <button
            className="btn btn-join"
            onClick={(e) => setTabletView(false)}
          >
            Join
            <BsArrowBarRight />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
