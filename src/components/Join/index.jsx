import React, { useEffect, useState } from "react";
import "../../styles/forms.css";
import { auth, db } from "../../firebase-config";

import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { doc, setDoc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import GoogleButton from "react-google-button";
import { getUserData } from "../../helpers/user-data";

const radioStyles = {
  color: "#ababab",
  "&.Mui-checked": {
    color: "#f4b251",
  },
};
const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, SetType] = useState("customer");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newGoogleUser, setNewGoogleUser] = useState(false);
  const navigate = useNavigate();

  const { setUser, signup, createUser, googleSignIn, setUserData } =
    useUserAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleTypeChange = (e) => {
    SetType(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let currentUser = null;
      if (auth.currentUser) {
        currentUser = auth.currentUser;
      } else {
        const credential = await signup(email, password);
        currentUser = credential.user;
      }
      const newUser = createUser(currentUser, username, type);
      const newUserDoc = doc(db, "users", currentUser.uid);
      await setDoc(newUserDoc, newUser);
      setUserData(newUser);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(async () => {}, []);
  useEffect(async () => {
    if (auth.currentUser) {
      const data = await getUserData(auth.currentUser?.uid);
      setNewGoogleUser(data == null);
    }
  }, [auth.currentUser]);
  return (
    <section className="section join">
      <div className="container join">
        <form onSubmit={handleSubmit} className="form-join">
          <h1>Join</h1>
          {error && <p className="alert">{error}</p>}
          {!newGoogleUser && (
            <div className="form-join__control">
              <input
                onChange={handleUsernameChange}
                value={username}
                className="form-join__input"
                type="text"
                placeholder="Username"
              />
              <input
                onChange={handleEmailChange}
                value={email}
                className="form-join__input"
                type="email"
                placeholder="Email Address"
              />
              <input
                onChange={handlePasswordChange}
                value={password}
                className="form-join__input"
                type="password"
                placeholder="Password"
              />
            </div>
          )}

          <RadioGroup
            className="types"
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="customer"
            name="radio-buttons-group"
            onChange={handleTypeChange}
          >
            <FormControlLabel
              value="customer"
              control={<Radio sx={radioStyles} />}
              label="Customer"
            />
            <FormControlLabel
              value="seller"
              control={<Radio sx={radioStyles} />}
              label="Seller"
            />
          </RadioGroup>

          <button
            className="form-join__submit"
            type="submit"
            disabled={loading}
          >
            Create an Account
          </button>
          {!newGoogleUser && (
            <GoogleButton
              className="google-btn"
              onClick={googleSignIn}
              disabled={loading}
            />
          )}

          <p className="question">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Join;
