import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase-config";
import { getProfilePicURL, getUserData } from "../helpers/user-data";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const setUserData = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    console.log(user);
  }, []);
  const googleSignIn = async () => {
    return signInWithPopup(auth, provider);
  };

  const createUser = (currentUser, type, phone = "") => {
    return {
      displayName: currentUser?.displayName,
      type,
      creationDate: new Date().toLocaleString(),
      profilePic: currentUser?.photoURL,
      email: currentUser.email,
      phone,
    };
  };
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signup,
        signin,
        logout,
        setUserData,
        createUser,
        googleSignIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserContext);
};

export default UserContext;
export { UserProvider };
