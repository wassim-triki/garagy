import { collection, getDocs, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config";

const ProposalsContext = createContext([]);

const ProposalsProvider = ({ children }) => {
  const [proposals, setProposals] = useState([]);
  const fetchCars = async (coll) => {
    const q = query(collection(db, coll));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  };
  useEffect(async () => {
    setProposals(await fetchCars("cars"));
  });
  return (
    <ProposalsContext.Provider value={{ proposals, setProposals, fetchCars }}>
      {children}
    </ProposalsContext.Provider>
  );
};

export default ProposalsContext;
export { ProposalsProvider };
