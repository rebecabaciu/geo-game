import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { countriesData } from "../data"; // Importăm datele
import "./Capitals.css";

// Funcție pentru a amesteca un array (Fisher-Yates Shuffle)
const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Funcție pentru a genera toate întrebările (fără repetare)
const generateQuestions = () => {
  return shuffleArray([...countriesData]).map(({ country, capital }) => {
    const wrongAnswers = shuffleArray(
      countriesData.filter(c => c.country !== country)
    )
        .slice(0, 2) // Alegem 2 răspunsuri greșite
        .map(c => c.country);

    return {
      capital,
      correct: country,
      options: shuffleArray([country, ...wrongAnswers])
    };
  });
};

const Capitals: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(() => generateQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    setQuestions(generateQuestions()); // Inițializăm lista de întrebări
  }, []);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setWon(true); // Ai trecut prin toate întrebările
        setGameOver(true);
      }
    } else {
      setGameOver(true); // Ai greșit => jocul se termină
    }
  };

  return (
    <div className="capitals-container">
      {!gameOver ? (
        <div className="question-card">
          <h2>Ce țară are această capitală?</h2>
          <h1>{questions[currentQuestion].capital}</h1>
          <div className="options">
            {questions[currentQuestion].options.map((option) => (
              <button key={option} className="option-button" onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result">
          {won ? (
            <h2>🎉 Felicitări! Ai ghicit toate țările corect! 🎉</h2>
          ) : (
            <h2>Ai pierdut! Scorul tău este: {score} / {questions.length}</h2>
          )}
          <button onClick={() => navigate("/")}>Mergi la Home</button>
        </div>
      )}
    </div>
  );
};

export default Capitals;
