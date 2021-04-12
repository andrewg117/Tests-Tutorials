Testing timers for the Speed Reader project to determine the best approach for words per min.
REF: https://codepen.io/andrewj117/pen/eYgZdXz

Test results so far:
- setTimeout ends 1-2 seconds later than the expected time when the count is 100 or more.
- setInterval ends 2 seconds later than the expected time 
- After researching, I found that both setTimeout and setInterval accuracy drifts increasingly every interval. I decided to use setTimeout's recursive solution to solve the drift.
  REF: https://www.sitepoint.com/creating-accurate-timers-in-javascript/ by James Edwards
      https://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate by Alex Wayne