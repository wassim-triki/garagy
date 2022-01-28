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
const Profile = () => {
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
      imageRef.current.src = fileReaderEvent.target.result;
    };
  };
  useEffect(async () => {
    // imageRef.current.src = profilePicURL;
    // console.log(await getProfilePicURL(user));
    const userData = await getUserData(user.uid);
    setUserData(userData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      await uploadToStorage("images", user.uid, imageBlob);
      const profilePicURL = await getProfilePicURL(user);

      setUserData({ ...user, img: profilePicURL || user.img });
      await setUserDoc(user);
      console.log("updated Doc");
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
              src={user.img || DefaultUserImg}
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
          <button className="btn save" type="submit">
            {loading ? <Oval color="#fff" height={20} width={20} /> : "save"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
