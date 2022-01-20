import "./App.css";
import "./styles/global.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import BecomeASeller from "./components/BecomeASeller";
import Home from "./components/Home";
import Login from "./components/Login";
import Join from "./components/Join";
import Footer from "./components/Footer";
import { NavbarProvider } from "./context/NavbarContext/NavbarContext";
import ScrollToTop from "react-scroll-to-top";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
const scrollToTopStyles = {
  borderRadius: "50px",
  padding: "0",
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // fontSize: "0rem",
};
function App() {
  return (
    <div className="App">
      <ScrollToTop
        smooth
        style={scrollToTopStyles}
        component={
          <BsFillArrowUpCircleFill
            style={{
              color: "#f4b251",
              width: "100%",
              fontSize: "3rem",
              borderRadius: "50px",
            }}
          />
        }
      />
      <Router>
        <NavbarProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/become-a-seller" element={<BecomeASeller />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Routes>
          <Footer />
        </NavbarProvider>
      </Router>
    </div>
  );
}

export default App;
