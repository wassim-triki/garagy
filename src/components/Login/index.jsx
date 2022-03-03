import React, { useEffect, useState } from "react";
import "../../styles/forms.css";
import { auth, db, provider } from "../../firebase-config";
import "./Login.css";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";
import { doc, getDoc } from "firebase/firestore";

import GoogleButton from "react-google-button";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { getUserData, setUserDoc } from "../../helpers/user-data";
import random from "../../utils/random";
import Alert from "../Alert";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ state: "", text: "", id: 0 });
  const navigate = useNavigate();
  const { signin, setUserData, googleSignIn, createUser } = useUserAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const credential = await signin(email, password);
      const userData = await getUserData(credential.user.uid);
      setUserData(userData);
    } catch (err) {
      setError(err.message);
      setAlert({ state: "danger", text: err.message, id: random() });
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const credential = await googleSignIn();
      const user = credential.user;
      const userData = await getUserData(user.uid);
      if (userData) {
        setUserData(userData);
      } else {
        await updateProfile(user, {
          photoURL: user.photoURL.replace("s96-c", "s400-c"),
        });
        const newUser = createUser(user, ["customer"]);
        await setUserDoc(user.uid, newUser);
      }
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      setAlert({ state: "danger", text: err.message, id: random() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section login">
      <div className="container login">
        <Alert variant={alert.state} text={alert.text} id={alert.id} />
        <form onSubmit={handleSubmit} className="form-login">
          <h1>Login</h1>

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
          <Link className="forgot-password" to={"/password-reset"}>
            Forgot your password?
          </Link>
          <span className="or">OR</span>
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
