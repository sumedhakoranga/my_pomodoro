import {useEffect, useState} from "react";
import './App.scss';

function App() {
 
  const[breakLength, setBreakLength] = useState(5);
  const[sessionLength, setSessionLength] = useState(25);
  const[play, setPlay] = useState(false);
  const[timeLeft, setTimeLeft] = useState(1500);
  const[timingType, setTimingType] = useState("SESSION")


  const handleBreakIncrease = () =>{
    if(breakLength<60){
      setBreakLength(breakLength+1)
    }
  }
  const handleBreakDecrease = () =>{
    if(breakLength>1){
      setBreakLength(breakLength-1)
    }
  }

  const handleSessionDecrease = () =>{
    if(sessionLength>1){
      setSessionLength(sessionLength-1)
      setTimeLeft(timeLeft - 60)
    }
  }

  const handleSessionIncrease = () =>{
    if(sessionLength<60){
      setSessionLength(sessionLength+1)
      setTimeLeft(timeLeft + 60)
    }
  }

  const timeout = setTimeout(() => {
    if(timeLeft && play){
      setTimeLeft(timeLeft - 1)
    }
  }, 1000);

  const handleReset=()=>{
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep")
    audio.pause()
    audio.currentTime = 0;
  }

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }

  const resetTimer = () =>{
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      setTimeLeft(breakLength*60)
      setTimingType("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      setTimeLeft(sessionLength * 60)
      setTimingType("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }

  

  const clock = () => {
    if(play){
      resetTimer()
    }else{
      clearTimeout(timeout)
    }
  }

  const timerFormatter=()=>{
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft-minutes*60;
    const formatterMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formatterSeconds = seconds < 10 ? '0' + seconds : seconds;
    return `${formatterMinutes}:${formatterSeconds}`;
  }

  const title = timingType === "SESSION" ? "Session" : "Break";

  useEffect(()=>{
    clock()
  },[play, timeLeft, timeout])

  return (
    <div className="App">
      <div className="container">
        <h2 id="topic"> 25 + 5 Clock ♡🦋</h2>
        <div id="our-break">  
          <h2 id="break-label" className="label">Break-Length</h2> 
          <button id="break-decrement" disabled={play} className="button" onClick={handleBreakDecrease}>↓</button>
          <strong id="break-length">{breakLength}</strong>
          <button id="break-increment" disabled={play} className="button" onClick={handleBreakIncrease}>↑</button> 
        </div>
        <div id="our-session">          
          <h2 id="session-label" className="label">Session-Length</h2>              
          <button id="session-decrement" disabled={play} className="button" onClick={handleSessionDecrease}>↓</button>
          <strong id="session-length">{sessionLength}</strong>
          <button id="session-increment" disabled={play} className="button" onClick={handleSessionIncrease}>↑</button>  
        </div>
        <div className="timer">
          <h2 id="timer-label">{title}📌</h2>
          <h2 id="time-left">{timerFormatter()}</h2>
          </div>
        <button id="start_stop" className="button" onClick={handlePlay} >▶||</button>
        <button id="reset" className="button" onClick={handleReset}>↻</button>
    </div>
      <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>
  );
}

export default App;
