import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProposalsContext from "../../context/ProposalsContext";
import ProposalDetails from "../ProposalDetails";
import "./Proposal.css";
const Proposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { proposals } = useContext(ProposalsContext);
  const [proposal, setProposal] = useState(null);
  const [found, setFound] = useState();
  useEffect(() => {
    const data = proposals.find((p) => p.id == id);
    setFound(data != null && data != undefined);
    setProposal(data);
  }, []);
  return (
    <section className="section proposal">
      {found ? <ProposalDetails {...proposal} /> : navigate("/cars")}
    </section>
  );
};

export default Proposal;
