import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Oare ești chiar atât de deștept pe cât te crezi?</h1>
      <div className="game-options">
        <button className="game-button" onClick={() => navigate("/countries")}>
          Care e capitala corectă?
        </button>
        <button className="game-button" onClick={() => navigate("/capitals")}>
          Care e țara corectă?
        </button>
        <button className="game-button" onClick={() => navigate("/flags")}>
          Cărei țări îi aparține steagul?
        </button>
      </div>
    </div>
  );
};

export default HomePage;
