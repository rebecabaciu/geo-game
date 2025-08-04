import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { countriesData } from "../data"; // Importăm datele
import "./Countries2.css";

// Funcție pentru a amesteca un array (Fisher-Yates Shuffle)
const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Funcție pentru generarea întrebărilor
const generateQuestions = () => {
  return shuffleArray([...countriesData]).map(({ country, flag }) => {
    // Alegem răspunsuri greșite
    const wrongAnswers = shuffleArray(
      countriesData.filter(c => c.country !== country)
    )
      .slice(0, 3) // Alegem 3 răspunsuri greșite
      .map(c => c.flag);

    return {
      country, // Țara pe care o dăm ca întrebare
      correct: flag, // Steagul corect
      options: shuffleArray([flag, ...wrongAnswers]) // Amestecăm răspunsurile
    };
  });
};

const Countries2: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(() => generateQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setWon(true);
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setQuestions(generateQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="countries2-container">
      {!gameOver && <div className="score">Scor: {score}</div>}
      {!gameOver ? (
        <div className="question-card">
          <h2>Care este steagul acestei țări?</h2>
          <h1>{questions[currentQuestion].country}</h1>
          <div className="options-countries2">
            {questions[currentQuestion].options.map((option) => (
              <img
                key={option}
                src={option}
                alt="Flag option"
                className="flag-option"
                onClick={() => handleAnswer(option)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="result">
          {won ? (
            <h2>🎉 Felicitări! Ai ghicit toate steagurile corect! 🎉</h2>
          ) : (
            <h2>Ai pierdut! Scorul tău este: {score} / {questions.length}</h2>
          )}
          <button onClick={() => navigate("/")}>Meniu principal</button>
          <button onClick={restartGame} className="restart-button">Restart</button>
        </div>
      )}
    </div>
  );
};

export default Countries2;
