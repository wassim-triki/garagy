import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/explore" element={<h1>Explore</h1>} />
          <Route path="become-a-seller" element={<h1>Become a seller</h1>} />
          <Route path="contact" element={<h1>Contact</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
