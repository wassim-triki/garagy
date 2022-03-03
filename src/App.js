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
import { NavbarProvider } from "./context/NavbarContext";
import ScrollToTop from "react-scroll-to-top";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import ScrollTopOnRouteChange from "./components/ScrollTopOnRouteChange";
import { UserProvider } from "./context/UserContext";
import Cars from "./components/Cars";
import Profile from "./components/Profile";
import ProtectedRouteNotAuth from "./components/ProtectedRouteNotAuth";
import ProtectedRouteAuth from "./components/ProtectedRouteAuth";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import PasswordReset from "./components/PasswordReset";
import NotFound from "./components/NotFound";
import { auth } from "./firebase-config";
import Proposal from "./components/Proposal";
import { ProposalsProvider } from "./context/ProposalsContext";
import MyCars from "./components/MyCars";
const scrollToTopStyles = {
  borderRadius: "50px",
  padding: "0",
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "100",
};
const svgStyles = {
  color: "#f4b251",
  width: "100%",
  fontSize: "3rem",
  borderRadius: "50px",
};

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <section className="section">
          <div className="container">
            <Oval color="#f4b251" height={80} width={80} />
          </div>
        </section>
      ) : (
        <>
          <ScrollToTop
            smooth
            style={scrollToTopStyles}
            component={<BsFillArrowUpCircleFill style={svgStyles} />}
          />
          <Router>
            <ScrollTopOnRouteChange />
            <UserProvider>
              <ProposalsProvider>
                <NavbarProvider>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/cars/:id" element={<Proposal />} />

                    <Route path="/about" element={<About />} />
                    <Route
                      path="/become-a-seller"
                      element={<BecomeASeller />}
                    />
                    <Route path="/my-cars" element={<MyCars />} />

                    <Route element={<ProtectedRouteAuth />}>
                      <Route
                        path="/password-reset"
                        element={<PasswordReset />}
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/join" element={<Join />} />
                    </Route>
                    <Route element={<ProtectedRouteNotAuth />}>
                      <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </NavbarProvider>
              </ProposalsProvider>
            </UserProvider>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
