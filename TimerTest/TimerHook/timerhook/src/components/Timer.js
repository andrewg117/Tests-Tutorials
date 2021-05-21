import React, { useState, useEffect, useCallback } from 'react';

function Timer() {
  const [count, changeCount] = useState(0);
  const [isStarted, toggleStart] = useState(false);

  const maxCount = 100;
  const calc = (60 / maxCount) * 1000;
  let currentTime;
  let nextTime;

  const nextCount = () => {
    changeCount(state => state + 1);
  }

  /* const timeoutTimer = () => {
    if (isStarted) {
      nextCount();

      if (!currentTime) {
        currentTime = new Date().getTime();
        nextTime = currentTime;
      }
      nextTime += calc;

      let diff = (new Date().getTime() - currentTime) % calc;
      console.log(`${count}: ${diff} ms`);

      if (count < maxCount) {
        setTimeout(timeoutTimer, nextTime - new Date().getTime());
      } else {
        let endStamp = new Date();
        console.log(`timeoutTimer End: ${endStamp}`);
        resetTimer();
      }
    } else {
      resetTimer();
    }
  } */

  const startTimer = () => {
    toggleStart(true);
  }

  const pauseTimer = () => {
    if (isStarted) {
      toggleStart(false);
      currentTime = 0;
      nextTime = 0;
      // clearTimeout(newTimer);
    }
  }

  const resetTimer = () => {
    currentTime = 0;
    nextTime = 0;
    changeCount(0);
    toggleStart(false);
    // clearTimeout(newTimer);
  }

  /* useEffect(() => {
    let newTimer
    if (isStarted) {
      newTimer = setTimeout(() => {
        nextCount();
  
        if (!currentTime) {
          currentTime = new Date().getTime();
          nextTime = currentTime;
        }
        nextTime += calc;
  
        let diff = (new Date().getTime() - currentTime) % calc;
        console.log(`${count}: ${diff} ms`);
  
        if (count < maxCount) {
          setTimeout(newTimer, nextTime - new Date().getTime());
        } else {
          let endStamp = new Date();
          console.log(`timeoutTimer End: ${endStamp}`);
          resetTimer();
        }
      }, calc);
    } else {
      resetTimer();
    }
      

    return () => clearTimeout(newTimer);
  }, [isStarted]); */

  return (
    <div>
      <h1>{isStarted.toString()}</h1>
      <h1>{count}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  )
}

export default Timer;
