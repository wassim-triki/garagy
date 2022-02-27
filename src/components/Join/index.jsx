import React, { useEffect, useState } from "react";
import "../../styles/forms.css";
import { auth, db } from "../../firebase-config";

import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContext";
import "./Join.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { doc, setDoc } from "firebase/firestore";

import { onAuthStateChanged, updateEmail, updateProfile } from "firebase/auth";
import GoogleButton from "react-google-button";
import { getUserData, setUserDoc } from "../../helpers/user-data";
import { Checkbox, FormGroup } from "@mui/material";
import {
  handleTypeChange,
  typeOptionsStyles,
} from "../../helpers/user-type-options";
import Alert from "../Alert";
import random from "../../utils/random";
const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const [type, setType] = useState(["customer"]);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newGoogleUser, setNewGoogleUser] = useState(false);
  const [alert, setAlert] = useState({ state: "", text: "", id: 0 });
  const navigate = useNavigate();

  const { setUser, signup, createUser, googleSignIn, setUserData } =
    useUserAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handledisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleTypeOptionsError = () => {
    if (type.length === 0) {
      throw new Error("You must check atleast one option !");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      setError(null);
      handleTypeOptionsError();

      const credential = await googleSignIn();

      const user = credential.user;
      const userData = await getUserData(user.uid);
      if (!userData) {
        console.log("new google user");
        await updateProfile(user, {
          photoURL: user.photoURL.replace("s96-c", "s400-c"),
        });
        setNewGoogleUser(true);
        const newUser = createUser(
          user,
          type.length > 0 ? type : ["customer"],
          phone
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      handleTypeOptionsError();
      console.log("normal signup");
      const credential = await signup(email, password);
      await updateProfile(auth.currentUser, { displayName: displayName });

      const newUser = createUser(auth.currentUser, type, phone);
      setUserData(newUser);
      console.log(newUser);
      await setUserDoc(auth.currentUser.uid, newUser);
      console.log("doc set!");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      setAlert({ state: "danger", text: err.message, id: random() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section join">
      <div className="container join">
        <Alert variant={alert.state} text={alert.text} id={alert.id} />
        <form onSubmit={handleSubmit} className="form-join">
          <h1>Join</h1>

          <div className="form-join__control">
            <input
              onChange={handledisplayNameChange}
              value={displayName}
              className="form-join__input"
              type="text"
              placeholder="displayName"
              required
            />
            <input
              onChange={handleEmailChange}
              value={email}
              className="form-join__input"
              type="email"
              placeholder="Email Address"
              required
            />
            <input
              onChange={handlePasswordChange}
              value={password}
              className="form-join__input"
              type="password"
              placeholder="Password"
              required
            />
            <input
              onChange={handlePhoneChange}
              className="form-join__input"
              type="text"
              pattern="\d*"
              maxLength={8}
              placeholder="Phone N°"
              value={phone}
              required
            />
          </div>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={type.includes("customer")}
                  sx={typeOptionsStyles}
                  value={"customer"}
                  onChange={(e) => handleTypeChange(e, type, setType)}
                />
              }
              label="Customer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={type.includes("seller")}
                  sx={typeOptionsStyles}
                  onChange={(e) => handleTypeChange(e, type, setType)}
                  value={"seller"}
                />
              }
              label="Seller"
            />
          </FormGroup>

          <button
            className="form-join__submit"
            type="submit"
            disabled={loading}
          >
            Create an Account
          </button>

          <span className="or">OR</span>
          <GoogleButton
            className="google-btn"
            onClick={handleGoogleSignin}
            disabled={loading}
          />

          <p className="question">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Join;
