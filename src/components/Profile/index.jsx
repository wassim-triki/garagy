import React, { useRef } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { useUserAuth } from "../../context/UserContext";
import { BiUser } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import DefaultUserImg from "../../assets/images/default.svg";
import "./Profile.css";
import { storageRef } from "../../firebase-config";
import { uploadBytes, ref } from "firebase/storage";
import { Oval } from "react-loader-spinner";
import uploadToStorage from "../../helpers/uploadToStorage";
const Profile = () => {
  const { user, setUser } = useUserAuth();
  const [imageBlob, setImageBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(loading);
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
  useEffect(() => {
    // setUser({ ...user, img: null });
    // console.log(image);
    // console.log(user);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      // const profilePicRef = ref(storageRef, `images/${user.uid}`);
      // const snapshot = await uploadBytes(profilePicRef, imageBlob);
      await uploadToStorage("images", user.uid, imageBlob);
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
