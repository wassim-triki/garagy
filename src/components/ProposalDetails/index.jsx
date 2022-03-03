import React, { useEffect, useState } from "react";
import "./ProposalDetails.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { BiUser } from "react-icons/bi";
import { useContext } from "react";
import UserContext, { useUserAuth } from "../../context/UserContext";
import { setUserDoc } from "../../helpers/user-data";
import ProposalsContext from "../../context/ProposalsContext";
import { IoMdTrash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const ProposalDetails = ({
  id,
  userUid,
  carPic,
  discription,
  model,
  year,
  dateFrom,
  booked,
  dateTo,
}) => {
  const navigate = useNavigate();
  const { proposals, setProposals } = useContext(ProposalsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBooked, setIsBooked] = useState(booked);
  const { user, setUserData } = useUserAuth();
  const [carOwner, setCarOwner] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [shownDisc, setShowDisc] = useState("");
  const [bookedByUser, setBookedByUser] = useState(false);
  useEffect(async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    let owner = null;
    querySnapshot.forEach((u) => {
      if (u.id.includes(userUid)) {
        owner = { uid: u.id, ...u.data() };
      }
    });
    owner && setCarOwner(owner);
  }, []);
  useEffect(() => {
    !auth.currentUser && navigate("/login");
    if (discription.length > 30) {
      setShowDisc(`${discription.slice(0, 30)}... `);
    }
  }, []);

  useEffect(() => {
    if (user?.bookings.includes(id) && booked) {
      setBookedByUser(true);
    }
  }, []);
  const handleCancel = async () => {
    try {
      setLoading(true);
      setError(null);
      let b = user.bookings;
      b = b.filter((i) => i.id !== id);
      b = [...new Set(b)];
      const updatedUser = { ...user, bookings: b };
      setUserData(updatedUser);
      await setUserDoc(auth.currentUser?.uid, updatedUser);
      const proposalDoc = doc(db, "cars", id);
      const p = proposals.find((i) => i.id == id);
      await setDoc(proposalDoc, { ...p, booked: false });
      setIsBooked(false);
      setBookedByUser(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleBooking = async () => {
    try {
      setLoading(true);
      setError(null);
      let b = user?.bookings;
      b.push(id);
      b = [...new Set(b)];
      const updatedUser = { ...user, bookings: b };
      setUserData(updatedUser);
      await setUserDoc(auth.currentUser?.uid, updatedUser);
      const proposalDoc = doc(db, "cars", id);
      const p = proposals.find((i) => i.id == id);
      await setDoc(proposalDoc, { ...p, booked: true });
      setIsBooked(true);
      setBookedByUser(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      let b = user?.bookings.filter((i) => i.id !== id);
      b = [...new Set(b)];
      const updatedUser = { ...user, bookings: b };
      setUserData(updatedUser);
      await setUserDoc(auth.currentUser?.uid, updatedUser);
      const proposalDoc = doc(db, "cars", id);
      await deleteDoc(proposalDoc);
      navigate("/cars");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="section proposal-details">
      <div className="container">
        <div className="header">
          <h2 className="title">Car</h2>
          {userUid === auth.currentUser?.uid && (
            <IoMdTrash
              className="trash"
              onClick={handleDelete}
              disabled={loading}
            />
          )}
        </div>

        <div className="car-details">
          <div
            className="img-container"
            onClick={() => window.open(carPic, "_blank")}
          >
            <img src={carPic} alt="car picture" />
          </div>
          <div className="car-details__text">
            <h3 className="model">
              {model} <span>{year}</span>
            </h3>
            <p className="car-discription">
              <h4>Discritpion</h4>

              {expanded ? discription : shownDisc}
              <a onClick={() => setExpanded(!expanded)}>
                {expanded ? "read less" : "read more"}
              </a>
            </p>
            <div className="availability">
              <h4>Availablity</h4>

              <p className="date date-from">
                <span>From:</span>
                {dateFrom.toDate().toLocaleDateString("fr-FR")}
              </p>
              <p className=" date date-to">
                <span>To:</span>
                {dateTo.toDate().toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className="button-container">
            {isBooked && bookedByUser && (
              <button
                className="car-btn cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                {loading ? "Canceling..." : "Cancel"}
              </button>
            )}
            {user && isBooked && !bookedByUser && (
              <button className="car-btn book" disabled>
                Booked
              </button>
            )}

            {auth.currentUser?.uid != userUid && !isBooked && (
              <button
                className="car-btn"
                onClick={handleBooking}
                disabled={loading}
              >
                {loading ? "Booking..." : "Book"}
              </button>
            )}
          </div>
        </div>
        <div className="owner-details">
          <h2 className="title">Owner</h2>
          <div className="owner-container">
            {carOwner?.profilePic ? (
              <img src={carOwner?.profilePic} alt="profile picture" />
            ) : (
              <BiUser className="defaultPic" />
            )}

            <div className="owner-details__text">
              <div className="info">
                <h3>Full Name </h3>
                <span>{carOwner?.displayName}</span>
              </div>
              <div className="info">
                <h3>Bio </h3>
                <span> {carOwner?.bio || "No bio 😶"}</span>
              </div>
              <div className="info">
                <h3>Email </h3>
                <span>{carOwner?.email}</span>
              </div>
              <div className="info">
                <h3>Phone N° </h3>
                <span> {carOwner?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalDetails;
