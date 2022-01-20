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

function App() {
  return (
    <div className="App">
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
