import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <>
      <section className="section hero">
        <div className="container">
          <div className="hero__text">
            <h1 className="hero__title">
              Search, book, and rent vehicules easily
            </h1>
            <h2 className="hero__subtitle">
              Get a car wherever and whenever you need it with any device
            </h2>
            <button className="btn btn-join">Join</button>
          </div>
          <img
            className="hero__img"
            src={require("../../assets/images/herocar.png")}
            alt=""
          />
        </div>
      </section>
      <section className="section"></section>
    </>
  );
};

export default Home;
