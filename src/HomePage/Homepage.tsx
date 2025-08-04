import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Oare ești chiar atât de deștept pe cât te crezi?</h1>

      <div className="category">
        <h2>Țări și Capitale</h2>
        <div className="button-row">
          <button className="game-button" onClick={() => navigate("/capitals")}>Ghicește Țara</button>
          <button className="game-button" onClick={() => navigate("/countries")}>Ghicește Capitala</button>
        </div>
      </div>

      <div className="category">
        <h2>Țări și Steaguri</h2>
        <div className="button-row">
          <button className="game-button" onClick={() => navigate("/flags")}>Ghicește Țara</button>
          <button className="game-button" onClick={() => navigate("/countries2")}>Ghicește Steagul</button>
        </div>
      </div>

      <div className="category">
        <h2>Județe și Reședințe</h2>
        <div className="button-row">
          <button className="game-button" onClick={() => navigate("/resedinte")}>Ghicește Județul</button>
          <button className="game-button" onClick={() => navigate("/judete")}>Ghicește Reședința</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
