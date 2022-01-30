import React, { useRef, useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserContext";
import { BiUser } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import DefaultUserImg from "../../assets/images/default.svg";
import "./Profile.css";
import { storage, storageRef } from "../../firebase-config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { Oval } from "react-loader-spinner";
import {
  getProfilePicURL,
  getUserData,
  setUserDoc,
  uploadToStorage,
} from "../../helpers/user-data";
import { TextField } from "@mui/material";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setImageURL] = useState(null);
  // const [username, setUsername] = useState("");
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
    setImageBlob(blob);
    let fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = (fileReaderEvent) => {
      setImageURL(fileReaderEvent.target.result);
    };
  };

  const handleDiscard = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setEmail(userData.email);
    setUsername(userData.username);
    setImageURL(null);
  };

  useEffect(async () => {
    const userData = await getUserData(user?.uid);
    setUsername(userData?.username);
    setEmail(userData?.email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      await uploadToStorage("images", user.uid, imageBlob);
      const profilePic = await getProfilePicURL(user.uid);
      await setUserDoc({ ...user, img: profilePic, username, email });
      console.log("updated Doc");
      const userData = await getUserData(user.uid);
      setUserData(userData);
    } catch (err) {
      setError(err.message);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="section profile">
      <div className="container">
        <form className="form-profile" onSubmit={handleSubmit}>
          <div className="profile-picture__container">
            <img
              className="profile-picture"
              src={imageURL || user.img || DefaultUserImg}
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
              label="Username"
              variant="outlined"
              onChange={(e) => handleChange(e, setUsername)}
              value={username}
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => handleChange(e, setEmail)}
              value={email}
              disabled
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
