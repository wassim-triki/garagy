import React from "react";
import "./Footer.css";

import { useNavigate, Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import SocialLinks from "../SocialLinks";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container">
        <div className="container-join">
          <button onClick={() => navigate("/login")}>Login</button>
          <p>
            New user? <Link to={"/join"}>Join</Link>
          </p>
        </div>

        <div className="container__bottom">
          <SocialLinks theme="light" />
          <ul className="useful-links">
            <li className="link">
              <a href="#" target="_blank">
                Conditions of Use
              </a>
            </li>
            <li className="link">
              <a href="#" target="_blank">
                Privacy Notice
              </a>
            </li>
            <li className="link">
              <a href="#" target="_blank">
                Help
              </a>
            </li>
          </ul>
          <p className="copyright">
            Copyright &copy; 2022 <span> Wassim Triki</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
