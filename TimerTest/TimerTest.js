
$(document).ready(() => {
  let intervalIndex = 0;
  let timeoutIndex = 0;
  let currentTime;
  let nextTime;
  let isStarted = false;
  const count = 200;
  const calc = (60 / count) * 1000;

  const intervalTimer = () => {
    let timer = setInterval(() => {
      // if(!currentTime) {
      //   currentTime = new Date().getTime();
      // }

      // let diff = (new Date().getTime() - currentTime) % calc; 
      // console.log(`${diff} ms`);

      if(intervalIndex < count) {
        intervalIndex++;
        // console.log(intervalIndex);
      } else {
        let endStamp = new Date();
        console.log(`intervalTimer End: ${endStamp}`);
        clearInterval(timer);
      }
    }, calc);
  }

  const timeoutTimer = () => {
      if(isStarted) {
        timeoutIndex++;

        if(!currentTime) {
          currentTime = new Date().getTime();
          nextTime = currentTime;
        }
        nextTime += calc;

        let diff = (new Date().getTime() - currentTime) % calc; 
        console.log(`${timeoutIndex}: ${diff} ms`);

        if(timeoutIndex < count) {
          // console.log(timeoutIndex);
          setTimeout(timeoutTimer, nextTime - new Date().getTime());
        } else {
          let endStamp = new Date();
          console.log(`timeoutTimer End: ${endStamp}`);
          isStarted = !isStarted;
          clearTimeout(timeoutTimer);
        }
    } else {
      clearTimeout(timeoutTimer);
    }
  }

  $('#btn1').click(() => {
    intervalIndex = 0;
    start = 0;
    let startStamp = new Date();
    console.log(`intervalTimer Start: ${startStamp}`);
    intervalTimer();
  });

  $('#btn2').click(() => {
    if(timeoutIndex == count) {
      timeoutIndex = 0;
    }
    currentTime = 0;
    nextTime = 0;
    isStarted = !isStarted;
    let startStamp = new Date();
    timeoutTimer();
    console.log(`timeoutTimer Start: ${startStamp}`);
  });
});