import React, { useRef, useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserContext";
import { BiUser } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import { ReactComponent as DefaultUserPic } from "../../assets/images/default.svg";
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
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { updateEmail, updateProfile } from "firebase/auth";
import {
  handleTypeChange,
  typeOptionsStyles,
} from "../../helpers/user-type-options";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };
  const { user, setUser, setUserData } = useUserAuth();
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState(user.type);
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

  const handleDiscard = () => {
    setEmail(auth.currentUser?.email);
    setDisplayName(auth.currentUser?.displayName);
    setProfilePic(auth.currentUser?.photoURL || null);
    setType(user.type);
  };

  useEffect(async () => {
    console.log(auth.currentUser);

    setProfilePic(auth.currentUser?.photoURL?.replace("s96-c", "s400-c"));
    setDisplayName(auth.currentUser?.displayName);
    setEmail(auth.currentUser?.email);
    const userData = await getUserData(auth.currentUser?.uid);
    setUserData(userData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      if (type.length === 0) {
        throw new Error("You must check atleast one option !");
      }
      if (imageBlob) {
        await uploadToStorage("images", auth.currentUser?.uid, imageBlob);
        const profilePic = await getProfilePicURL(auth.currentUser?.uid);
        setProfilePic(profilePic);
        await updateProfile(auth.currentUser, {
          photoURL: profilePic,
        });
      }
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      await updateEmail(auth.currentUser, email);
      const updatedUser = {
        ...user,
        type,
        profilePic: auth.currentUser.photoURL,
        displayName: auth.currentUser.displayName,
      };
      setUserData(updatedUser);
      await setUserDoc(auth.currentUser.uid, updatedUser);
      alert("updated with success");
    } catch (err) {
      setError(err.message);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section profile">
      <div className="container">
        <form className="form-profile" onSubmit={handleSubmit}>
          <div className="profile-picture__container">
            {profilePic ? (
              <img
                className="profile-picture"
                src={profilePic}
                alt="profile picture"
                ref={imageRef}
              />
            ) : (
              <BiUser className="defaultPic" />
            )}

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
              required
            />
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
