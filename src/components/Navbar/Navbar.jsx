import React, { useEffect, useState, useRef } from "react";
import { FaCar, FaCarSide, FaUser } from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";
import { AiOutlineMenuUnfold, AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { RiArrowDropDownFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Navbar.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";
const Navbar = () => {
  const [isVisible, setTabletView] = useState(false);
  const toggleMenu = () => {
    setTabletView(!isVisible);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [search, setSearch] = useState("");
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const toggledropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };
  const [expandedSearch, setExpandedSearch] = useState(false);
  const toggleSearch = (e) => {
    e.preventDefault();
    setExpandedSearch(!expandedSearch);
    searchRef && searchRef.current.focus();
  };

  const ref = useRef(null);
  const searchRef = useRef(null);
  useOnClickOutside(ref, () => {
    setDropDownVisible(false);
    setExpandedSearch(false);
  });

  let maxMobile = screenWidth <= 700;
  let maxTablet = screenWidth <= 900;
  console.log(maxTablet);
  let minLaptop = screenWidth <= 1199;
  let minDesktop = screenWidth > 1200;
  const resizeOnWidth = (e) => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", resizeOnWidth);
    minDesktop && setExpandedSearch(false);
    return () => {
      window.removeEventListener("resize", resizeOnWidth);
    };
  });

  return (
    <nav className="navbar">
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
          <FaCar className="brand__logo" />
          <span className="brand__name">Garagy</span>
        </div>
      </Link>

      <ul className={`list${isVisible ? " visible" : ""}`}>
        <li className={`list__item${expandedSearch ? " li__expanded" : ""}`}>
          <form
            ref={ref}
            className={`form${expandedSearch ? " expanded" : ""}`}
          >
            <div className="form__buttons">
              <button
                type="submit"
                className="form-btn form-btn-search"
                onClick={(e) => {
                  toggleSearch(e);
                  toggledropDown();
                }}
              >
                <FiSearch className="search" />
              </button>
              <button
                type="button"
                onClick={() => !maxTablet && toggledropDown}
                className="form-btn form-btn-arrow"
              >
                <RiArrowDropDownFill className="arrow" />
              </button>
            </div>
            <input
              className="form__search"
              ref={searchRef}
              value={search}
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setDropDownVisible(true)}
            />
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
          </form>
        </li>
        {!expandedSearch && (
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

            <li className="list__item login">
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
            </li>
          </>
        )}
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
