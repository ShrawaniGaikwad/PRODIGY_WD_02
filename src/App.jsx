import React, { useState, useRef } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css'



function App() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const displayRef = useRef(null);

  const timeToString = (time) => {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}:${formattedMS}`;
  };

  const print = (txt) => {
    if (displayRef.current) {
      displayRef.current.innerHTML = txt;
    }
  };

  const start = () => {
    const startTime = Date.now() - elapsedTime;
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const newElapsedTime = currentTime - startTime;
      setElapsedTime(newElapsedTime);
      print(timeToString(newElapsedTime));
    }, 10);
    setTimerInterval(interval);
    showButton('PAUSE');
  };

  const pause = () => {
    clearInterval(timerInterval);
    showButton('PLAY');
  };

  const reset = () => {
    clearInterval(timerInterval);
    print('00:00:00');
    setElapsedTime(0);
    showButton('PLAY');
  };

  const showButton = (buttonKey) => {
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    if (buttonKey === 'PLAY') {
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
    } else {
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
    }
  };

  return (
    <div className='container'>
    <div className="stopwatch">
      <h1>
        <span className="gold">STOPWATCH</span>
      </h1>
      <div className="circle">
        <span className="time" ref={displayRef} id="display">
          00:00:00
        </span>
      </div>

      <div className="controls">
        <button className="buttonPlay" onClick={start}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
        </svg>
        </button>
        <button className="buttonReset" onClick={pause}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-stop-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5z"/>
      </svg>
        </button>
        <button className="buttonReset" onClick={reset}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-bootstrap-reboot" viewBox="0 0 16 16">
        <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.8 6.8 0 0 0 1.16 8z"/>
        <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324z"/>
      </svg>
        </button>
      </div>
      <div className='controls' style={{color:'white'}}>
        <h2>Play</h2>
        <h2 style={{marginLeft:20}}>Pause</h2>
        <h2 style={{marginLeft:20}}>Reset</h2>
      </div>
    </div>
    </div>
  );
}

export default App;
