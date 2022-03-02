import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCar } from "react-icons/fa";
import { BsArrowBarRight } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { GiSteeringWheel } from "react-icons/gi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchForm from "./SearchForm/SearchForm";
import NavbarContext from "../../context/NavbarContext";
import UserContext from "../../context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { BiUser } from "react-icons/bi";
import UserDropDown from "../UserDropdown";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import SocialLinks from "../SocialLinks";
const Navbar = () => {
  const { user, setUser, logout } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
  const userRef = useRef();
  const closeMenu = () => {
    setIsVisible(false);
  };
  useOnClickOutside(userRef, () => {
    setUserDropdown(false);
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [expandForm, setExpandForm] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
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
              <Link to="/cars" onClick={closeMenu}>
                Cars
              </Link>
            </li>
            <li className="list__item">
              <Link to="/customers" onClick={closeMenu}>
                Customers
              </Link>
            </li>
          </>
        )}
        {!user && (
          <li className="list__item login">
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          </li>
        )}

        {maxTablet && (
          <>
            {" "}
            <SearchForm showDropdown={false} />
            <SocialLinks theme="dark" />
          </>
        )}
      </ul>
      <div className="join__container">
        {user ? (
          <>
            <div
              ref={userRef}
              onClick={() => {
                setUserDropdown(true);
                closeMenu();
              }}
              className={`userIconContainer ${
                transparent && !isVisible ? "white" : ""
              }`}
            >
              <BiUser />
            </div>
            <UserDropDown userDropdown={userDropdown} />
          </>
        ) : (
          <Link to="/join" className="link-join">
            <button
              className="btn btn-join"
              onClick={(e) => setIsVisible(false)}
            >
              Join
              <BsArrowBarRight />
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
