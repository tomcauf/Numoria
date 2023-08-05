import React, { useState, useEffect } from "react";

function DisplayQuestion(props) {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      let digit = props.level.main + 2;
      let time = 200 * Math.min(digit, 5) + 400 * Math.max(digit - 5, 0);
      let number = document.getElementById("number");
      setTimeout(() => {
        number.innerHTML = number.innerHTML.replace(/\w|W/gi, "&#183;");
        setGameStarted(true);
      }, time);
    }
  }, [props.level.main, props.level.sub, props.error, props.question]);

  const handleGameStart = () => {
    setGameStarted(true);
    props.onClick();
  };

  return (
    <>
      <div className="number-box">
        <div className="info-box">
          <p className="level">
            Level: {props.level.main} - {props.level.sub}
          </p>
          <p className="mistakes">Error: {props.error}/3</p>
        </div>
        <div className="game-box">
          {gameStarted ? (
            <p className="number" id="number">
              {props.error < 3 ? atob(props.question) : "????"}
            </p>
          ) : (
            <p className="game-start" onClick={handleGameStart}>
              Start
            </p>
          )}
        </div>
      </div>
      <br />
    </>
  );
}

export default DisplayQuestion;