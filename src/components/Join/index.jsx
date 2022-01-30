import React, { useEffect, useState } from "react";
import "../../styles/forms.css";
import { auth, db } from "../../firebase-config";

import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { doc, setDoc } from "firebase/firestore";

import { onAuthStateChanged, updateEmail, updateProfile } from "firebase/auth";
import GoogleButton from "react-google-button";
import { getUserData } from "../../helpers/user-data";
import { Checkbox, FormGroup } from "@mui/material";
import UserTypeOptions from "../UserTypeOptions/UserTypeOptions";

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(["customer"]);
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
  const handleTypeChange = (e) =>
    e.target.checked
      ? setType([...type, e.target.value])
      : setType(type.filter((t) => t !== e.target.value));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (type.length === 0) {
        throw new Error("You must check atleast one option !");
      }

      if (newGoogleUser) {
        console.log("google signup");
      } else {
        console.log("normal signup");
        const credential = await signup(email, password);
        await updateProfile(auth.currentUser, { displayName: username });
      }

      const newUser = createUser(auth.currentUser, type);
      const newUserDoc = doc(db, "users", auth.currentUser.uid);
      await setDoc(newUserDoc, newUser);
      setUserData(newUser);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
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

          <UserTypeOptions handleOnChange={handleTypeChange} />

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
