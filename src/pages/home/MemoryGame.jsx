import React, { useState, useCallback } from 'react';
import DisplayQuestion from './DisplayQuestion';
import UserInputForm from './UserInputForm';

function MemoryGame() {
  const randomGenerate = (digit) => {
    let max = Math.pow(10, digit) - 1;
    let min = Math.pow(10, digit - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [question, setQuestion] = useState(btoa(randomGenerate(3)));
  const [level, setLevel] = useState({ main: 1, sub: 1 });
  const [error, setError] = useState(0);

  const resetState = useCallback(() => {
    setQuestion(btoa(randomGenerate(3)));
    setLevel({ main: 1, sub: 1 });
    setError(0);
  }, []);

  const compareUserInput = useCallback((userNumber) => {
    let currentQuestion = question;
    let mainLevel = level.main;
    let subLevel = level.sub;
    let currentError = error;

    if (userNumber === currentQuestion) {
      if (subLevel < 3) {
        subLevel++;
      } else if (subLevel === 3) {
        mainLevel++;
        subLevel = 1;
      }
    } else {
      currentError++;
    }

    let digit = mainLevel + 2;
    setQuestion(btoa(randomGenerate(digit)));
    setLevel({ main: mainLevel, sub: subLevel });
    setError(currentError);
  }, [level, question, error]);

  return (
    <div className="main">
      <DisplayQuestion
        question={question}
        level={level}
        error={error}
      />
      <UserInputForm
        compareUserInput={compareUserInput}
        error={error}
        onReset={resetState}
      />
    </div>
  );
}

export default MemoryGame;
