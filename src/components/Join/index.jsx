import React, { useContext, useEffect } from "react";
import "../../styles/forms.css";
import { auth, db } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import ContentBox from "../ContentBox";
import { useState } from "react/cjs/react.development";
import UserContext from "../../context/UserContext";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

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
      const userCredintial = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const currentUser = {
            uid: user.uid,
            username,
            email,
            password,
            type,
            img: user.photoURL,
          };
          setUser(currentUser);
          // localStorage.setItem("user", JSON.stringify(currentUser));
          // navigate(currentUser.type === "seller" ? "/customers" : "/cars");
        }
      });
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
    <section className="section join">
      <div className="container join">
        {user && <p>{JSON.stringify(user)}</p>}
        <form onSubmit={handleSubmit} className="form-join">
          <h1>Join</h1>
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
          <p className="question">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </section>
  );
};

export default Join;
