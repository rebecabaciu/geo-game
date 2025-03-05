import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/Homepage";
import Countries from "./Countries/Countries";
import Capitals from "./Capitals/Capitals";
import Flags from "./Flags/Flags";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/capitals" element={<Capitals />} />
        <Route path="/flags" element={<Flags />} />
      </Routes>
    </Router>
  );
}

export default App;
