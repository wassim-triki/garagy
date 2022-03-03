import React, { useContext, useEffect } from "react";
import ProposalsContext from "../../context/ProposalsContext";
import { useUserAuth } from "../../context/UserContext";
import ProposalCard from "../ProposalCard";
import "./MyCars.css";
import "../Cars/Cars.css";
import { auth } from "../../firebase-config";
const MyCars = () => {
  const { proposals, fetchCars } = useContext(ProposalsContext);
  const { user } = useUserAuth();
  useEffect(() => {
    fetchCars("cars");
  }, []);

  return (
    <section className="section my-cars">
      <div className="container-cards proposal-cards">
        {proposals
          .filter((p) => p.userUid === auth.currentUser?.uid)
          .map(
            (i) => (
              <ProposalCard key={i.id} {...i} />
            )
            // console.log(i)
          )}
      </div>
    </section>
  );
};

export default MyCars;
