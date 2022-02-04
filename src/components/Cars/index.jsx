import Alert from "../Alert";
import "./Cars.css";
import { useUserAuth } from "../../context/UserContext";
import { useEffect, useState } from "react";
import "../../styles/forms.css";
import Modal from "react-modal";
import { TextField } from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";
Modal.setAppElement("#root");

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
  const { user } = useUserAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [model, setModel] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(
    new Date(new Date().setDate(dateFrom.getDate() + 1))
  );
  const [year, setYear] = useState(1970);
  const handleDateFromChange = (date) => {
    setDateFrom(date);
    setDateTo(new Date(new Date().setDate(date.getDate() + 1)));
  };

  const handleDateToChange = (date) => {
    setDateTo(date);
  };
  const handleModelChange = (e) => setModel(e.target.value);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  useEffect(() => {
    console.log(`car will be rented from ${dateFrom} to ${dateTo}`);
  });
  return (
    <section className="section cars">
      <div className="container">
        <h1>Cars</h1>

        <Modal isOpen={modalIsOpen} style={modalStyles}>
          <form className="form form-publish">
            <Stack spacing={3}>
              <h2 style={{ textAlign: "center" }}>Publish your car</h2>
              <h3>Car Information</h3>
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
              <h3>Availlability</h3>
              <div className="formGroup-container">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["day"]}
                    label="From"
                    value={dateFrom}
                    onChange={handleDateFromChange}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                  <DatePicker
                    views={["day"]}
                    label="To"
                    value={dateTo}
                    onChange={handleDateToChange}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </Stack>
          </form>
        </Modal>
        <button className="publishCar" type="button" onClick={openModal}>
          Publish a car
        </button>
      </div>
    </section>
  );
};

export default Cars;
