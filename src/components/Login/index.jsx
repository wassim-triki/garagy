import React, { useContext, useEffect } from "react";
import "../../styles/forms.css";
import { auth, db } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import UserContext from "../../context/UserContext";

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <section className="section login">
      <div className="container login">
        {user && <p>{JSON.stringify(user)}</p>}
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
          <p className="question">
            Don't have an account? <Link to={"/join"}>Sign up</Link>
          </p>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </section>
  );
};

export default Join;
