
$(document).ready(() => {
  let intervalIndex = 0;
  let timeoutIndex = 0;
  const count = 2;
  const calc = (60 / count) * 1000;

  const intervalTimer = () => {
    let timer = setInterval(() => {
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
      timeoutIndex++;
      if(timeoutIndex < count) {
        // console.log(timeoutIndex);
        setTimeout(timeoutTimer, calc);
      } else {
        let endStamp = new Date();
        console.log(`timeoutTimer End: ${endStamp}`);
      }
  }

  $('#btn1').click(() => {
    intervalIndex = 0;
    let startStamp = new Date();
    console.log(`intervalTimer Start: ${startStamp}`);
    intervalTimer();
  });

  $('#btn2').click(() => {
    timeoutIndex = 0;
    let startStamp = new Date();
    setTimeout(timeoutTimer, calc);
    console.log(`timeoutTimer Start: ${startStamp}`);
  });
});