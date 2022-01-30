import React, { useRef, useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserContext";
import { BiUser } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import DefaultUserImg from "../../assets/images/default.svg";
import "./Profile.css";
import { auth, storage, storageRef } from "../../firebase-config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { Oval } from "react-loader-spinner";
import {
  getProfilePicURL,
  getUserData,
  setUserDoc,
  uploadToStorage,
} from "../../helpers/user-data";
import { TextField } from "@mui/material";
import { updateEmail, updateProfile } from "firebase/auth";
const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  // const [displayName, setDisplayName] = useState("");
  const handleChange = (e, setState) => {
    setState(e.target.value);
  };
  const { user, setUser, setUserData } = useUserAuth();
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const imageRef = useRef();

  const handleImageSelect = async (e) => {
    const blob = e.target.files[0];
    if (blob) {
      setImageBlob(blob);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = (fileReaderEvent) => {
        setProfilePic(fileReaderEvent.target.result);
      };
    }
  };
  useEffect(() => {
    console.log(auth.currentUser);
  }, [auth.currentUser]);

  const handleDiscard = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setEmail(auth.currentUser?.email);
    setDisplayName(auth.currentUser?.displayName);
    setProfilePic(auth.currentUser?.photoURL);
  };

  useEffect(async () => {
    setProfilePic(auth.currentUser?.photoURL?.replace("s96-c", "s400-c"));
    setDisplayName(auth.currentUser?.displayName);
    setEmail(auth.currentUser?.email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      if (imageBlob) {
        await uploadToStorage("images", user.uid, imageBlob);
        const profilePic = await getProfilePicURL(user.uid);
        setProfilePic(profilePic);
        await updateProfile(auth.currentUser, {
          photoURL: profilePic,
        });
      }
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      await updateEmail(auth.currentUser, email);
    } catch (err) {
      setError(err.message);
      alert(err);
    } finally {
      setLoading(false);
      !error && alert("updated with success");
    }
  };
  return (
    <section className="section profile">
      <div className="container">
        <form className="form-profile" onSubmit={handleSubmit}>
          <div className="profile-picture__container">
            <img
              className="profile-picture"
              src={profilePic}
              alt="profile picture"
              ref={imageRef}
            />
            <label className="upload-label" htmlFor="upload"></label>
            <input
              type="file"
              className="upload"
              id="upload"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </div>
          <div className="inputs">
            <TextField
              id="outlined-basic"
              label="displayName"
              variant="outlined"
              onChange={(e) => handleChange(e, setDisplayName)}
              value={displayName}
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => handleChange(e, setEmail)}
              value={email}
            />
            <div className="form-btns">
              <button
                className="btn discard"
                type="button"
                onClick={handleDiscard}
              >
                Discard
              </button>
              <button className="btn save" type="submit">
                {loading ? (
                  <Oval color="#fff" height={20} width={20} />
                ) : (
                  "save"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
