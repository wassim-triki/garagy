import React from "react";
import "./Footer.css";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { useNavigate, Link } from "react-router-dom";
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
          <div className="links">
            <a
              href="https://www.facebook.com/WassimTrikii/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/wassimtriki/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsLinkedin />
            </a>
            <a
              href="https://twitter.com/WassimTrikii"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter />
            </a>
            <a
              href="wsmtriki@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGmail />
            </a>
          </div>
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
          <p className="copyright">Copyright &copy; 2022 Wassim Triki</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
