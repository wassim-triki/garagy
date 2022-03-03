import React from "react";
import "./ProposalCard.css";
import { FiExternalLink } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
const ProposalCard = ({
  id,
  carPic,
  model,
  dateFrom,
  dateTo,
  year,
  price,
  currency,
}) => {
  return (
    <div className="proposal-card">
      <div className="proposal-card__img">
        <img src={carPic} alt="picture of a car" />
      </div>
      <div className="proposal-card__header">
        <h3 className="proposal-card-model">{model}</h3>
        <p className="proposal-card-year">{year}</p>
      </div>
      <div className="proposal-card__body">
        <p className="proposal-card-availability">
          <span>From:</span>
          {dateFrom.toDate().toLocaleDateString("fr-FR")}
        </p>
        <p className="proposal-card-availability">
          <span>To:</span>
          {dateTo.toDate().toLocaleDateString("fr-FR")}
        </p>
      </div>
      <div className="proposal-card__footer">
        <p className="proposal-card-price">{price}</p>
        <p className="proposal-card-currency">{currency}</p>
        <p className="proposal-card-perhour">Per Hour</p>
      </div>
      <Link to={`/cars/${id}`}>
        <div className="proposal-card__hover">
          <FiExternalLink className="icons external-link" />
        </div>
      </Link>
    </div>
  );
};

export default ProposalCard;
