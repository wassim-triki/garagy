import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarContext from "../../context/NavbarContext";
import ContentBox from "../ContentBox";

const About = () => {
  return (
    <section
      className="section about"
      style={{
        marginTop: "3rem",
      }}
    >
      <div className="container">
        <ContentBox>
          <h2 className="title">About us</h2>
          <p className="text">
            t is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
          </p>
        </ContentBox>
      </div>
    </section>
  );
};

export default About;
