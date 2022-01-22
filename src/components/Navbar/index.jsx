import React, { useContext, useEffect, useState } from "react";
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
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
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

  const handleLogout = () => {
    closeMenu();
    signOut(auth)
      .then(() => {
        navigate("/");
        setUser(null);
      })
      .catch((err) => alert(err.message));
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
  useEffect(() => {
    console.log("auth: " + auth.currentUser);
    console.log("state: " + user);
  }, [user, auth.currentUser]);
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
          {user ? (
            <span className="logout" onClick={handleLogout}>
              Logout
            </span>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          )}
        </li>

        {maxTablet && <SearchForm showDropdown={false} />}
      </ul>
      {!user && (
        <div className="join__container">
          <Link to="/join" className="link-join">
            <button
              className="btn btn-join"
              onClick={(e) => setIsVisible(false)}
            >
              Join
              <BsArrowBarRight />
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
