import React, { useState, useEffect } from "react";
import { preguntas } from "../data/data";
import { preguntas2 } from "../data/question2";
import { preguntas3 } from "../data/question3";
import Card from "./Card";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionSet, setCurrentQuestionSet] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [congrats, setCongrats] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(preguntas));
  }, []);

  const questionSets = [
    [], 
    preguntas,
    preguntas2,
    preguntas3,
  ];

  const correctAnswerId = 0;

  const handleCardClick = (id) => {
    if (id === correctAnswerId) {
      if (currentQuestionSet < questionSets.length - 1) {
        alert("¡Respuesta correcta! Continúa con la siguiente pregunta.");
        setCurrentQuestionSet((prevSet) => prevSet + 1);
        setCurrentQuestion("");
      } else {
        alert("¡Respuesta correcta! Has terminado el quiz.");
        setCongrats(true);
      }
    } else {
      alert("Respuesta incorrecta. Esta no es la tarjeta correcta.");
    }
  };

  useEffect(() => {
    if (
      currentQuestionSet > 0 &&
      currentQuestionSet <= questionSets.length - 1
    ) {
      setCurrentQuestion(
        `Cual es la respuesta correcta a esta pregunta: ${
          questionSets[currentQuestionSet][0]?.title || ""
        }`
      );
    }
  }, [currentQuestionSet]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-6 bg-blue-500 text-white text-center">
        <h1 className="text-2xl font-bold">Preguntas de Quiz</h1>
      </header>
      <main className="container mx-auto p-4">
        {!congrats && (
          <>
            <h1 className="text-center text-xl mb-4">{currentQuestion}</h1>
            <div className="grid grid-cols-2 gap-4">
              {questionSets[currentQuestionSet].map((Q) => (
                <Card key={Q.id} Q={Q} onClick={() => handleCardClick(Q.id)} />
              ))}
            </div>
          </>
        )}
        {congrats && (
          <>
            <h1 className="text-center text-6xl mb-4">
              Felicitaciones, has terminado el quiz.
            </h1>
          </>
        )}
      </main>
    </div>
  );
};

export default QuizApp;
