import React from "react";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import "./SocialLinks.css";
const SocialLinks = ({ theme = "light" }) => {
  return (
    <div className={`links ${theme === "light" ? "light" : "dark"}`}>
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
      <a href="wsmtriki@gmail.com" target="_blank" rel="noopener noreferrer">
        <SiGmail />
      </a>
    </div>
  );
};

export default SocialLinks;
