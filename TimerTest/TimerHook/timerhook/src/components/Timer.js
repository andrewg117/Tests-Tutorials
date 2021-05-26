import React, { useState, useEffect, useRef, useCallback } from 'react';

function Timer() {
  const [isStarted, toggleStart] = useState(() => false);
  const [count, changeCount] = useState(() => {
    return 0;
  });
  const [currentTime, changeCurrent] = useState(() => {
    return 0;
  });
  const [nextTime, changeNext] = useState(() => {
    return 0;
  });

  const timerRef = useRef(0);

  const maxCount = 500;
  const calc = (60 / maxCount) * 1000;

  const nextCount = (next) => {
    changeCount(state => state + next);
  }

  const timeoutTimer = useCallback(() => {
    if (isStarted) {
      if (!currentTime) {
        changeCurrent(new Date().getTime());
        changeNext(new Date().getTime());
      }
      changeNext(nextTime + calc);

      let next = count + 1;

      if (next < maxCount) {

        nextCount(1);
        timerRef.current = setTimeout(() => {
          timeoutTimer();
        }, nextTime - new Date().getTime());
      }
    } 

  }, [calc, count, currentTime, isStarted, nextTime]);

  const startTimer = () => {
    toggleStart(true);
    clearTimeout(timerRef.current);
    let startStamp = new Date();
    console.log(`timeoutTimer Start: ${startStamp}`);
  }

  const pauseTimer = () => {
    toggleStart(false);
    clearTimeout(timerRef.current);
    timerRef.current = 0;
    changeCurrent(0);
    changeNext(0);
  }

  const resetTimer = () => {
    pauseTimer();
    let resetCount = setTimeout(() => changeCount(0), 300);
    return () => clearTimeout(resetCount);
  }

  useEffect(() => {
    if (isStarted && count < maxCount) {
      timerRef.current = setTimeout(() => {
        timeoutTimer();
      }, calc);
    } else {
      pauseTimer();
      let endStamp = new Date();
      console.log(`timeoutTimer End: ${endStamp}`);
    }

    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = 0;
    }
  }, [isStarted, count, calc, timeoutTimer]);

  return (
    <div>
      <h1>{isStarted.toString()}</h1>
      <h1>{count}</h1>
      <button onClick={isStarted ? pauseTimer : startTimer}>{isStarted ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  )
}

export default Timer;