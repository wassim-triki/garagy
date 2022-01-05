import React, { useEffect, useState } from "react";
import { FaCar, FaCarSide, FaUser } from "react-icons/fa";
import { BsArrowUpRight, BsArrowBarRight } from "react-icons/bs";
import { AiOutlineMenuUnfold, AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { RiArrowDropDownFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [isVisible, setIsVesible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [search, setSearch] = useState("");
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const toggledropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };
  let isMobileView = screenWidth <= 500;
  let isTabletView = screenWidth <= 950;
  const resizeOnWidth = (e) => {
    setScreenWidth(window.innerWidth);
    !isTabletView && setIsVesible(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeOnWidth);
    return () => window.removeEventListener("resize", resizeOnWidth);
  });

  const toggleMenu = () => {
    setIsVesible(!isVisible);
  };
  return (
    <nav className="navbar">
      <div className="menu-icon-container">
        {isTabletView &&
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
      <form className="form">
        <div className="container">
          <div className="form__buttons">
            <button type="submit" className="form-btn form-btn-search">
              <AiOutlineSearch className="search" />
            </button>
            <button type="button" className="form-btn">
              <RiArrowDropDownFill className="arrow" onClick={toggledropDown} />
            </button>
            <input
              className="form__search"
              value={search}
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {dropDownVisible && (
            <ul className="dropDown">
              <li onClick={toggledropDown} className="dropDown__item">
                <FaCarSide />
                <div className="dropDown__item__text">
                  <p className="dropDown__item__title">Cars</p>
                  <p className="dropDown__item__desc">
                    Browse available cars for rental.
                  </p>
                </div>
              </li>
              <li onClick={toggledropDown} className="dropDown__item">
                <FaUser />
                <div className="dropDown__item__text">
                  <p className="dropDown__item__title">Customers</p>
                  <p className="dropDown__item__desc">
                    Browse looking for cars.
                  </p>
                </div>
              </li>
            </ul>
          )}
        </div>
      </form>

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
      <Link to="/join" className="link-join">
        <button className="btn btn-join" onClick={(e) => setIsVesible(false)}>
          Join
          <BsArrowBarRight />
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
