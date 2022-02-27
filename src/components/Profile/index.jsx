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
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/material.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { updateEmail, updatePhoneNumber, updateProfile } from "firebase/auth";
import {
  handleTypeChange,
  typeOptionsStyles,
} from "../../helpers/user-type-options";
import Alert from "../Alert";
import random from "../../utils/random";
const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleChange = (e, setState) => {
    setState(e.target.value);
  };
  const { user, setUser, setUserData } = useUserAuth();
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState([]);
  const [alert, setAlert] = useState({ state: "", text: "", id: 0 });
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => setPhone(e.target.value || "");
  const imageRef = useRef();

  const handleImageSelect = (e) => {
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
    setPhone(user.phone);
    setBio(user.bio);
  };
  useEffect(() => console.log(phone));

  useEffect(async () => {
    const userData = await getUserData(auth.currentUser?.uid);
    console.log(userData);
    setProfilePic(userData?.profilePic || auth.currentUser?.photoURL);
    setDisplayName(userData?.displayName);
    setEmail(auth.currentUser?.email);
    setType(userData?.type);
    setPhone(userData?.phone || auth.currentUser.phoneNumber || "");
    setBio(userData?.bio);
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
        console.log(imageBlob);
        await uploadToStorage("images/users", auth.currentUser?.uid, imageBlob);
        const profilePic = await getProfilePicURL(auth.currentUser?.uid);
        setProfilePic(profilePic);
        await updateProfile(auth.currentUser, {
          photoURL: profilePic,
        });
      }
      await updatePhoneNumber(auth.currentUser, phone);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      await updateEmail(auth.currentUser, email);
      const updatedUser = {
        ...user,
        type,
        profilePic: auth.currentUser.photoURL,
        displayName: auth.currentUser.displayName,
        bio,
        phone,
      };
      setUserData(updatedUser);
      await setUserDoc(auth.currentUser.uid, updatedUser);
      setAlert({ state: "success", text: "Profile Updated", id: random() });
    } catch (err) {
      setError(err.message);
      setAlert({ state: "danger", text: err.message, id: random() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section profile">
      <div className="container">
        <Alert variant={alert.state} text={alert.text} id={alert.id} />
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
              id="outlined-multiline-static"
              label="Bio"
              multiline
              rows={2}
              placeholder="Additional information"
              onChange={handleBioChange}
              value={bio}
            />
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
            <PhoneInput
              country={"tn"}
              value={phone}
              onChange={(p) => setPhone(p)}
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
                    checked={type.includes("seller") || false}
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
