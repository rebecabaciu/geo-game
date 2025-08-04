import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { countriesData } from "../data";
import "./Countries.css";

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const generateQuestions = () => {
  return shuffleArray([...countriesData]).map(({ country, capital }) => {
    const wrongAnswers = shuffleArray(
      countriesData.filter(c => c.capital !== capital)
    )
      .slice(0, 3)
      .map(c => c.capital);

    return {
      country,
      correct: capital,
      options: shuffleArray([capital, ...wrongAnswers])
    };
  });
};

const Countries: React.FC = () => {
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
    <div className="countries-container">
      {!gameOver && <div className="score">Scor: {score}</div>}

      {!gameOver ? (
        <div className="question-card">
          <h2>Care este capitala acestei țări?</h2>
          <h1>{questions[currentQuestion].country}</h1>
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
            <h2>🎉 Felicitări! Ai ghicit toate capitalele corect! 🎉</h2>
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

export default Countries;
