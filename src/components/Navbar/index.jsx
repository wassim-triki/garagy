import React, { useContext, useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { GiSteeringWheel } from "react-icons/gi";

import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import SearchForm from "./SearchForm/SearchForm";
import NavbarContext from "../../context/NavbarContext/NavbarContext";
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
  const closeMenu = () => {
    setIsVisible(false);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [expandForm, setExpandForm] = useState(false);
  const { transparent, setTransparent } = useContext(NavbarContext);
  const location = useLocation();
  const applyScrollEffect = () => {
    setTransparent(window.scrollY < 50 && location.pathname === "/");
  };
  let maxTablet = screenWidth <= 900;
  let maxLaptop = screenWidth <= 1199;
  let minDesktop = screenWidth > 1200;

  const resizeOnWidth = (e) => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeOnWidth);
    window.addEventListener("scroll", applyScrollEffect);
    setTransparent(location.pathname === "/");
    return () => {
      window.removeEventListener("resize", resizeOnWidth);

      window.removeEventListener("scroll", applyScrollEffect);
    };
  }, [location.pathname]);

  return (
    <nav className={`navbar${!transparent || isVisible ? " scrolled" : ""}`}>
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
      <Link to={"/"} onClick={closeMenu}>
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
              <Link to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="list__item">
              <Link to="/become-a-seller" onClick={closeMenu}>
                Become a Seller
              </Link>
            </li>
          </>
        )}
        <li className="list__item login">
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        </li>
        {maxTablet && <SearchForm showDropdown={false} />}
      </ul>

      <div className="join__container">
        <Link to="/join" className="link-join">
          <button className="btn btn-join" onClick={(e) => setIsVisible(false)}>
            Join
            <BsArrowBarRight />
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
