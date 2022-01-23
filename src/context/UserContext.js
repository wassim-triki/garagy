import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();
  const signup = async (email, password, username, type) => {
    const userCrendential = await createUserWithEmailAndPassword(
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
        localStorage.setItem("user", JSON.stringify(currentUser));
        navigate(currentUser.type === "seller" ? "/customers" : "/cars");
      }
    });
  };
  const signin = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };
  return (
    <UserContext.Provider value={{ user, setUser, signup, signin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserContext);
};

export default UserContext;
export { UserProvider };
