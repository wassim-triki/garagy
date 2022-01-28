import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage, storageRef } from "../firebase-config";

export const uploadToStorage = async (folderPath, fileName, blob) => {
  const fileRef = ref(storageRef, `${folderPath}/${fileName}`);
  return uploadBytes(fileRef, blob);
};

export const getProfilePicURL = async (user) => {
  try {
    const profilePicRef = ref(
      storage,
      `gs://garagy-87d13.appspot.com/images/${user.uid}`
    );
    return await getDownloadURL(profilePicRef);
  } catch (err) {
    return null;
  }
};
export const getUserData = async (uid) => {
  try {
    const userDoc = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDoc);
    const userData = userSnapShot.data();
    return userData;
  } catch (err) {
    return null;
  }
};

export const setUserDoc = async (userData) => {
  const userDoc = doc(db, "users", userData.uid);
  return setDoc(userDoc, userData);
};
