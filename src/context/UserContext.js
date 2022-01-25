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

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  const setUserData = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };
  const getUserData = async (uid) => {
    try {
      const userDoc = doc(db, "users", uid);
      const userSnapShot = await getDoc(userDoc);
      const userData = userSnapShot.data();
      return userData;
    } catch (err) {
      return null;
    }
  };

  const handleGoogleSingIn = async () => {
    const credential = await signInWithPopup(auth, provider);
    const userData = await getUserData(credential.user.uid);
    if (!userData) {
      navigate("/join");
    } else {
      setUserData({
        ...userData,
        img: userData.img || credential.user.photoURL,
      });
    }
  };

  const createUser = (currentUser, username, type) => {
    return {
      uid: currentUser.uid,
      email: currentUser.email,
      username: username || currentUser.displayName,
      type: [type],
      img: currentUser.photoURL,
      createdAt: new Date().toLocaleString(),
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
        getUserData,
        createUser,
        handleGoogleSingIn,
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
