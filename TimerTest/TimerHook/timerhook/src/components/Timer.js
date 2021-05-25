import React, { useState, useEffect, useRef } from 'react';

function Timer() {
  const [isStarted, toggleStart] = useState(false);
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

  const maxCount = 100;
  const calc = (60 / maxCount) * 1000;

  const nextCount = () => {
    changeCount(state => state + 1);
  }

  const timeoutTimer = () => {
    if (isStarted) {
      nextCount();

      if (!currentTime) {
        changeCurrent(new Date().getTime());
        changeNext(new Date().getTime());
      }
      changeNext(nextTime + calc);

      // let diff = (new Date().getTime() - currentTime) % calc;
      // console.log(`${count}: ${diff} ms`);

      if (count < maxCount) {
        timerRef.current = setTimeout(() => {
          timeoutTimer();
        }, nextTime - new Date().getTime());
      }
    } else {
      pauseTimer();
    }
  }

  const startTimer = () => {
    clearTimeout(timerRef.current);
    let startStamp = new Date();
    console.log(`intervalTimer Start: ${startStamp}`);
    toggleStart(true);
  }

  const pauseTimer = () => {
    changeCurrent(0);
    changeNext(0);
    toggleStart(false);
    clearTimeout(timerRef.current);
    timerRef.current = 0;
  }

  const resetTimer = () => {
    pauseTimer();
    changeCount(0);
  }

  useEffect(() => {
    if (isStarted && count < maxCount) {
      timerRef.current = setTimeout(() => {
        timeoutTimer();
      }, calc);
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = 0;
      toggleStart(false);
      changeCurrent(0);
      changeNext(0);
      let endStamp = new Date();
      console.log(`timeoutTimer End: ${endStamp}`);
    }

    return () => {
      changeCurrent(0);
      changeNext(0);
      clearTimeout(timerRef.current);
      timerRef.current = 0;
    }
  }, [isStarted, count]);

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
