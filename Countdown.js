import React, { Fragment, useState, useEffect } from "react";

function Solution() {
  const [minutes, setMinutes] = useState(0); //minutes from input field, displayed counting down
  const [seconds, setSeconds] = useState(0); //seconds from input field, displayed counting down
  const [timerRunning, setTimerRunning] = useState(false); // defines if timer is running
  const [started, setStarted] = useState(false); // Defines if pausing can be done
  const [status, setStatus] = useState(null); //Satus mesg. ex.: "paused" or "countdown completed"

  //Inputfiled running this is deactivated if timer is running
  //Sets minutes from input field to state
  //Resets status to remove any status mesages upon editing timer
  function handleSetMinutes(event) {
    if (timerRunning) {
      return;
    }
    let newMinutes = event.target.value;
    setMinutes(+newMinutes);
    setStatus(null);
  }

  //Inputfiled running this is deactivated if timer is running
  //Saves seconds from input field to state
  //Resets status to remove any status mesages upon editing timer.
  function handleSetSeconds(event) {
    if (timerRunning) {
      return;
    }
    let newSeconds = event.target.value;

    setSeconds(+newSeconds);
    setStatus(null);
  }

  //Sets timer running by useEffect watching "timerRunning" and clears any status message
  //Conditional accounts for more than 60 sec in the "seconds" input field/state
  //Applies seconds in excess of 60 to the minute field.
  function handleStart() {
    if (seconds >= 60) {
      let newMinutes = Math.floor(seconds / 60) + +minutes;
      let remainingSeconds = seconds % 60;
      document.getElementById("minuteField").value = newMinutes;
      document.getElementById("secondField").value = remainingSeconds;
      setSeconds(+remainingSeconds);
      setMinutes(+newMinutes);
    }
    setTimerRunning(true);
    setStarted(true);
    setStatus(null);
  }

  //Conditionally stops/starts the countwodnw while not touching time-states.
  //Sets message on display to show paused status
  function handlePause() {
    if (started) {
      timerRunning && setStatus("Paused");
      !timerRunning && setStatus(null);
      setTimerRunning(!timerRunning);
    }
  }

  //Clears status message
  //Sets clock back to time specified in input fields
  function handleReset() {
    setMinutes(+document.getElementById("minuteField").value);
    setSeconds(+document.getElementById("secondField").value);
    setStatus(null);
  }

  //Clears all states and input fields
  function handleClear() {
    setStatus(null);
    setStarted(false);
    setTimerRunning(false);
    setSeconds(0);
    setMinutes(0);
    document.getElementById("minuteField").value = null;
    document.getElementById("secondField").value = null;
  }

  //Checks for updates to timerRunning and starts countdown in accordance from minutes & seconds
  //Clears interval on the iteration after 00:00
  //Sets mesage on display through the status hook to indicate a completed countdown
  useEffect(() => {
    let intervalID;

    if (timerRunning === true) {
      intervalID = setInterval(() => {
        if (minutes < 1 && seconds < 1) {
          setTimerRunning(false);
          setStarted(false);
          setStatus("Countdown completed!");
          return clearInterval(intervalID);
        }
        if (seconds < 1) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [timerRunning, minutes, seconds]);

  return (
    <Fragment>
      <label>
        <input
          id="minuteField"
          onChange={handleSetMinutes}
          type="number"
          min="0"
          pattern="[1-9]*"
          placeholder="0"
          disabled={timerRunning && true}
        />
        Minutes
      </label>
      <label>
        <input
          id="secondField"
          onChange={handleSetSeconds}
          type="number"
          min="0"
          max="60"
          pattern="[1-9]*"
          placeholder="0"
          disabled={timerRunning && true}
        />
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button disabled={!started && true} onClick={handlePause}>
        PAUSE / RESUME
      </button>
      <button onClick={handleReset}>RESET</button>
      <button disabled={timerRunning && true} onClick={handleClear}>
        CLEAR
      </button>

      <h1 data-testid="running-clock">
        {minutes && minutes < 10 ? "0" + minutes : minutes || "00"}:
        {seconds && seconds < 10 ? "0" + seconds : seconds || "00"}
      </h1>
      <h4>{status && status}</h4>
    </Fragment>
  );
}
export default Solution;
