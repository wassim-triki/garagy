import React, { useEffect, useState } from "react";
import "../../styles/forms.css";
import { auth, db, provider } from "../../firebase-config";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";
import { doc, getDoc } from "firebase/firestore";

import GoogleButton from "react-google-button";
import { signInWithPopup } from "firebase/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signin, getUserData, setUserData, googleSignIn } = useUserAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const credential = await signin(email, password);
      const userData = await getUserData(credential.user.uid);
      setUserData(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await googleSignIn();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section login">
      <div className="container login">
        <form onSubmit={handleSubmit} className="form-login">
          <h1>Login</h1>
          {error && <p className="alert">{error}</p>}
          <div className="form-login__control">
            <input
              onChange={handleEmailChange}
              value={email}
              className="form-login__input"
              type="email"
              placeholder="Email Address"
            />
            <input
              onChange={handlePasswordChange}
              value={password}
              className="form-login__input"
              type="password"
              placeholder="Password"
            />
          </div>

          <button
            className="form-login__submit"
            type="submit"
            disabled={loading}
          >
            Login
          </button>
          <GoogleButton
            className="google-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          />
          <p className="question">
            Don't have an account? <Link to={"/join"}>Sign up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
