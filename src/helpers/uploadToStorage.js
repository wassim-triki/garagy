import { ref, uploadBytes } from "firebase/storage";
import { storageRef } from "../firebase-config";

const uploadToStorage = async (folderPath, fileName, blob) => {
  const fileRef = ref(storageRef, `${folderPath}/${fileName}`);
  return uploadBytes(fileRef, blob);
};

export default uploadToStorage;
