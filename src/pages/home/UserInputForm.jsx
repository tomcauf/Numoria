import React, { useRef } from 'react';

function UserInputForm(props) {
  const userNumberRef = useRef(null);

  const handleUserInput = (e) => {
    e.preventDefault();
    let userNumber = btoa(userNumberRef.current.value);
    userNumberRef.current.value = "";
    props.compareUserInput(userNumber);
  };

  const handleReset = () => {
    props.onReset();
  };

  let layout;
  if (props.error < 3) {
    layout = (
      //Si props.gameStarted est true, je n'affiche pas de class, sinon afficher la class blur
    <div className={`input-box ${props.gameStarted ? '' : 'blur'}`}>
        <form onSubmit={handleUserInput}>
          Number is:
          <input
            pattern="[0-9]+"
            type="text"
            ref={userNumberRef}
            required
            autoFocus
            disabled={props.gameStarted ? '' : 'disabled'}
          />
          <br />
          <br />
        </form>
        <button onClick={handleReset} disabled={props.gameStarted ? '' : 'disabled'}>Restart</button>
      </div>
    );
  } else {
    layout = (
      <div className="notif-box">
        <div className="notif">Better luck next time!</div>
        <br />
        <br />
        <button onClick={handleReset}>Restart</button>
      </div>
    );
  }

  return layout;
}

export default UserInputForm;

