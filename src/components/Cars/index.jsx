import Alert from "../Alert";
import "./Cars.css";
import { useUserAuth } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import "../../styles/forms.css";
import Modal from "react-modal";
import { TextField } from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";

import { IoCloseOutline } from "react-icons/io5";
import { BsCloudUpload } from "react-icons/bs";
import { getYear } from "date-fns";
import uploadToStorage from "../../helpers/uploadToStorage";
import nextId from "react-id-generator";
import { auth, db, storage } from "../../firebase-config";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import MenuItem from "@mui/material/MenuItem";
import ProposalCard from "../ProposalCard";
import { Outlet } from "react-router-dom";
import ProposalsContext from "../../context/ProposalsContext";
Modal.setAppElement("#root");
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "TND",
    label: "TND",
  },
];

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Cars = () => {
  let randId = nextId();
  const { proposals, setProposals } = useContext(ProposalsContext);
  useEffect(() => {
    setProposals([
      ...proposals.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()),
    ]);
  }, []);
  const [price, setPrice] = useState(0);
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const [currency, setCurrency] = useState("TND");
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  // const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUserAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [model, setModel] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(
    new Date(new Date().setDate(dateFrom.getDate() + 1))
  );
  const [discription, setDiscription] = useState("");
  const handleDiscriptionChange = (e) => {
    setDiscription(e.target.value);
  };
  const [year, setYear] = useState(1970);
  const [carPicBlob, setCarPicBlob] = useState(null);
  const handleDateFromChange = (date) => {
    setDateFrom(date);
    setDateTo(new Date(new Date().setDate(date.getDate() + 1)));
  };
  const handleCarPicSelect = (e) => {
    const blob = e.target.files[0];
    if (blob) {
      setCarPicBlob(blob);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
    }
  };
  const handleDateToChange = (date) => {
    setDateTo(date);
  };
  const handleModelChange = (e) => setModel(e.target.value);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const proposalId = `${auth.currentUser.uid}${randId}`;
      if (carPicBlob) {
        await uploadToStorage("images/cars", proposalId, carPicBlob);
      } else {
        throw new Error("Select a car picture");
      }
      const carPic = await getDownloadURL(
        ref(storage, `gs://garagy-87d13.appspot.com/images/cars/${proposalId}`)
      );
      if (price < 0) {
        throw new Error("Price can't be negative");
      }
      const proposal = {
        createdAt: new Date(),
        userUid: auth.currentUser.uid,
        model,
        year: typeof year == "object" ? year.getFullYear() : year,
        dateFrom,
        dateTo,
        carPic,
        price,
        currency,
        discription,
      };
      const carDoc = doc(db, "cars", proposalId);
      await setDoc(carDoc, proposal);
      setModalIsOpen(false);
      setProposals(await fetchCollection("cars"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchCollection = async (coll) => {
    const q = query(collection(db, coll));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  };

  useEffect(async () => {
    setProposals(await fetchCollection("cars"));
  }, []);
  return (
    <section className="section cars">
      <div className="container">
        <div className="page-header-container">
          <h1>Browse Available Cars</h1>
          {user && (
            <button className="share-car-btn" type="button" onClick={openModal}>
              Share Your Own
            </button>
          )}
        </div>
        <div className="proposal-cards">
          {proposals.map((p) => (
            <ProposalCard key={p.id} {...p} />
          ))}
        </div>
        <Modal isOpen={modalIsOpen} style={modalStyles}>
          <IoCloseOutline className="closeModal" onClick={closeModal} />
          <form className="form form-publish" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* <h2 style={{ textAlign: "center" }}>Publish your car</h2> */}
              {/* <h3>Car Information</h3> */}
              <div className="formGroup-container">
                <TextField
                  id="outlined-basic"
                  label="Model"
                  variant="outlined"
                  onChange={handleModelChange}
                  value={model}
                  required
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year"]}
                    label="Year"
                    value={year}
                    onChange={(newValue) => {
                      setYear(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              {/* <h3>Availlability</h3> */}
              <div className="formGroup-container">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["day"]}
                    label="Available from"
                    value={dateFrom}
                    minDate={new Date()}
                    onChange={handleDateFromChange}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                  <DatePicker
                    views={["day"]}
                    label="To"
                    value={dateTo}
                    minDate={
                      new Date(new Date().setDate(dateFrom.getDate() + 1))
                    }
                    onChange={handleDateToChange}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="formGroup-container">
                <TextField
                  id="outlined-basic"
                  label="Price per hour"
                  variant="outlined"
                  onChange={handlePriceChange}
                  value={price}
                  type="number"
                  required
                />
                <TextField
                  id="filled-select-currency"
                  select
                  label="Currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                  helperText="Please select your currency"
                  variant="filled"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <TextField
                id="outlined-multiline-static"
                label="Discription"
                multiline
                rows={4}
                placeholder="Additional information"
                value={discription}
                onChange={handleDiscriptionChange}
              />
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              <div className="car-pic-container">
                <label htmlFor="car-pic-input">
                  <BsCloudUpload />

                  <p
                    style={{
                      padding: "0 1rem",
                    }}
                  >
                    {carPicBlob
                      ? carPicBlob.name
                      : "Upload a picture of your car"}{" "}
                  </p>
                </label>
                <input
                  type="file"
                  className="car-pic-input"
                  id="car-pic-input"
                  accept="image/*"
                  onChange={handleCarPicSelect}
                />
              </div>
            </Stack>
            <div className="publish-container">
              <button className="publish" type="submit" disabled={loading}>
                Publish
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </section>
  );
};

export default Cars;
