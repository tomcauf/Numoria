import React, { useState, useEffect } from "react";

function DisplayQuestion(props) {
  const [showGameBox, setShowGameBox] = useState(false);

  useEffect(() => {
    let digit = props.level.main + 2;
    let time = 200 * Math.min(digit, 5) + 400 * Math.max(digit - 5, 0);
    let number = document.getElementById("number");
    setTimeout(() => {
      number.innerHTML = number.innerHTML.replace(/\w|W/gi, "&#183;");
    }, time);
  }, [props.level.main, props.level.sub, props.error]);

  const handleStartClick = () => {
    setShowGameBox(true);
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
        {showGameBox ? (
          <div className="game-box">
            <p className="number" id="number">
              {props.error < 3 ? atob(props.question) : "????"}
            </p>
          </div>
        ) : (
          <button className="start-button" onClick={handleStartClick}>
            Start
          </button>
        )}
      </div>
      <br />
    </>
  );
}

export default DisplayQuestion;