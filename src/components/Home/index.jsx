import React, { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { ReactComponent as FlexibleRentalIcon } from "../../assets/images/flexible.svg";
import { ReactComponent as FeesIcon } from "../../assets/images/fees.svg";
import { ReactComponent as DeliveryIcon } from "../../assets/images/delivery.svg";
import ContentBox from "../ContentBox";
import { auth } from "../../firebase-config";
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
            <Link to={"/join"}>
              <button className="btn btn-join">Join NOW !</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="section features">
        <div className="container">
          <div className="feature">
            <FlexibleRentalIcon className="feature__icon" />
            <div className="feature__text">
              <h3 className="feature__text__title">Flexible rentals</h3>
              <p className="feature__text__disc">
                Cancel or change most bookings for free up to 48 hours before
                pick-up
              </p>
            </div>
          </div>
          <div className="feature">
            <FeesIcon className="feature__icon" />
            <div className="feature__text">
              <h3 className="feature__text__title">No hidden fees</h3>
              <p className="feature__text__disc">
                Know exactly what you're paying
              </p>
            </div>
          </div>
          <div className="feature">
            <DeliveryIcon className="feature__icon" />
            <div className="feature__text">
              <h3 className="feature__text__title">Fast car delivery</h3>
              <p className="feature__text__disc">
                Your cars will be delivered as fast as possible
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section customer">
        <div className="container">
          {/* <div className="preview">
            <h2>As a customer</h2>
            <p>Browse a multitude of different cars for rent.</p>
            <p>Pay safely with your favourite method.</p>
            <p>Enjoy fast and secure service.</p>
            <p>Rate and share your experiences with others.</p>
          </div> */}
          <ContentBox>
            <h2>As a customer</h2>
            <p>Browse a multitude of different cars for rent.</p>
            <p>Pay safely with your favourite method.</p>
            <p>Enjoy fast and secure service.</p>
            <p>Rate and share your experiences with others.</p>
          </ContentBox>
        </div>
      </section>
      <section className="section seller">
        <div className="container">
          <div className="preview">
            <h2>as a Seller</h2>
            <p>Upload details of your cars and share them for rental.</p>
            <p>Look for customers who are looking for cars.</p>
            <p>Talk with a client.</p>
            <p>Get paid.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
