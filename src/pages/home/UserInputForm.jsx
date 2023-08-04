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
      <div className="input-box">
        <form onSubmit={handleUserInput}>
          Number is:
          <input
            pattern="[0-9]+"
            type="text"
            ref={userNumberRef}
            required
            autoFocus
          />
          <br />
          <br />
        </form>
        <button onClick={handleReset}>Restart</button>
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

