import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/Homepage";
import Countries from "./Countries/Countries";
import Capitals from "./Capitals/Capitals";
import Flags from "./Flags/Flags";
import Resedinte from "./Resedinte/Resedinte";
import Judete from "./Judete/Judete";
import Countries2 from "./Countries2/Countries2";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/capitals" element={<Capitals />} />
        <Route path="/flags" element={<Flags />} />
        <Route path="/judete" element={<Judete />} />
        <Route path="/resedinte" element={<Resedinte />} />
        <Route path="/countries2" element={<Countries2 />} />
      </Routes>
    </Router>
  );
}

export default App;
